import { ethers, upgrades } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { Authorization, XTokenMock, PermissionsMock, EurPriceFeedMock, TradingRegistry } from '../typechain';
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
// let tokenVegeta: XTokenMock;
let tokenKarpincho: XTokenMock;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: Authorization;
let authorizationContractKakaroto: Authorization;
let tradingRegistryContract: TradingRegistry;

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
    const TradingRegistry = await ethers.getContractFactory('TradingRegistry');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    permissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
    await permissionsContract.deployed();

    tradingRegistryContract = (await TradingRegistry.deploy(eurPriceFeedContract.address)) as TradingRegistry;
    await tradingRegistryContract.deployed();

    authorizationContract = (await upgrades.deployProxy(Authorization, [
      permissionsContract.address,
      eurPriceFeedContract.address,
      tradingRegistryContract.address,
      tradingLimit,
    ])) as Authorization;

    token = (await xTokenMock.deploy(
      'Authorizable Token',
      'AT',
      authorizationContract.address,
      tradingRegistryContract.address,
    )) as XTokenMock;
    await token.deployed();

    await tradingRegistryContract.allowAsset(token.address);

    authorizationContractKakaroto = authorizationContract.connect(kakaroto);

    tokenKakaroto = token.connect(kakaroto);
    // tokenVegeta = token.connect(vegeta);
    tokenKarpincho = token.connect(karpincho);

    await reverter.snapshot();
  });

  describe('Initialization', () => {
    it('Should not allow to call initialize after deployment', async function () {
      await expect(
        authorizationContract.initialize(
          permissionsContract.address,
          eurPriceFeedContract.address,
          tradingRegistryContract.address,
          tradingLimit,
        ),
      ).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('Should set the right values', async function () {
      const ownerAddress = await authorizationContract.owner();
      const permissionsAddress = await authorizationContract.permissions();
      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      const tradingRegistryAddress = await authorizationContract.tradingRegistry();
      const tradingLimitValue = await authorizationContract.tradingLimit();

      expect(ownerAddress).to.equal(deployerAddress);
      expect(permissionsAddress).to.equal(permissionsContract.address);
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract.address);
      expect(tradingRegistryAddress).to.equal(tradingRegistryContract.address);
      expect(tradingLimitValue).to.equal(tradingLimit.toString());
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
        authorizationContractKakaroto.setTradingRegistry(tradingRegistryContract.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not allow to set trading limit to non owner', async function () {
      await expect(authorizationContractKakaroto.setTradingLimint(tradingLimit)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
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
      const TradingRegistry = await ethers.getContractFactory('TradingRegistry');
      const newTradingRegistryContract = (await TradingRegistry.deploy(
        eurPriceFeedContract.address,
      )) as TradingRegistry;
      await newTradingRegistryContract.deployed();

      await authorizationContract.setTradingRegistry(newTradingRegistryContract.address);

      const tradingRegistryAddress = await authorizationContract.tradingRegistry();
      expect(tradingRegistryAddress).to.equal(newTradingRegistryContract.address);
    });

    it('Should allow to set trading limit to owner', async function () {
      await authorizationContract.setTradingLimint(tradingLimit.mul(2));

      const tradingLimitValue = await authorizationContract.tradingLimit();
      expect(tradingLimitValue).to.equal(tradingLimit.mul(2).toString());
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

    describe('Tier 0 User', () => {
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

    describe('Tier 1 User', () => {
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
  });
});
