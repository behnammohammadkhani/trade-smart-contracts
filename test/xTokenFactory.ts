import { ethers } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import {
  EurPriceFeed,
  ChainlinkAggregatorMock,
  ERC20Detailed,
  OperationsRegistry,
  XTokenFactory,
  XTokenWrapper,
  AuthorizationMock,
  XToken,
} from '../typechain';
import Reverter from './utils/reverter';

let kakaroto: Signer;

let eurPriceFeedContract: EurPriceFeed;
let eurUsdFeedContract: ChainlinkAggregatorMock;
let ethUsdFeedContract: ChainlinkAggregatorMock;
let daiEthFeedContract: ChainlinkAggregatorMock;
let usdcEthFeedContract: ChainlinkAggregatorMock;

let EurPriceFeedFactory: ContractFactory;
let ChainlinkAggregatorMockFactory: ContractFactory;
let OperationsRegistryFactory: ContractFactory;
let XTokenFactoryFactory: ContractFactory;
let XTokenWrapperFactory: ContractFactory;
let operationsRegistryContract: OperationsRegistry;
let xTokenWrapperContract: XTokenWrapper;
let xTokenFactoryContract: XTokenFactory;
let xTokenFactoryContractKakaroto: XTokenFactory;
let authorizationContract: AuthorizationMock;
let XTokenContractFactory: ContractFactory;

let daiToken: ERC20Detailed;
let usdcToken: ERC20Detailed;

let DEFAULT_ADMIN_ROLE: string;
let WRAPPER_ROLE: string;

