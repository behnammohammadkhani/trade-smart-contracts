import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { EurPriceFeedMock, OperationsRegistry, OperationsRegistryAssetMock } from '../typechain';
import Reverter from './utils/reverter';

let deployer: Signer;
let kakaroto: Signer;
// let vegeta: Signer;
// let karpincho: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
// let vegetaAddress: string;
// let karpinchoAddress: string;

let eurPriceFeedContract: EurPriceFeedMock;
let operationsRegistryContract: OperationsRegistry;
let operationsRegistryContractKakaroto: OperationsRegistry;

let allowedAssetContract: OperationsRegistryAssetMock;
let disallowedAssetContract: OperationsRegistryAssetMock;

let allowedAssetContractKakaroto: OperationsRegistryAssetMock;
let disallowedAssetContractKakaroto: OperationsRegistryAssetMock;

// const tradingLimit = ethers.constants.One.mul(5000);

let DEFAULT_ADMIN_ROLE: string;
let ASSETS_MANAGER_ROLE: string;
let FEED_MANAGER_ROLE: string;

describe('OperationsRegistry', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress] = await Promise.all([deployer.getAddress(), kakaroto.getAddress()]);

    const OperationsRegistry = await ethers.getContractFactory('OperationsRegistry');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
    const OperationsRegistryAssetMock = await ethers.getContractFactory('OperationsRegistryAssetMock');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    operationsRegistryContract = (await OperationsRegistry.deploy(eurPriceFeedContract.address)) as OperationsRegistry;
    await operationsRegistryContract.deployed();

    operationsRegistryContractKakaroto = await operationsRegistryContract.connect(kakaroto);

    allowedAssetContract = (await OperationsRegistryAssetMock.deploy(
      operationsRegistryContract.address,
    )) as OperationsRegistryAssetMock;
    await allowedAssetContract.deployed();
    disallowedAssetContract = (await OperationsRegistryAssetMock.deploy(
      operationsRegistryContract.address,
    )) as OperationsRegistryAssetMock;
    await disallowedAssetContract.deployed();

    // operationsRegistryContract.setFeedManager(deployerAddress);
    // operationsRegistryContract.setAssetsManager(deployerAddress);

    // await operationsRegistryContract.allowAsset(allowedAssetContract.address);

    allowedAssetContractKakaroto = allowedAssetContract.connect(kakaroto);
    disallowedAssetContractKakaroto = disallowedAssetContract.connect(kakaroto);

    await reverter.snapshot();
  });

  describe('#setFeedManager - #setAssetsManager', () => {
    it('non admin should not be able to setFeedManager', async () => {
      await expect(operationsRegistryContractKakaroto.setFeedManager(deployerAddress)).to.be.revertedWith(
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('admin should be able to setFeedManager', async () => {
      FEED_MANAGER_ROLE = await operationsRegistryContract.FEED_MANAGER_ROLE();
      await operationsRegistryContract.setFeedManager(deployerAddress);
      expect(await operationsRegistryContract.hasRole(FEED_MANAGER_ROLE, deployerAddress)).to.equal(true);
    });

    it('non admin should not be able to setAssetsManager', async () => {
      await expect(operationsRegistryContractKakaroto.setAssetsManager(deployerAddress)).to.be.revertedWith(
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('admin should be able to setAssetsManager', async () => {
      ASSETS_MANAGER_ROLE = await operationsRegistryContract.ASSETS_MANAGER_ROLE();
      await operationsRegistryContract.setAssetsManager(deployerAddress);
      expect(await operationsRegistryContract.hasRole(ASSETS_MANAGER_ROLE, deployerAddress)).to.equal(true);

      await reverter.snapshot();
    });
  });

  describe('#setEurPriceFeed - #allowAsset - #disallowAsset', () => {
    let eurPriceFeedContract2: EurPriceFeedMock;

    before(async () => {
      await reverter.revert();
    });

    it('Should not allow to set eurPriceFeed address to non feed manager', async function () {
      await expect(operationsRegistryContractKakaroto.setEurPriceFeed(eurPriceFeedContract.address)).to.be.revertedWith(
        'must have feed manager role',
      );
    });

    it('Should not allow to set eurPriceFeed as zero address to feed manager', async function () {
      await expect(operationsRegistryContract.setEurPriceFeed(ethers.constants.AddressZero)).to.be.revertedWith(
        'eur price feed is the zero address',
      );
    });

    it('Should allow to set eurPriceFeed address to feed manager', async function () {
      const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
      eurPriceFeedContract2 = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
      await eurPriceFeedContract2.deployed();

      await operationsRegistryContract.setEurPriceFeed(eurPriceFeedContract2.address);

      const eurPriceFeedAddress = await operationsRegistryContract.eurPriceFeed();
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract2.address);

      await reverter.snapshot();
    });

    it('Should not allow to set allowed asset address to non assets manager', async function () {
      await expect(operationsRegistryContractKakaroto.allowAsset(allowedAssetContract.address)).to.be.revertedWith(
        'must have asset manager role',
      );
    });

    it('Should not allow to allowed asset as zero address to assets manager', async function () {
      await expect(operationsRegistryContract.allowAsset(ethers.constants.AddressZero)).to.be.revertedWith(
        'asset is the zero address',
      );
    });

    it('Should allow to allowed asset address to assets manager', async function () {
      await operationsRegistryContract.allowAsset(allowedAssetContract.address);
      expect(await operationsRegistryContract.allowedAssets(allowedAssetContract.address)).to.equal(true);

      await reverter.snapshot();
    });
  });

  describe('#addTrade', () => {
    before(async () => {
      await reverter.revert();
      await operationsRegistryContract.allowAsset(allowedAssetContract.address);
    });

    it('Should not allow to call addTrade from a not allowed asset', async function () {
      await expect(disallowedAssetContractKakaroto.someFunction(1)).to.be.revertedWith('asset is not allowed');
    });

    it('Should allow to call addTrade from an allowed asset', async function () {
      await allowedAssetContractKakaroto.someFunction(15);
      let tradeBalance = await operationsRegistryContract.tradingBalanceByOperation(
        kakarotoAddress,
        allowedAssetContractKakaroto.interface.getSighash('someFunction'),
      );
      expect(tradeBalance).to.equal('15');
      await allowedAssetContractKakaroto.someFunction(1);
      await allowedAssetContractKakaroto.someFunction(7);
      tradeBalance = await operationsRegistryContract.tradingBalanceByOperation(
        kakarotoAddress,
        allowedAssetContractKakaroto.interface.getSighash('someFunction'),
      );
      expect(tradeBalance).to.equal('23');
    });
  });
});
