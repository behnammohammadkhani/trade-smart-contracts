import { ethers, upgrades } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { Authorization, XTokenMock, PermissionsMock, EurPriceFeedMock, OperationsRegistry } from '../typechain';
import Reverter from './utils/reverter';

const { BigNumber } = ethers;
let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;
let karpincho: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let vegetaAddress: string;
let karpinchoAddress: string;

let token: XTokenMock;
let tokenKakaroto: XTokenMock;
let tokenVegeta: XTokenMock;
let tokenKarpincho: XTokenMock;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: Authorization;
let authorizationContractKakaroto: Authorization;
let operationsRegistryContract: OperationsRegistry;

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
    const xTokenMock = await ethers.getContractFactory('xTokenMock');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
    const OperationsRegistry = await ethers.getContractFactory('OperationsRegistry');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    permissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
    await permissionsContract.deployed();

    operationsRegistryContract = (await OperationsRegistry.deploy(eurPriceFeedContract.address)) as OperationsRegistry;
    await operationsRegistryContract.deployed();

    authorizationContract = (await upgrades.deployProxy(Authorization, [
      permissionsContract.address,
      eurPriceFeedContract.address,
      operationsRegistryContract.address,
      tradingLimit,
      false,
    ])) as Authorization;

    token = (await xTokenMock.deploy(
      'Authorizable Token',
      'AT',
      authorizationContract.address,
      operationsRegistryContract.address,
    )) as XTokenMock;
    await token.deployed();

    await operationsRegistryContract.allowAsset(token.address);

    authorizationContractKakaroto = authorizationContract.connect(kakaroto);

    tokenKakaroto = token.connect(kakaroto);
    tokenVegeta = token.connect(vegeta);
    tokenKarpincho = token.connect(karpincho);

    await reverter.snapshot();
  });

  describe('Initialization', () => {
    it('Should not allow to call initialize after deployment', async function () {
      await expect(
        authorizationContract.initialize(
          permissionsContract.address,
          eurPriceFeedContract.address,
          operationsRegistryContract.address,
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
      const tradingLimitValue = await authorizationContract.tradingLimit();
      const pausedValue = await authorizationContract.paused();

      expect(ownerAddress).to.equal(deployerAddress);
      expect(permissionsAddress).to.equal(permissionsContract.address);
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract.address);
      expect(operationsRegistryAddress).to.equal(operationsRegistryContract.address);
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

    it('Should not allow to set trading limit to non owner', async function () {
      await expect(authorizationContractKakaroto.setTradingLimint(tradingLimit)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to pause to non owner', async function () {
      await expect(authorizationContractKakaroto.pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not allow to unpause to non owner', async function () {
      await expect(authorizationContractKakaroto.unpause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should allow to set permissinos address to owner', async function () {
      const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
      const newPermissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
      await newPermissionsContract.deployed();

      await authorizationContract.setPermissions(newPermissionsContract.address);

      const permissionsAddress = await authorizationContract.permissions();
      expect(permissionsAddress).to.equal(newPermissionsContract.address);
    });

    it('Should allow to set eur price feed address to owner', async function () {
      const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
      const newEurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
      await newEurPriceFeedContract.deployed();

      await authorizationContract.setEurPriceFeed(newEurPriceFeedContract.address);

      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      expect(eurPriceFeedAddress).to.equal(newEurPriceFeedContract.address);
    });

    it('Should allow to set trading registry address to owner', async function () {
      const OperationsRegistry = await ethers.getContractFactory('OperationsRegistry');
      const newOperationsRegistryContract = (await OperationsRegistry.deploy(
        eurPriceFeedContract.address,
      )) as OperationsRegistry;
      await newOperationsRegistryContract.deployed();

      await authorizationContract.setOperationsRegistry(newOperationsRegistryContract.address);

      const operationsRegistryAddress = await authorizationContract.operationsRegistry();
      expect(operationsRegistryAddress).to.equal(newOperationsRegistryContract.address);
    });

    it('Should allow to set trading limit to owner', async function () {
      await authorizationContract.setTradingLimint(tradingLimit.mul(2));

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
        // mint
        it('should not be able to wrap', async () => {
          await expect(token.mint(karpinchoAddress, BigNumber.from(`${1}`))).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // burn
        it('should not be able to unwrap', async () => {
          await token.mint(deployerAddress, BigNumber.from(`${10}`));
          await token.transfer(karpinchoAddress, BigNumber.from(`${10}`));

          await expect(token.burnFrom(karpinchoAddress, BigNumber.from(`${10}`))).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // transfer
        it('should not be able to transfer', async () => {
          await expect(tokenKarpincho.transfer(deployerAddress, BigNumber.from(`${10}`))).to.be.revertedWith(
            'Authorizable: not authorized',
          );
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          await tokenKarpincho.approve(kakarotoAddress, '10');
          await expect(tokenKakaroto.transferFrom(karpinchoAddress, deployerAddress, '10')).to.be.revertedWith(
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

        // mint
        it('should be able to wrap less than the allowed limit', async () => {
          await token.mint(kakarotoAddress, '1');
          const kakarotoBalance = await token.balanceOf(kakarotoAddress);

          expect(kakarotoBalance).to.equal('1');
        });

        it('should be able to wrap up to allowed limit', async () => {
          await token.mint(kakarotoAddress, '4999');
          const kakarotoBalance = await token.balanceOf(kakarotoAddress);

          expect(kakarotoBalance).to.equal('5000');
        });

        it('should not be able to wrap more than allowed limit', async () => {
          await expect(token.mint(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('5000');
        });

        // burn
        it('should be able to unwrap less than the allowed limit', async () => {
          await token.burnFrom(kakarotoAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('4999');
        });

        it('should be able to unwrap up to the allowed limit', async () => {
          await token.burnFrom(kakarotoAddress, '4999');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('0');
        });

        it('should not be able to unwrap more than allowed limit', async () => {
          await token.mint(deployerAddress, '1');
          await token.transfer(kakarotoAddress, '1');

          await expect(token.burnFrom(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('1');
        });

        // transfer
        it('should be able to transfer less than the allowed limit', async () => {
          await token.mint(deployerAddress, '10000');
          await token.transfer(kakarotoAddress, '10000');

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);

          await tokenKakaroto.transfer(deployerAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await tokenKakaroto.transfer(deployerAddress, '4999');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('4999'));
        });

        it('should not be able to transfer more than the allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(tokenKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transferFrom
        it('should be able to transfer less than the allowed limit', async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '10000');
          await token.transfer(kakarotoAddress, '10000');

          await tokenKakaroto.approve(deployerAddress, '10000');

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);

          await token.transferFrom(kakarotoAddress, deployerAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await token.transferFrom(kakarotoAddress, deployerAddress, '4999');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('4999'));
        });

        it('should not be able to transfer more than the allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(token.transferFrom(kakarotoAddress, deployerAddress, '1')).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });
      });
    });

    describe('Tier 2 User - Protocol Unpaused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();
        });

        // mint
        it('should be able to wrap less than the allowed limit', async () => {
          await token.mint(vegetaAddress, '1');
          const vegetaBalance = await token.balanceOf(vegetaAddress);

          expect(vegetaBalance).to.equal('1');
        });

        it('should be able to wrap up to allowed limit', async () => {
          await token.mint(vegetaAddress, '4999');
          const vegetaBalance = await token.balanceOf(vegetaAddress);

          expect(vegetaBalance).to.equal('5000');
        });

        it('should be able to wrap more than allowed limit', async () => {
          await token.mint(vegetaAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('5001');
        });

        // burn
        it('should be able to unwrap less than the allowed limit', async () => {
          await token.burnFrom(vegetaAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('5000');
        });

        it('should be able to unwrap up to the allowed limit', async () => {
          await token.burnFrom(vegetaAddress, '4999');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('1');
        });

        it('should be able to unwrap more than allowed limit', async () => {
          await token.burnFrom(vegetaAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('0');
        });

        // transfer
        it('should be able to transfer less than the allowed limit', async () => {
          await token.mint(deployerAddress, '10000');
          await token.transfer(vegetaAddress, '10000');

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);

          await tokenVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.transfer(deployerAddress, '4999');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('4999'));
        });

        it('should be able to transfer more than the allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transferFrom
        it('should be able to transfer less than the allowed limit', async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '10000');
          await token.transfer(vegetaAddress, '10000');

          await tokenVegeta.approve(deployerAddress, '10000');

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);

          await token.transferFrom(vegetaAddress, deployerAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        it('should be able to transfer up to the allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await token.transferFrom(vegetaAddress, deployerAddress, '4999');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('4999'));
        });

        it('should be able to transfer more than the allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);

          await token.transferFrom(vegetaAddress, deployerAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });
      });
    });

    describe('Tier 1 User - Protocol Paused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '1');
          await token.transfer(kakarotoAddress, '1');

          await authorizationContract.pause();
        });

        // mint
        it('should not be able to wrap', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(token.mint(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(token.burnFrom(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transfer
        it('should not be able to transfer', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(tokenKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await tokenKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await expect(token.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance)).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);
        });
      });
    });

    describe('Tier 2 User - Protocol Paused', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '1');
          await token.transfer(vegetaAddress, '1');

          await authorizationContract.pause();
        });

        // mint
        it('should not be able to wrap', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(token.mint(vegetaAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(token.burnFrom(vegetaAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // transfer
        it('should not be able to transfer', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(tokenVegeta.transfer(deployerAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.approve(deployerAddress, vegetaInitialBalance);
          await expect(token.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance)).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);
        });
      });
    });

    describe('Tier 1 User - Paused User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '30');
          await token.transfer(vegetaAddress, '15');
          await token.transfer(kakarotoAddress, '15');

          await permissionsContract.pauseUser(kakarotoAddress);
        });

        // mint
        it('should not be able to wrap', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(token.mint(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await token.mint(vegetaAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.add('1'));
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(token.burnFrom(kakarotoAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await token.burnFrom(vegetaAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transfer
        it('should not be able to transfer', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await expect(tokenKakaroto.transfer(deployerAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.transfer(deployerAddress, '1');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance.sub('1'));
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await tokenKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await expect(token.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance)).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance);

          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.approve(deployerAddress, vegetaInitialBalance);
          await token.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance);

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal('0');
        });
      });
    });

    describe('Tier 2 User - Paused User', () => {
      describe('ERC20 Operations', () => {
        before(async () => {
          await reverter.revert();

          await token.mint(deployerAddress, '30');
          await token.transfer(vegetaAddress, '15');
          await token.transfer(kakarotoAddress, '15');

          await permissionsContract.pauseUser(vegetaAddress);
        });

        // mint
        it('should not be able to wrap', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(token.mint(vegetaAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await token.mint(kakarotoAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.add('1'));
        });

        // burn
        it('should not be able to unwrap more than allowed limit', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(token.burnFrom(vegetaAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await token.burnFrom(kakarotoAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        // transfer
        it('should not be able to transfer', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await expect(tokenVegeta.transfer(deployerAddress, '1')).to.be.revertedWith('Authorizable: not authorized');

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await tokenKakaroto.transfer(deployerAddress, '1');

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal(kakarotoInitialBalance.sub('1'));
        });

        // transferFrom
        it('should not be able to transferFrom', async () => {
          const vegetaInitialBalance = await token.balanceOf(vegetaAddress);
          await tokenVegeta.approve(deployerAddress, vegetaInitialBalance);
          await expect(token.transferFrom(vegetaAddress, deployerAddress, vegetaInitialBalance)).to.be.revertedWith(
            'Authorizable: not authorized',
          );

          const vegetaBalance = await token.balanceOf(vegetaAddress);
          expect(vegetaBalance).to.equal(vegetaInitialBalance);

          const kakarotoInitialBalance = await token.balanceOf(kakarotoAddress);
          await tokenKakaroto.approve(deployerAddress, kakarotoInitialBalance);
          await token.transferFrom(kakarotoAddress, deployerAddress, kakarotoInitialBalance);

          const kakarotoBalance = await token.balanceOf(kakarotoAddress);
          expect(kakarotoBalance).to.equal('0');
        });
      });
    });

    //
  });
});
