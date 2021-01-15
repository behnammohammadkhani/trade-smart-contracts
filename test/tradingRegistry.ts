import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { EurPriceFeedMock, TradingRegistry, TradingRegistryAssetMock } from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;
// let vegeta: Signer;
// let karpincho: Signer;

// let deployerAddress: string;
// let kakarotoAddress: string;
// let vegetaAddress: string;
// let karpinchoAddress: string;

let eurPriceFeedContract: EurPriceFeedMock;
let tradingRegistryContract: TradingRegistry;
let tradingRegistryContractKakaroto: TradingRegistry;

let allowedAssetContract: TradingRegistryAssetMock;
let disallowedAssetContract: TradingRegistryAssetMock;

// const tradingLimit = ethers.constants.One.mul(5000);

describe('TradingRegistry', function () {
  const reverter = new Reverter();

  before(async () => {
    kakaroto = (await ethers.getSigners())[1];
    // [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const TradingRegistry = await ethers.getContractFactory('TradingRegistry');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
    const TradingRegistryAssetMock = await ethers.getContractFactory('TradingRegistryAssetMock');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    tradingRegistryContract = (await TradingRegistry.deploy(eurPriceFeedContract.address)) as TradingRegistry;
    await tradingRegistryContract.deployed();

    tradingRegistryContractKakaroto = await tradingRegistryContract.connect(kakaroto);

    allowedAssetContract = (await TradingRegistryAssetMock.deploy(
      tradingRegistryContract.address,
    )) as TradingRegistryAssetMock;
    await allowedAssetContract.deployed();
    disallowedAssetContract = (await TradingRegistryAssetMock.deploy(
      tradingRegistryContract.address,
    )) as TradingRegistryAssetMock;
    await disallowedAssetContract.deployed();

    await tradingRegistryContract.allowAsset(allowedAssetContract.address);

    await reverter.snapshot();
  });

  describe('#setEurPriceFeed - #allowAsset - #disallowAsset', () => {
    let eurPriceFeedContract2: EurPriceFeedMock;

    before(async () => {
      await reverter.revert();
    });

    it('Should not allow to set eurPriceFeed address to non owner', async function () {
      await expect(tradingRegistryContractKakaroto.setEurPriceFeed(eurPriceFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set eurPriceFeed as zero address to owner', async function () {
      await expect(tradingRegistryContract.setEurPriceFeed(ethers.constants.AddressZero)).to.be.revertedWith(
        'eur price feed is the zero address',
      );
    });

    it('Should allow to set eurPriceFeed address to owner', async function () {
      const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
      eurPriceFeedContract2 = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
      await eurPriceFeedContract2.deployed();

      await tradingRegistryContract.setEurPriceFeed(eurPriceFeedContract2.address);

      const eurPriceFeedAddress = await tradingRegistryContract.eurPriceFeed();
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract2.address);
    });

    it('Should not allow to set allowed asset address to non owner', async function () {
      await expect(tradingRegistryContractKakaroto.allowAsset(allowedAssetContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to allowed asset as zero address to owner', async function () {
      await expect(tradingRegistryContract.allowAsset(ethers.constants.AddressZero)).to.be.revertedWith(
        'asset is the zero address',
      );
    });

    it('Should allow to allowed asset address to owner', async function () {
      await tradingRegistryContract.allowAsset(allowedAssetContract.address);
      expect(await tradingRegistryContract.allowedAssets(allowedAssetContract.address)).to.equal(true);
    });
  });
});