describe('XTokenFactory', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto] = await ethers.getSigners();

    EurPriceFeedFactory = await ethers.getContractFactory('EurPriceFeed');
    ChainlinkAggregatorMockFactory = await ethers.getContractFactory('ChainlinkAggregatorMock');
    const ERC20DetailedFactory = await ethers.getContractFactory('ERC20Detailed');
    OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistry');
    XTokenFactoryFactory = await ethers.getContractFactory('XTokenFactory');
    XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapper');
    const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
    XTokenContractFactory = await ethers.getContractFactory('XToken');

    authorizationContract = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
    await authorizationContract.deployed();

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

    eurPriceFeedContract = (await EurPriceFeedFactory.deploy(
      eurUsdFeedContract.address,
      ethUsdFeedContract.address,
      [usdcToken.address, daiToken.address],
      [usdcEthFeedContract.address, daiEthFeedContract.address],
    )) as EurPriceFeed;
    await eurPriceFeedContract.deployed();

    operationsRegistryContract = (await OperationsRegistryFactory.deploy(
      eurPriceFeedContract.address,
    )) as OperationsRegistry;
    await operationsRegistryContract.deployed();

    xTokenWrapperContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapper;
    await xTokenWrapperContract.deployed();

    await reverter.snapshot();
  });

  describe('deploy', () => {
    it('should revert when _xTokenWrapper is zero address', async () => {
      await expect(
        XTokenFactoryFactory.deploy(
          ethers.constants.AddressZero,
          operationsRegistryContract.address,
          eurPriceFeedContract.address,
        ),
      ).to.be.revertedWith('xToken wrapper is the zero address');
    });

    it('should revert when _operationsRegistry is zero address', async () => {
      await expect(
        XTokenFactoryFactory.deploy(
          xTokenWrapperContract.address,
          ethers.constants.AddressZero,
          eurPriceFeedContract.address,
        ),
      ).to.be.revertedWith('operations registry feed is the zero address');
    });

    it('should revert when _xTokenWrapper is zero address', async () => {
      await expect(
        XTokenFactoryFactory.deploy(
          xTokenWrapperContract.address,
          operationsRegistryContract.address,
          ethers.constants.AddressZero,
        ),
      ).to.be.revertedWith('eur price feed is the zero address');
    });
  });

  describe('#setXTokenWrapper', () => {
    before(async () => {
      xTokenFactoryContract = (await XTokenFactoryFactory.deploy(
        xTokenWrapperContract.address,
        operationsRegistryContract.address,
        eurPriceFeedContract.address,
      )) as XTokenFactory;
      await xTokenFactoryContract.deployed();

      await (await xTokenWrapperContract.setRegistryManager(xTokenFactoryContract.address)).wait();
      await (await operationsRegistryContract.setAssetsManager(xTokenFactoryContract.address)).wait();
      await (await eurPriceFeedContract.setFeedsManager(xTokenFactoryContract.address)).wait();

      xTokenFactoryContractKakaroto = await xTokenFactoryContract.connect(kakaroto);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to setXTokenWrapper to non owner', async () => {
      await expect(xTokenFactoryContractKakaroto.setXTokenWrapper(xTokenWrapperContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owne',
      );
    });

    it('should not allow to setXTokenWrapper as zero address to owner', async () => {
      await expect(xTokenFactoryContract.setXTokenWrapper(ethers.constants.AddressZero)).to.be.revertedWith(
        'xToken wrapper is the zero address',
      );
    });

    it('should allow to setXTokenWrapper to owner', async () => {
      const XTokenWrapperFactoryKakaroto = await ethers.getContractFactory('XTokenWrapper', kakaroto);
      const xTokenWrapperContract2 = (await XTokenWrapperFactoryKakaroto.deploy()) as XTokenWrapper;
      await xTokenWrapperContract2.deployed();

      await xTokenFactoryContract.setXTokenWrapper(xTokenWrapperContract2.address);

      const newxTokenWrapperContractAddress = await xTokenFactoryContract.xTokenWrapper();
      expect(newxTokenWrapperContractAddress).to.equal(xTokenWrapperContract2.address);
    });
  });

  describe('#setOperationsRegistry', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to setOperationsRegistry to non owner', async () => {
      await expect(
        xTokenFactoryContractKakaroto.setOperationsRegistry(operationsRegistryContract.address),
      ).to.be.revertedWith('Ownable: caller is not the owne');
    });

    it('should not allow to setOperationsRegistry as zero address to owner', async () => {
      await expect(xTokenFactoryContract.setOperationsRegistry(ethers.constants.AddressZero)).to.be.revertedWith(
        'operations registry feed is the zero address',
      );
    });

    it('should allow to setOperationsRegistry to owner', async () => {
      const OperationsRegistryFactoryKakaroto = await ethers.getContractFactory('OperationsRegistry', kakaroto);
      const operationsRegistryContract2 = (await OperationsRegistryFactoryKakaroto.deploy(
        eurPriceFeedContract.address,
      )) as OperationsRegistry;
      await operationsRegistryContract2.deployed();

      await xTokenFactoryContract.setOperationsRegistry(operationsRegistryContract2.address);

      const newOperationsRegistryContractAddress = await xTokenFactoryContract.operationsRegistry();
      expect(newOperationsRegistryContractAddress).to.equal(operationsRegistryContract2.address);
    });
  });

  describe('#setEurPriceFeed', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to setEurPriceFeed to non owner', async () => {
      await expect(xTokenFactoryContractKakaroto.setEurPriceFeed(eurPriceFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owne',
      );
    });

    it('should not allow to setEurPriceFeed as zero address to owner', async () => {
      await expect(xTokenFactoryContract.setEurPriceFeed(ethers.constants.AddressZero)).to.be.revertedWith(
        'eur price feed is the zero address',
      );
    });

    it('should allow to setEurPriceFeed to owner', async () => {
      const EurPriceFeedFactoryKakaroto = await ethers.getContractFactory('EurPriceFeed', kakaroto);
      const eurPriceFeedContract2 = (await EurPriceFeedFactoryKakaroto.deploy(
        eurUsdFeedContract.address,
        ethUsdFeedContract.address,
        [usdcToken.address, daiToken.address],
        [usdcEthFeedContract.address, daiEthFeedContract.address],
      )) as EurPriceFeed;
      await eurPriceFeedContract2.deployed();

      await xTokenFactoryContract.setEurPriceFeed(eurPriceFeedContract2.address);

      const newEurPriceFeedContractAddress = await xTokenFactoryContract.eurPriceFeed();
      expect(newEurPriceFeedContractAddress).to.equal(eurPriceFeedContract2.address);
    });
  });

  describe('#deployXToken', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to deployXToken to non owner', async () => {
      await expect(
        xTokenFactoryContractKakaroto.deployXToken(
          daiToken.address,
          'xDAI',
          'xDAI',
          18,
          'it is a wraped DAI',
          authorizationContract.address,
          daiEthFeedContract.address,
        ),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should allow to deployXToken to owner', async () => {
      const receipt = await (
        await xTokenFactoryContract.deployXToken(
          daiToken.address,
          'xDAI',
          'xDAI',
          18,
          'it is a wraped DAI',
          authorizationContract.address,
          daiEthFeedContract.address,
        )
      ).wait();

      const XTokenDeployedEvent = receipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
      const xTokenAddress = (XTokenDeployedEvent && XTokenDeployedEvent.args
        ? XTokenDeployedEvent.args.xToken
        : '') as string;
      const xTokenDeployed = XTokenContractFactory.attach(xTokenAddress) as XToken;

      DEFAULT_ADMIN_ROLE = await xTokenDeployed.DEFAULT_ADMIN_ROLE();
      WRAPPER_ROLE = await xTokenDeployed.WRAPPER_ROLE();

      // xToken detail
      expect(await xTokenDeployed.name()).to.equal('xDAI');
      expect(await xTokenDeployed.symbol()).to.equal('xDAI');
      expect(await xTokenDeployed.decimals()).to.equal(18);
      expect(await xTokenDeployed.kya()).to.equal('it is a wraped DAI');
      expect(await xTokenDeployed.authorization()).to.equal(authorizationContract.address);

      // xToken roles
      const xTokenFactoryContractOwner = await xTokenFactoryContract.owner();
      expect(await xTokenDeployed.hasRole(DEFAULT_ADMIN_ROLE, xTokenFactoryContractOwner)).to.equal(true);
      expect(await xTokenDeployed.hasRole(WRAPPER_ROLE, xTokenWrapperContract.address)).to.equal(true);

      // wrapper registry
      expect(await xTokenWrapperContract.tokenToXToken(daiToken.address)).to.eq(xTokenAddress);
      expect(await xTokenWrapperContract.xTokenToToken(xTokenAddress)).to.eq(daiToken.address);

      // operations registry allowed
      expect(await operationsRegistryContract.allowedAssets(xTokenAddress)).to.eq(true);

      // feed
      expect(await eurPriceFeedContract.assetEthFeed(xTokenAddress)).to.eq(daiEthFeedContract.address);
    });
  });
});
