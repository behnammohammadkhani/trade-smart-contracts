import { ethers, upgrades } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import {
  Authorization,
  PermissionsMock,
  EurPriceFeedMock,
  OperationsRegistry,
  XTokenWrapperMock,
  XToken,
  BFactoryMock,
} from '../typechain';
import Reverter from './utils/reverter';

let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;
let karpincho: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let vegetaAddress: string;
let karpinchoAddress: string;

let xTokenContract: XToken;
let xTokenContractKakaroto: XToken;
let xTokenContractVegeta: XToken;
let xTokenContractKarpincho: XToken;

let xTokenWrapperMockContract: XTokenWrapperMock;
let xTokenWrapperMockContractKakaroto: XTokenWrapperMock;
let xTokenWrapperMockContractVegeta: XTokenWrapperMock;
let xTokenWrapperMockContractKarpincho: XTokenWrapperMock;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: Authorization;
let authorizationContractKakaroto: Authorization;
let operationsRegistryContract: OperationsRegistry;
let bFactoryContract: BFactoryMock;
let bFactoryContractKakaroto: BFactoryMock;

const tradingLimit = ethers.constants.One.mul(5000);

describe('Authorization', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto, vegeta, karpincho] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress, vegetaAddress, karpinchoAddress] = await Promise.all([
      deployer.getAddress(),
      kakaroto.getAddress(),
      vegeta.getAddress(),
      karpincho.getAddress(),
    ]);

    const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
    const Authorization = await ethers.getContractFactory('Authorization');
    const xTokenFactory = await ethers.getContractFactory('XToken');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
    const OperationsRegistry = await ethers.getContractFactory('OperationsRegistry');
    const XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapperMock');
    const BFactoryMockFactory = await ethers.getContractFactory('BFactoryMock');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    permissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
    await permissionsContract.deployed();

    operationsRegistryContract = (await OperationsRegistry.deploy(eurPriceFeedContract.address)) as OperationsRegistry;
    await operationsRegistryContract.deployed();

    await (await operationsRegistryContract.setAssetsManager(deployerAddress)).wait();
    await (await operationsRegistryContract.setFeedManager(deployerAddress)).wait();

    xTokenWrapperMockContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapperMock;
    await xTokenWrapperMockContract.deployed();

    bFactoryContract = (await BFactoryMockFactory.deploy()) as BFactoryMock;
    await bFactoryContract.deployed();

    bFactoryContractKakaroto = bFactoryContract.connect(kakaroto);

    authorizationContract = (await upgrades.deployProxy(Authorization, [
      permissionsContract.address,
      eurPriceFeedContract.address,
      operationsRegistryContract.address,
      bFactoryContract.address,
      xTokenWrapperMockContract.address,
      tradingLimit,
      false,
    ])) as Authorization;
    await authorizationContract.deployed();

    await bFactoryContract.setAuthorization(authorizationContract.address);

    xTokenContract = (await xTokenFactory.deploy(
      'Authorizable Token',
      'AT',
      18,
      '',
      authorizationContract.address,
      operationsRegistryContract.address,
    )) as XToken;
    await xTokenContract.deployed();

    await operationsRegistryContract.allowAsset(xTokenContract.address);

    authorizationContractKakaroto = authorizationContract.connect(kakaroto);

    xTokenContractKakaroto = xTokenContract.connect(kakaroto);
    xTokenContractVegeta = xTokenContract.connect(vegeta);
    xTokenContractKarpincho = xTokenContract.connect(karpincho);

    await xTokenContract.setWrapper(xTokenWrapperMockContract.address);

    xTokenWrapperMockContractKakaroto = xTokenWrapperMockContract.connect(kakaroto);
    xTokenWrapperMockContractVegeta = xTokenWrapperMockContract.connect(vegeta);
    xTokenWrapperMockContractKarpincho = xTokenWrapperMockContract.connect(karpincho);

    await reverter.snapshot();
  });

  describe('Initialization', () => {
    it('Should not allow to call initialize after deployment', async function () {
      await expect(
        authorizationContract.initialize(
          permissionsContract.address,
          eurPriceFeedContract.address,
          operationsRegistryContract.address,
          bFactoryContract.address,
          xTokenWrapperMockContract.address,
          tradingLimit,
          false,
        ),
      ).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('Should set the right values', async function () {
      const ownerAddress = await authorizationContract.owner();
      const permissionsAddress = await authorizationContract.permissions();
      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      const operationsRegistryAddress = await authorizationContract.operationsRegistry();
      const poolFactoryAddress = await authorizationContract.poolFactory();
      const xTokenWrapperAddress = await authorizationContract.xTokenWrapper();
      const tradingLimitValue = await authorizationContract.tradingLimit();
      const pausedValue = await authorizationContract.paused();

      expect(ownerAddress).to.equal(deployerAddress);
      expect(permissionsAddress).to.equal(permissionsContract.address);
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract.address);
      expect(operationsRegistryAddress).to.equal(operationsRegistryContract.address);
      expect(poolFactoryAddress).to.equal(bFactoryContract.address);
      expect(xTokenWrapperAddress).to.equal(xTokenWrapperMockContract.address);
      expect(tradingLimitValue).to.equal(tradingLimit.toString());
      expect(pausedValue).to.equal(false);
    });
  });

  describe('Ownership', () => {
    before(async () => {
      await reverter.revert();
    });

    it('Should not allow to set permissinos address to non owner', async function () {
      await expect(authorizationContractKakaroto.setPermissions(permissionsContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set eur price feed address to non owner', async function () {
      await expect(authorizationContractKakaroto.setEurPriceFeed(eurPriceFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set trading registry address to non owner', async function () {
      await expect(
        authorizationContractKakaroto.setOperationsRegistry(operationsRegistryContract.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not allow to set pool factory address to non owner', async function () {
      await expect(authorizationContractKakaroto.setPoolFactory(bFactoryContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set xTokenWrapper address to non owner', async function () {
      await expect(
        authorizationContractKakaroto.setXTokenWrapper(xTokenWrapperMockContract.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not allow to set trading limit to non owner', async function () {
      await expect(authorizationContractKakaroto.setTradingLimit(tradingLimit)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to pause to non owner', async function () {
      await expect(authorizationContractKakaroto.pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not allow to unpause to non owner', async function () {
      await expect(authorizationContractKakaroto.unpause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should allow to set permissions address to owner', async function () {
      const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
      const newPermissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
      await newPermissionsContract.deployed();

      await authorizationContract.setPermissions(newPermissionsContract.address);

      const permissionsAddress = await authorizationContract.permissions();
      expect(permissionsAddress).to.equal(newPermissionsContract.address);
    });

    it('Should allow to set eur price feed address to owner', async function () {
      const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock', vegeta);
      const newEurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
      await newEurPriceFeedContract.deployed();

      await authorizationContract.setEurPriceFeed(newEurPriceFeedContract.address);

      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      expect(eurPriceFeedAddress).to.equal(newEurPriceFeedContract.address);
    });

    it('Should allow to set trading registry address to owner', async function () {
      const OperationsRegistry = await ethers.getContractFactory('OperationsRegistry', vegeta);
      const newOperationsRegistryContract = (await OperationsRegistry.deploy(
        eurPriceFeedContract.address,
      )) as OperationsRegistry;
      await newOperationsRegistryContract.deployed();

      await authorizationContract.setOperationsRegistry(newOperationsRegistryContract.address);

      const operationsRegistryAddress = await authorizationContract.operationsRegistry();
      expect(operationsRegistryAddress).to.equal(newOperationsRegistryContract.address);
    });

    it('Should allow to set pool factory address to owner', async function () {
      const BFactoryMockFactrory = await ethers.getContractFactory('BFactoryMock');
      const newPoolFactoryContract = (await BFactoryMockFactrory.deploy()) as BFactoryMock;
      await newPoolFactoryContract.deployed();

      await authorizationContract.setPoolFactory(newPoolFactoryContract.address);

      const poolFactoryAddress = await authorizationContract.poolFactory();
      expect(poolFactoryAddress).to.equal(newPoolFactoryContract.address);
    });

    it('Should allow to set xTokenWrapper address to owner', async function () {
      const XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapperMock');
      const newXTokenWrapperContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapperMock;
      await newXTokenWrapperContract.deployed();

      await authorizationContract.setXTokenWrapper(newXTokenWrapperContract.address);

      const xTokenWrapperAddress = await authorizationContract.xTokenWrapper();
      expect(xTokenWrapperAddress).to.equal(newXTokenWrapperContract.address);
    });

    it('Should allow to set trading limit to owner', async function () {
      await authorizationContract.setTradingLimit(tradingLimit.mul(2));

      const tradingLimitValue = await authorizationContract.tradingLimit();
      expect(tradingLimitValue).to.equal(tradingLimit.mul(2).toString());
    });

    it('Should allow to pause to owner', async function () {
      await authorizationContract.pause();
      const pausedValue = await authorizationContract.paused();
      expect(pausedValue).to.equal(true);
    });

    it('Should allow to unpause to owner', async function () {
      await authorizationContract.unpause();
      const pausedValue = await authorizationContract.paused();
      expect(pausedValue).to.equal(false);
    });
  });

  describe('#pause - #unpause', () => {
    before(async () => {
      await reverter.revert();
    });

    it('Should not allow to unpause when already unpaused', async function () {
      await expect(authorizationContract.unpause()).to.be.revertedWith('not paused');
    });

    it('Should not allow to pause when already paused', async function () {
      await authorizationContract.pause();
      await expect(authorizationContract.pause()).to.be.revertedWith('paused');
    });
  });

  describe('#isAuthorized', () => {
    before(async () => {
      await reverter.revert();

      await permissionsContract.assingTier1(deployerAddress);
      await permissionsContract.assingTier2(deployerAddress);

      await permissionsContract.assingTier1(kakarotoAddress);

      await permissionsContract.assingTier1(vegetaAddress);
      await permissionsContract.assingTier2(vegetaAddress);

      await reverter.snapshot();
    });

    describe('Tier 0 User - Protocol Unpaused', () => {
      describe('ERC20 Operations', () => {
        // zero amount operations
        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractKarpincho.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractKarpincho.unwrap(xTokenContract.address, 0);
          await xTokenContractKarpincho.transfer(deployerAddress, 0);
          await xTokenContractKakaroto.transferFrom(karpinchoAddress, deployerAddress, 0);
        });
        // mint
        it('should not be able to wrap', async () => {
          await expect(xTokenWrapperMockContractKarpincho.wrap(xTokenContract.address, 1)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // burn
        it('should not be able to unwrap', async () => {
          await expect(xTokenWrapperMockContractKarpincho.unwrap(xTokenContract.address, 1)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // transfer
        it('should not be able to transfer', async () => {
          await expect(xTokenContractKarpincho.transfer(deployerAddress, 1)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          await xTokenContractKarpincho.approve(kakarotoAddress, 1);
          await expect(xTokenContractKakaroto.transferFrom(karpinchoAddress, deployerAddress, 1)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });
      });
    });

    describe('Tier 1 User - Protocol Unpaused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 0);
          await xTokenContractKakaroto.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(kakarotoAddress, deployerAddress, 0);
        });

        // mint
        it('should be able to wrap less than the allowed limit', async () => {
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1');
          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);

          expect(kakarotoBalance).to.equal('1');
        });

        it('should be able to wrap up to allowed limit', async () => {
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '4999');
          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);

          expect(kakarotoBalance).to.equal('5000');
        });

        it('should not be able to wrap more than allowed limit', async () => {
          await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('5000');
        });

        // burn
        it('should be able to unwrap less than the allowed limit', async () => {
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('4999');
        });

        it('should be able to unwrap up to the allowed limit', async () => {
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '4999');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('0');
        });

        it('should not be able to unwrap more than allowed limit', async () => {
          await xTokenWrapperMockContract.wrap(xTokenContract.address, '1');
          await xTokenContract.transfer(kakarotoAddress, '1');

          await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('1');
        });

        // transfer
        it('should be able to transfer less than the allowed limit', async () => {
          await xTokenWrapperMockContract.wrap(xTokenContract.address, '10000');
          await xTokenContract.transfer(kakarotoAddress, '10000');

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);

          await xTokenContractKakaroto.transfer(deployerAddress, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.transfer(deployerAddress, '4999');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('4999'));
        });

        it('should not be able to transfer more than the allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenContractKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transferFrom
        it('should be able to transferFrom less than the allowed limit', async () => {
          // need to rever because it has already transferred its limit
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '10000');
          await xTokenContract.transfer(kakarotoAddress, '10000');

          await xTokenContractKakaroto.approve(deployerAddress, '10000');

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);

          await xTokenContract.transferFrom(kakarotoAddress, deployerAddress, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        it('should be able to transferFrom up to the allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContract.transferFrom(kakarotoAddress, deployerAddress, '4999');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('4999'));
        });

        it('should not be able to transferFrom more than the allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenContract.transferFrom(kakarotoAddress, deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });
      });
    });

    describe('Tier 2 User - Protocol Unpaused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, 0);
          await xTokenContractVegeta.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(vegetaAddress, deployerAddress, 0);
        });

        // mint
        it('should be able to wrap less than the allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1');
          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);

          expect(vegetaBalance).to.equal('1');
        });

        it('should be able to wrap up to allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '4999');
          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);

          expect(vegetaBalance).to.equal('5000');
        });

        it('should be able to wrap more than allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('5001');
        });

        // burn
        it('should be able to unwrap less than the allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('5000');
        });

        it('should be able to unwrap up to the allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '4999');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('1');
        });

        it('should be able to unwrap more than allowed limit', async () => {
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('0');
        });

        // transfer
        it('should be able to transfer less than the allowed limit', async () => {
          await xTokenWrapperMockContract.wrap(xTokenContract.address, '10000');
          await xTokenContract.transfer(vegetaAddress, '10000');

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);

          await xTokenContractVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.transfer(deployerAddress, '4999');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('4999'));
        });

        it('should be able to transfer more than the allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transferFrom
        it('should be able to transferFrom less than the allowed limit', async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '10000');
          await xTokenContract.transfer(vegetaAddress, '10000');

          await xTokenContractVegeta.approve(deployerAddress, '10000');

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);

          await xTokenContract.transferFrom(vegetaAddress, deployerAddress, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        it('should be able to transferFrom up to the allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContract.transferFrom(vegetaAddress, deployerAddress, '4999');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('4999'));
        });

        it('should be able to transferFrom more than the allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);

          await xTokenContract.transferFrom(vegetaAddress, deployerAddress, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });
      });
    });

    describe('Tier 1 User - Protocol Paused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '1');
          await xTokenContract.transfer(kakarotoAddress, '1');

          await authorizationContract.pause();
        });

        it('should not allow zero amount operations', async () => {
          await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenContractKakaroto.transfer(deployerAddress, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenContractKarpincho.transferFrom(kakarotoAddress, deployerAddress, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // mint
        it('should not be able to wrap', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transfer
        it('should not be able to transfer', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenContractKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await expect(
            xTokenContract.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });
      });
    });

    describe('Tier 2 User - Protocol Paused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '1');
          await xTokenContract.transfer(vegetaAddress, '1');

          await authorizationContract.pause();
        });

        it('should not allow zero amount operations', async () => {
          await expect(xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenContractVegeta.transfer(deployerAddress, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
          await expect(xTokenContractKarpincho.transferFrom(vegetaAddress, deployerAddress, 0)).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // mint
        it('should not be able to wrap', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1')).be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // transfer
        it('should not be able to transfer', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenContractVegeta.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.approve(deployerAddress, vegetaInitialBalance);
          await expect(
            xTokenContract.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });
      });
    });

    describe('Tier 1 User - Suspended User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '30');
          await xTokenContract.transfer(vegetaAddress, '15');
          await xTokenContract.transfer(kakarotoAddress, '15');

          await permissionsContract.suspendUser(kakarotoAddress);
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 0);
          await xTokenContractKakaroto.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(kakarotoAddress, deployerAddress, 0);
        });

        // mint
        it('should not be able to wrap', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.add('1'));
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transfer
        it('should not be able to transfer', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenContractKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await expect(
            xTokenContract.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.approve(deployerAddress, vegetaInitialBalance);
          await xTokenContract.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance);

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('0');
        });
      });
    });

    describe('Tier 2 User - Suspended User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '30');
          await xTokenContract.transfer(vegetaAddress, '15');
          await xTokenContract.transfer(kakarotoAddress, '15');

          await permissionsContract.suspendUser(vegetaAddress);
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, 0);
          await xTokenContractVegeta.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(vegetaAddress, deployerAddress, 0);
        });

        // mint
        it('should not be able to wrap', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.add('1'));
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        // transfer
        it('should not be able to transfer', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenContractVegeta.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.transfer(deployerAddress, '1');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.approve(deployerAddress, vegetaInitialBalance);
          await expect(
            xTokenContract.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await xTokenContract.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance);

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('0');
        });
      });
    });

    describe('Tier 1 Rejected User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '30');
          await xTokenContract.transfer(vegetaAddress, '15');
          await xTokenContract.transfer(kakarotoAddress, '15');

          await permissionsContract.rejectUser(kakarotoAddress);

          await reverter.snapshot();
        });

        beforeEach(async () => {
          await reverter.revert();
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 0);
          await xTokenContractKakaroto.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(kakarotoAddress, deployerAddress, 0);
        });

        // mint
        it('should not be able to wrap', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // burn
        it('should be able to unwrap all its balance', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, kakarotoInitialBalance);

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('0');
        });

        // transfer
        it('should not be able to transfer', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await expect(xTokenContractKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transferFrom - TODO temporary, until defining this case with LPT
        it('should not be able to transferFrom', async () => {
          const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
          await xTokenContractKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await expect(
            xTokenContract.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });
      });
    });

    describe('Tier 2 Rejected User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await xTokenWrapperMockContract.wrap(xTokenContract.address, '30');
          await xTokenContract.transfer(vegetaAddress, '15');

          await permissionsContract.rejectUser(vegetaAddress);

          await reverter.snapshot();
        });

        beforeEach(async () => {
          await reverter.revert();
        });

        it('should allow zero amount operations', async () => {
          await xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, 0);
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, 0);
          await xTokenContractVegeta.transfer(deployerAddress, 0);
          await xTokenContractKarpincho.transferFrom(vegetaAddress, deployerAddress, 0);
        });

        // mint
        it('should not be able to wrap', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // burn
        it('should be able to unwrap all its balance', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, vegetaInitialBalance);

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('0');
        });

        // transfer
        it('should not be able to transfer', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await expect(xTokenContractVegeta.transfer(deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // transferFrom - TODO temporary, until defining this case with LPT
        it('should not be able to transferFrom', async () => {
          const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
          await xTokenContractVegeta.approve(deployerAddress, vegetaInitialBalance);
          await expect(
            xTokenContract.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance),
          ).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });
      });
    });

    describe('xLPT', () => {
      before(async () => {
        await reverter.revert();

        await permissionsContract.setAsProtocolContract(deployerAddress);
        await bFactoryContract.setIsBPoolAnswer(true);

        expect(await bFactoryContract.isBPool(xTokenContract.address)).to.equal(true);

        await reverter.snapshot();
      });

      describe('PROTOCOL_CONTRACT address', () => {
        describe('ERC20 Operations', () => {
          // mint
          it('should be able to wrap unlimited LPT', async () => {
            const deployerBallanceBefore = await xTokenContract.balanceOf(deployerAddress);
            await xTokenWrapperMockContract.wrap(xTokenContract.address, tradingLimit.mul(100));
            const deployerBallanceAfter = await xTokenContract.balanceOf(deployerAddress);

            expect(deployerBallanceAfter).to.equal(deployerBallanceBefore.add(tradingLimit.mul(100)));
          });

          // transfer
          it('should be able to transfer unlimited LPT', async () => {
            const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
            const kakarotoInitialBalance = await xTokenContract.balanceOf(kakarotoAddress);
            const karpinchoInitialBalance = await xTokenContract.balanceOf(karpinchoAddress);

            await xTokenContract.transfer(vegetaAddress, '10000');
            await xTokenContract.transfer(kakarotoAddress, '10000');
            await xTokenContract.transfer(karpinchoAddress, '10000');

            const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);
            const kakarotoBalance = await xTokenContract.balanceOf(kakarotoAddress);
            const karpinchoBalance = await xTokenContract.balanceOf(karpinchoAddress);
            expect(vegetaBalance).to.equal(vegetaInitialBalance.add('10000'));
            expect(kakarotoBalance).to.equal(kakarotoInitialBalance.add('10000'));
            expect(karpinchoBalance).to.equal(karpinchoInitialBalance.add('10000'));
          });

          // transferFrom
          it('should be able to transferFrom unlimited LPT', async () => {
            const vegetaInitialBalance = await xTokenContract.balanceOf(vegetaAddress);
            await xTokenContractVegeta.approve(deployerAddress, '10000');

            await xTokenContract.transferFrom(vegetaAddress, deployerAddress, '10000');

            const vegetaBalance = await xTokenContract.balanceOf(vegetaAddress);

            expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('10000'));
          });

          // burn
          it('should be able to burn unlimited LPT', async () => {
            const delpoyerInitialBalance = await xTokenContract.balanceOf(deployerAddress);

            await xTokenWrapperMockContract.unwrap(xTokenContract.address, delpoyerInitialBalance);

            const delpoyerBalance = await xTokenContract.balanceOf(deployerAddress);

            expect(delpoyerBalance).to.equal('0');
          });
        });
      });

      describe('NON PROTOCOL_CONTRACT address', () => {
        describe('ERC20 Operations', () => {
          before(async () => {
            await reverter.revert();

            await xTokenWrapperMockContract.wrap(xTokenContract.address, tradingLimit.mul(100));
            await xTokenContract.transfer(vegetaAddress, '10000');

            await xTokenContract.approve(vegetaAddress, '10000');
            await xTokenContract.approve(kakarotoAddress, '10000');
            await xTokenContract.approve(karpinchoAddress, '10000');

            await reverter.snapshot();
          });
          // mint
          it('should not be able to wrap xLPT', async () => {
            await expect(xTokenWrapperMockContractVegeta.wrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenWrapperMockContractKarpincho.wrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
          });

          // burn
          it('should not be able to unwrap xLPT', async () => {
            await expect(xTokenWrapperMockContractVegeta.unwrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenWrapperMockContractKarpincho.unwrap(xTokenContract.address, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
          });

          // transfer
          it('should not be able to transfer xLPT', async () => {
            await expect(xTokenContractVegeta.transfer(deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenContractKakaroto.transfer(deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenContractKarpincho.transfer(deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
          });

          // transferFrom
          it('should not be able to transferFrom xLPT', async () => {
            await expect(xTokenContractVegeta.transferFrom(deployerAddress, deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenContractKakaroto.transferFrom(deployerAddress, deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
            await expect(xTokenContractKakaroto.transferFrom(deployerAddress, deployerAddress, 1)).to.be.revertedWith(
              'Authorizable: not authorized',
            );
          });
        });
      });
    });

    describe('Pool Creator', () => {
      before(async () => {
        await reverter.revert();

        await permissionsContract.setAsPoolCreator(deployerAddress);

        await reverter.snapshot();
      });

      it('non pool creator user should no be able to create new pools', async () => {
        await expect(bFactoryContractKakaroto.newBPool()).to.be.revertedWith('Authorizable: not authorized');
      });

      it('pool creator user should be able to create new pools', async () => {
        await expect(bFactoryContract.newBPool()).to.emit(bFactoryContract, 'LOG_NEW_POOL').withArgs(deployerAddress);
      });
    });
  });
});
