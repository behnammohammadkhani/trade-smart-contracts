import { ethers } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { EurPriceFeed, ChainlinkAggregatorMock, ERC20Detailed } from '../typechain';
import Reverter from './utils/reverter';

let kakaroto: Signer;
// let kakarotoAddress: string;

let eurPriceFeedContract: EurPriceFeed;
let eurUsdFeedContract: ChainlinkAggregatorMock;
let ethUsdFeedContract: ChainlinkAggregatorMock;
let daiEthFeedContract: ChainlinkAggregatorMock;
let usdcEthFeedContract: ChainlinkAggregatorMock;

let EurPriceFeedFactory: ContractFactory;
let ChainlinkAggregatorMockFactory: ContractFactory;

let daiToken: ERC20Detailed;
let usdcToken: ERC20Detailed;
let wbtcToken: ERC20Detailed;

const agregatorAbi = ['function latestAnswer() external view returns (int256)'];

describe('OperationsRegistry', function () {
  const reverter = new Reverter();

  before(async () => {
    kakaroto = (await ethers.getSigners())[1];
    // [kakarotoAddress] = await Promise.all([kakaroto.getAddress()]);

    EurPriceFeedFactory = await ethers.getContractFactory('EurPriceFeed');
    ChainlinkAggregatorMockFactory = await ethers.getContractFactory('ChainlinkAggregatorMock');
    const ERC20DetailedFactory = await ethers.getContractFactory('ERC20Detailed');

    eurUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(8, 121376500)) as ChainlinkAggregatorMock;
    await eurUsdFeedContract.deployed();

    ethUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(8, 121296133391)) as ChainlinkAggregatorMock;
    await eurUsdFeedContract.deployed();

    daiEthFeedContract = (await ChainlinkAggregatorMockFactory.deploy(18, 827400000000000)) as ChainlinkAggregatorMock;
    await daiEthFeedContract.deployed();

    usdcEthFeedContract = (await ChainlinkAggregatorMockFactory.deploy(18, 839155000000000)) as ChainlinkAggregatorMock;
    await usdcEthFeedContract.deployed();

    daiToken = (await ERC20DetailedFactory.deploy('DAI', 'DAI', 18)) as ERC20Detailed;
    await daiToken.deployed();

    usdcToken = (await ERC20DetailedFactory.deploy('USDC', 'USDC', 8)) as ERC20Detailed;
    await usdcToken.deployed();

    wbtcToken = (await ERC20DetailedFactory.deploy('USDC', 'USDC', 8)) as ERC20Detailed;
    await wbtcToken.deployed();

    await reverter.snapshot();
  });

  describe('deploy', () => {
    it('should revert when _eurUsdFeed is zero address', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          ethers.constants.AddressZero,
          ethUsdFeedContract.address,
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('eur/usd price feed is the zero address');
    });

    it('should revert when _ethUsdFeed is zero address', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          eurUsdFeedContract.address,
          ethers.constants.AddressZero,
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('eth/usd price feed is the zero address');
    });

    it('should revert when more assets than feeds', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          eurUsdFeedContract.address,
          ethUsdFeedContract.address,
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address],
        ),
      ).to.be.revertedWith('assets and feeds lengths not match');
    });

    it('should revert when more feeds than assets', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          eurUsdFeedContract.address,
          ethUsdFeedContract.address,
          [usdcToken.address],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('assets and feeds lengths not match');
    });

    it('should revert when an asset is zero address', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          eurUsdFeedContract.address,
          ethUsdFeedContract.address,
          [usdcToken.address, ethers.constants.AddressZero],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('asset is the zero address');
    });

    it('should revert when a feed is zero address', async () => {
      await expect(
        EurPriceFeedFactory.deploy(
          eurUsdFeedContract.address,
          ethUsdFeedContract.address,
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address, ethers.constants.AddressZero],
        ),
      ).to.be.revertedWith('feed is the zero address');
    });
  });

  describe('ownership', () => {
    let eurPriceFeedContractKakaroto: EurPriceFeed;
    before(async () => {
      await reverter.revert();

      eurPriceFeedContract = (await EurPriceFeedFactory.deploy(
        eurUsdFeedContract.address,
        ethUsdFeedContract.address,
        [usdcToken.address, daiToken.address],
        [usdcEthFeedContract.address, daiEthFeedContract.address],
      )) as EurPriceFeed;

      eurPriceFeedContractKakaroto = await eurPriceFeedContract.connect(kakaroto);
    });

    it('should not allow to setEurUsdFeed to non owner', async () => {
      await expect(eurPriceFeedContractKakaroto.setEurUsdFeed(eurUsdFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owne',
      );
    });

    it('should not allow to setEurUsdFeed as zero address to owner', async () => {
      await expect(eurPriceFeedContract.setEurUsdFeed(ethers.constants.AddressZero)).to.be.revertedWith(
        'eur/usd price feed is the zero address',
      );
    });

    it('should allow to setEurUsdFeed to owner', async () => {
      const newEurUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(
        8,
        121376500,
      )) as ChainlinkAggregatorMock;
      await newEurUsdFeedContract.deployed();

      await eurPriceFeedContract.setEurUsdFeed(newEurUsdFeedContract.address);

      const newEurUsdFeedContractAddress = await eurPriceFeedContract.eurUsdFeed();
      expect(newEurUsdFeedContractAddress).to.equal(newEurUsdFeedContract.address);
    });

    it('should not allow to setEthUsdFeed to non owner', async () => {
      await expect(eurPriceFeedContractKakaroto.setEthUsdFeed(eurUsdFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owne',
      );
    });

    it('should not allow to setEthUsdFeed as zero address to owner', async () => {
      await expect(eurPriceFeedContract.setEthUsdFeed(ethers.constants.AddressZero)).to.be.revertedWith(
        'eth/usd price feed is the zero address',
      );
    });

    it('should allow to setEthUsdFeed to owner', async () => {
      const newEthUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(
        8,
        121296133391,
      )) as ChainlinkAggregatorMock;
      await newEthUsdFeedContract.deployed();

      await eurPriceFeedContract.setEthUsdFeed(newEthUsdFeedContract.address);

      const newEthUsdFeedContractAddress = await eurPriceFeedContract.ethUsdFeed();
      expect(newEthUsdFeedContractAddress).to.equal(newEthUsdFeedContract.address);
    });

    it('should not allow to setAssetsFeeds to non owner', async () => {
      await expect(
        eurPriceFeedContractKakaroto.setAssetsFeeds(
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('Ownable: caller is not the owne');
    });

    it('should not allow to set more assets than feeds to owner', async () => {
      await expect(
        eurPriceFeedContract.setAssetsFeeds([usdcToken.address, daiToken.address], [usdcEthFeedContract.address]),
      ).to.be.revertedWith('assets and feeds lengths not match');
    });

    it('should not allow to more feeds than assets to owner', async () => {
      await expect(
        eurPriceFeedContract.setAssetsFeeds(
          [usdcToken.address],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('assets and feeds lengths not match');
    });

    it('should not allow to an asset as address zero', async () => {
      await expect(
        eurPriceFeedContract.setAssetsFeeds(
          [usdcToken.address, ethers.constants.AddressZero],
          [usdcEthFeedContract.address, daiEthFeedContract.address],
        ),
      ).to.be.revertedWith('asset is the zero address');
    });

    it('should not allow to a feed as address zero', async () => {
      await expect(
        eurPriceFeedContract.setAssetsFeeds(
          [usdcToken.address, daiToken.address],
          [usdcEthFeedContract.address, ethers.constants.AddressZero],
        ),
      ).to.be.revertedWith('asset feed is the zero address');
    });

    it('should allow to setAssetsFeeds to owner', async () => {
      const newDaiEthFeedContract = (await ChainlinkAggregatorMockFactory.deploy(
        18,
        827400000000000,
      )) as ChainlinkAggregatorMock;
      await newDaiEthFeedContract.deployed();

      const newUsdcEthFeedContract = (await ChainlinkAggregatorMockFactory.deploy(
        18,
        839155000000000,
      )) as ChainlinkAggregatorMock;
      await newUsdcEthFeedContract.deployed();

      await eurPriceFeedContract.setAssetsFeeds(
        [usdcToken.address, daiToken.address],
        [newUsdcEthFeedContract.address, newDaiEthFeedContract.address],
      );

      const newDaiEthFeedContractAddress = await eurPriceFeedContract.assetEthFeed(daiToken.address);
      const newUsdcEthFeedContractAddress = await eurPriceFeedContract.assetEthFeed(usdcToken.address);
      expect(newDaiEthFeedContractAddress).to.equal(newDaiEthFeedContract.address);
      expect(newUsdcEthFeedContractAddress).to.equal(newUsdcEthFeedContract.address);
    });
  });
  describe('#getPrice', () => {
    before(async () => {
      await reverter.revert();

      eurPriceFeedContract = (await EurPriceFeedFactory.deploy(
        eurUsdFeedContract.address,
        ethUsdFeedContract.address,
        [usdcToken.address, daiToken.address],
        [usdcEthFeedContract.address, daiEthFeedContract.address],
      )) as EurPriceFeed;

      await reverter.snapshot();
    });

    it('should return 0 if no feed registered for the asset', async () => {
      const price = await eurPriceFeedContract.getPrice(wbtcToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(wbtcToken.address, 1);

      expect(price).to.equal('0');
      expect(amount).to.equal('0');
    });

    it('should return 0 if no eurUsdPrice returns a negative price', async () => {
      const newEurUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(8, -1)) as ChainlinkAggregatorMock;
      await newEurUsdFeedContract.deployed();
      await eurPriceFeedContract.setEurUsdFeed(newEurUsdFeedContract.address);

      const eruUsdFeedConfAddress = await eurPriceFeedContract.eurUsdFeed();
      const ethUsdFeedConfAddress = await eurPriceFeedContract.ethUsdFeed();
      const daiFeedConfAddress = await eurPriceFeedContract.assetEthFeed(daiToken.address);

      const eruUsdFeedConfContract = new ethers.Contract(
        eruUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const ethUsdFeedConfContract = new ethers.Contract(
        ethUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const daiFeedConfContract = new ethers.Contract(
        daiFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;

      expect((await eruUsdFeedConfContract.latestAnswer()).toNumber()).to.lt(0);
      expect((await ethUsdFeedConfContract.latestAnswer()).toNumber()).to.gt(0);
      expect((await daiFeedConfContract.latestAnswer()).toNumber()).to.gt(0);

      const price = await eurPriceFeedContract.getPrice(daiToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(daiToken.address, 1);

      expect(price).to.equal('0');
      expect(amount).to.equal('0');

      await reverter.revert();
    });

    it('should return 0 if no ethUsdPrice returns a negative price', async () => {
      const newEthUsdFeedContract = (await ChainlinkAggregatorMockFactory.deploy(8, -1)) as ChainlinkAggregatorMock;
      await newEthUsdFeedContract.deployed();
      await eurPriceFeedContract.setEthUsdFeed(newEthUsdFeedContract.address);

      const eruUsdFeedConfAddress = await eurPriceFeedContract.eurUsdFeed();
      const ethUsdFeedConfAddress = await eurPriceFeedContract.ethUsdFeed();
      const daiFeedConfAddress = await eurPriceFeedContract.assetEthFeed(daiToken.address);

      const eruUsdFeedConfContract = new ethers.Contract(
        eruUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const ethUsdFeedConfContract = new ethers.Contract(
        ethUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const daiFeedConfContract = new ethers.Contract(
        daiFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;

      expect((await eruUsdFeedConfContract.latestAnswer()).toNumber()).to.gt(0);
      expect((await ethUsdFeedConfContract.latestAnswer()).toNumber()).to.lt(0);
      expect((await daiFeedConfContract.latestAnswer()).toNumber()).to.gt(0);

      const price = await eurPriceFeedContract.getPrice(daiToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(daiToken.address, 1);

      expect(price).to.equal('0');
      expect(amount).to.equal('0');

      await reverter.revert();
    });

    it('should return 0 if no assetEhtPrice returns a negative price', async () => {
      const newDaiEthFeedContract = (await ChainlinkAggregatorMockFactory.deploy(18, -1)) as ChainlinkAggregatorMock;
      await newDaiEthFeedContract.deployed();
      await eurPriceFeedContract.setAssetsFeeds([daiToken.address], [newDaiEthFeedContract.address]);

      const eruUsdFeedConfAddress = await eurPriceFeedContract.eurUsdFeed();
      const ethUsdFeedConfAddress = await eurPriceFeedContract.ethUsdFeed();
      const daiFeedConfAddress = await eurPriceFeedContract.assetEthFeed(daiToken.address);

      const eruUsdFeedConfContract = new ethers.Contract(
        eruUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const ethUsdFeedConfContract = new ethers.Contract(
        ethUsdFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;
      const daiFeedConfContract = new ethers.Contract(
        daiFeedConfAddress,
        agregatorAbi,
        kakaroto,
      ) as ChainlinkAggregatorMock;

      expect((await eruUsdFeedConfContract.latestAnswer()).toNumber()).to.gt(0);
      expect((await ethUsdFeedConfContract.latestAnswer()).toNumber()).to.gt(0);
      expect((await daiFeedConfContract.latestAnswer()).toNumber()).to.lt(0);

      const price = await eurPriceFeedContract.getPrice(daiToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(daiToken.address, 1);

      expect(price).to.equal('0');
      expect(amount).to.equal('0');

      await reverter.revert();
    });

    it('should get the right price for DAI', async () => {
      // eth/usd 1212,96133391
      // eur/usd 1,21376500
      // 1,21376500 usd = 1 eru
      // 1212,96133391 usd = 1212,96133391/1,21376500 = 999,337873402 eur
      // dai/eth 0,000827400000000000
      // 1 eth = 999,337873402 eur
      // 0,0008274 eth = 999,337873402 * 0,000827400000000000 = 0,825692390000000000 eur

      const price = await eurPriceFeedContract.getPrice(daiToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(daiToken.address, 50);

      expect(price).to.equal('826852156452965771');
      expect(amount).to.equal('41342607822648288550');
    });

    it('should get the right price for USDC', async () => {
      // eth/usd 1212,96133391
      // eur/usd 1,21376500
      // 1,21376500 usd = 1 eru
      // 1212,96133391 usd = 1212,96133391/1,21376500 = 999,337873402 eur
      // dai/eth 0,000839155000000000
      // 1 eth = 999,337873402 eur
      // 0,000839155 eth = 999,337873402 * 0,00083915500000000000 = 0,838599373000000000 eur

      const price = await eurPriceFeedContract.getPrice(usdcToken.address);
      const amount = await eurPriceFeedContract.calculateAmount(usdcToken.address, 50);

      expect(price).to.equal('838599373154808426');
      // USDC is denominated in 8 decimal, so 50 USDC converted to 18 decimal is 500000000000
      expect(amount).to.equal('419299686577404213000000000000');
    });
  });
});
