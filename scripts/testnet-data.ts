import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import {
  XTokenFactory,
  ERC20Mintable,
  IBFactory,
  IBPool,
  BRegistry,
  XTokenWrapper,
  XToken,
  PermissionManager,
} from '../typechain';

import path from 'path';
import { promises as fs } from 'fs';
import fsExtra from 'fs-extra';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';
import ora, { Ora } from 'ora';

let spinner: Ora;

async function main(): Promise<void> {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const deploymentData = await read(await getDeploymentFile());
  let testData = await read(await getTestnetDataFile());

  const permissionManagerContract: PermissionManager = (await ethers.getContractAt(
    'PermissionManager',
    deploymentData.PermissionManagerProxy.address,
  )) as PermissionManager;
  startLog('Assigning Tier2 to user');
  await (await permissionManagerContract.assignItem(2, [deployerAddress])).wait();
  stopLog('Assigning Tier2 to user');

  const ERC20MintableFactory: ContractFactory = await ethers.getContractFactory('ERC20Mintable');

  // Mock Tokens
  startLog('Deploying Mock DAI');
  const DAIContract: ERC20Mintable = (await ERC20MintableFactory.deploy('Dai Stablecoin', 'DAI', 18)) as ERC20Mintable;
  await DAIContract.deployed();

  testData = {
    ...testData,
    DAI: {
      address: DAIContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock DAI deployed - address: ${DAIContract.address}`);

  startLog('Deploying Mock AAVE');
  const AAVEContract: ERC20Mintable = (await ERC20MintableFactory.deploy('Aave Token', 'AAVE', 18)) as ERC20Mintable;
  await AAVEContract.deployed();

  testData = {
    ...testData,
    AAVE: {
      address: AAVEContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock AAVE deployed - address: ${AAVEContract.address}`);

  startLog('Deploying Mock SNX');
  const SNXContract: ERC20Mintable = (await ERC20MintableFactory.deploy(
    'Synthetix Network Token',
    'SNX',
    18,
  )) as ERC20Mintable;
  await SNXContract.deployed();

  testData = {
    ...testData,
    SNX: {
      address: SNXContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock SNX deployed - address: ${SNXContract.address}`);

  startLog('Deploying Mock UNI');
  const UNIContract: ERC20Mintable = (await ERC20MintableFactory.deploy('Uniswap', 'UNI', 18)) as ERC20Mintable;
  await UNIContract.deployed();

  testData = {
    ...testData,
    UNI: {
      address: UNIContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock UNI deployed - address: ${UNIContract.address}`);

  startLog('Deploying Mock USDC');
  const USDCContract: ERC20Mintable = (await ERC20MintableFactory.deploy('USD Coin', 'USDC', 6)) as ERC20Mintable;
  await USDCContract.deployed();

  testData = {
    ...testData,
    USDC: {
      address: USDCContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock USDC deployed - address: ${USDCContract.address}`);

  // // xTokens
  const xTokenFactoryContract: XTokenFactory = (await ethers.getContractAt(
    'XTokenFactory',
    deploymentData.XTokenFactory.address,
  )) as XTokenFactory;

  startLog('Deploying xDAI');
  const daiReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.DAI.address,
      'SM Wrapped Dai Stablecoin',
      'xDAI',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      '0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541',
    )
  ).wait();

  const xDAIDeployedEvent = daiReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xDaiAddress = (xDAIDeployedEvent && xDAIDeployedEvent.args ? xDAIDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xDAI: {
      address: xDaiAddress,
    },
  };

  await write(testData);
  stopLog(`xDAI deployed - address: ${xDaiAddress}`);

  startLog('Deploying xAAVE');
  const aaveReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.AAVE.address,
      'SM Wrapped Aave Token',
      'xAAVE',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      '0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad',
    )
  ).wait();

  const xAAVEDeployedEvent = aaveReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xAAVEAddress = (xAAVEDeployedEvent && xAAVEDeployedEvent.args ? xAAVEDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xAAVE: {
      address: xAAVEAddress,
    },
  };

  await write(testData);
  stopLog(`xAAVE deployed - address: ${xAAVEAddress}`);

  startLog('Deploying xSNX');
  const SNXReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.SNX.address,
      'SM Wrapped Synthetix Network Token',
      'xSNX',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      '0xF9A76ae7a1075Fe7d646b06fF05Bd48b9FA5582e',
    )
  ).wait();

  const xSNXDeployedEvent = SNXReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xSNXAddress = (xSNXDeployedEvent && xSNXDeployedEvent.args ? xSNXDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xSNX: {
      address: xSNXAddress,
    },
  };

  await write(testData);
  stopLog(`xSNX deployed - address: ${xSNXAddress}`);

  startLog('Deploying xUNI');
  const UNIReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.UNI.address,
      'SM Wrapped Uniswap',
      'xUNI',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      '0x17756515f112429471F86f98D5052aCB6C47f6ee',
    )
  ).wait();

  const xUNIDeployedEvent = UNIReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xUNIAddress = (xUNIDeployedEvent && xUNIDeployedEvent.args ? xUNIDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xUNI: {
      address: xUNIAddress,
    },
  };

  await write(testData);
  stopLog(`xUNI deployed - address: ${xUNIAddress}`);

  startLog('Deploying xUSDC');
  const USDCReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.USDC.address,
      'SM Wrapped USD Coin',
      'xUSDC',
      6,
      '',
      deploymentData.AuthorizationProxy.address,
      '0x64EaC61A2DFda2c3Fa04eED49AA33D021AeC8838',
    )
  ).wait();

  const xUSDCDeployedEvent = USDCReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xUSDCAddress = (xUSDCDeployedEvent && xUSDCDeployedEvent.args ? xUSDCDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xUSDC: {
      address: xUSDCAddress,
    },
  };

  await write(testData);
  stopLog(`xUSDC deployed - address: ${xUSDCAddress}`);

  startLog('Deploying xEHT');
  const xETHReceipt = await (
    await xTokenFactoryContract.deployXToken(
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      'SM Wrapped ETH',
      'xETH',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      deploymentData.EthPriceFeed.address,
    )
  ).wait();

  const xETHDeployedEvent = xETHReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xETHAddress = (xETHDeployedEvent && xETHDeployedEvent.args ? xETHDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xETH: {
      address: xETHAddress,
    },
  };

  await write(testData);
  stopLog(`xETH deployed - address: ${xETHAddress}`);

  const xTokenWrapperContract: XTokenWrapper = (await ethers.getContractAt(
    'XTokenWrapper',
    deploymentData.XTokenWrapper.address,
  )) as XTokenWrapper;
  const bRegistryContract: BRegistry = (await ethers.getContractAt(
    'BRegistry',
    deploymentData.BRegistry.address,
  )) as BRegistry;

  const xAAVEContract: XToken = (await ethers.getContractAt('XToken', testData.xAAVE.address)) as XToken;
  const xSNXContract: XToken = (await ethers.getContractAt('XToken', testData.xSNX.address)) as XToken;
  const xUNIContract: XToken = (await ethers.getContractAt('XToken', testData.xUNI.address)) as XToken;
  const xDAIContract: XToken = (await ethers.getContractAt('XToken', testData.xDAI.address)) as XToken;
  const xUSDCContract: XToken = (await ethers.getContractAt('XToken', testData.xUSDC.address)) as XToken;
  const xETHContract: XToken = (await ethers.getContractAt('XToken', testData.xETH.address)) as XToken;

  // // // TODO - REMOVE THIS
  // const AAVEContract: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', testData.AAVE.address)) as ERC20Mintable;
  // const SNXContract: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', testData.SNX.address)) as ERC20Mintable;
  // const UNIContract: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', testData.UNI.address)) as ERC20Mintable;
  // const DAIContract: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', testData.DAI.address)) as ERC20Mintable;
  // const USDCContract: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', testData.USDC.address)) as ERC20Mintable;

  //approve tokens
  startLog('Approving tokens');
  await await AAVEContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await SNXContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await UNIContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await DAIContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await USDCContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  stopLog('Approving tokens');

  // Pools
  if (process.env.BFACTORY) {
    const bFactoryContract: IBFactory = (await ethers.getContractAt('IBFactory', process.env.BFACTORY)) as IBFactory;
    // ----------- POOL 1
    //create
    startLog('Deploying 33% xSNX - 33% xAAVE - 33% xUNI Pool');
    const pool1Receipt = await (await bFactoryContract.newBPool()).wait();
    const newPoolEvent = pool1Receipt.events?.find(log => log.event && log.event === 'LOG_NEW_POOL');
    const pool1Address = (newPoolEvent && newPoolEvent.args ? newPoolEvent.args.pool : '') as string;

    testData = {
      ...testData,
      'xSNX/xAAVE/xUNI': {
        address: pool1Address,
      },
    };

    await write(testData);
    stopLog(`xSNX/xAAVE/xUNI Pool - address: ${pool1Address}`);

    //mint required tokens
    startLog('Minting tokens');
    await (await AAVEContract.mint(ethers.constants.WeiPerEther.mul(46))).wait();
    await (await SNXContract.mint(ethers.constants.WeiPerEther.mul(897))).wait();
    await (await UNIContract.mint(ethers.constants.WeiPerEther.mul(583))).wait();
    stopLog('Minting tokens');

    //wrapp tokens
    startLog('Wrapping tokens');
    await (await xTokenWrapperContract.wrap(AAVEContract.address, ethers.constants.WeiPerEther.mul(46))).wait();
    await (await xTokenWrapperContract.wrap(SNXContract.address, ethers.constants.WeiPerEther.mul(897))).wait();
    await (await xTokenWrapperContract.wrap(UNIContract.address, ethers.constants.WeiPerEther.mul(583))).wait();
    stopLog('Wrapping tokens');

    //approve xTokens
    startLog('Approving xTokens');
    await (await xAAVEContract.approve(testData['xSNX/xAAVE/xUNI'].address, ethers.constants.MaxUint256)).wait();
    await (await xSNXContract.approve(testData['xSNX/xAAVE/xUNI'].address, ethers.constants.MaxUint256)).wait();
    await (await xUNIContract.approve(testData['xSNX/xAAVE/xUNI'].address, ethers.constants.MaxUint256)).wait();
    stopLog('Approving xTokens');

    //configure (bind)
    startLog('Binding xTokens on Pool');
    const pool1Contract: IBPool = (await ethers.getContractAt('IBPool', testData['xSNX/xAAVE/xUNI'].address)) as IBPool;
    await (await pool1Contract.setSwapFee('3000000000000000')).wait();
    await (
      await pool1Contract.bind(testData.xAAVE.address, ethers.constants.WeiPerEther.mul(46), '5000000000000000000')
    ).wait();
    await (
      await pool1Contract.bind(testData.xSNX.address, ethers.constants.WeiPerEther.mul(897), '5000000000000000000')
    ).wait();
    await (
      await pool1Contract.bind(testData.xUNI.address, ethers.constants.WeiPerEther.mul(583), '5000000000000000000')
    ).wait();
    stopLog('Binding xTokens on Pool');

    // finalize
    startLog('Finalizing Pool');
    await (await pool1Contract.finalize()).wait();
    stopLog('Finalizing Pool');

    //set pares in BRegistry
    startLog('Registering Pairs');
    await (
      await bRegistryContract.addPoolPair(
        testData['xSNX/xAAVE/xUNI'].address,
        testData.xAAVE.address,
        testData.xSNX.address,
      )
    ).wait();
    await (
      await bRegistryContract.addPoolPair(
        testData['xSNX/xAAVE/xUNI'].address,
        testData.xAAVE.address,
        testData.xUNI.address,
      )
    ).wait();
    await (
      await bRegistryContract.addPoolPair(
        testData['xSNX/xAAVE/xUNI'].address,
        testData.xSNX.address,
        testData.xUNI.address,
      )
    ).wait();
    stopLog('Registering Pairs');

    // ----------- POOL 2
    //create
    startLog('Deploying xWETH 50% xDAI 50% Pool');
    const pool2Receipt = await (await bFactoryContract.newBPool()).wait();
    const newPool2Event = pool2Receipt.events?.find(log => log.event && log.event === 'LOG_NEW_POOL');
    const pool2Address = (newPool2Event && newPool2Event.args ? newPool2Event.args.pool : '') as string;

    testData = {
      ...testData,
      'xWETH/xDAI': {
        address: pool2Address,
      },
    };

    await write(testData);
    stopLog(`xWETH/xDAI Pool - address: ${pool2Address}`);

    //mint required tokens
    startLog('Minting tokens');
    await (await DAIContract.mint(ethers.constants.WeiPerEther.mul(17963))).wait();
    stopLog('Minting tokens');

    //wrapp tokens
    startLog('Wrapping tokens');
    await (
      await xTokenWrapperContract.wrap('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 0, {
        value: ethers.constants.WeiPerEther.mul(20),
      })
    ).wait();
    await (await xTokenWrapperContract.wrap(DAIContract.address, ethers.constants.WeiPerEther.mul(17963))).wait();
    stopLog('Wrapping tokens');

    //approve xTokens
    startLog('Approving xTokens');
    await (await xETHContract.approve(testData['xWETH/xDAI'].address, ethers.constants.MaxUint256)).wait();
    await (await xDAIContract.approve(testData['xWETH/xDAI'].address, ethers.constants.MaxUint256)).wait();
    stopLog('Approving xTokens');

    //configure (bind)
    startLog('Binding xTokens on Pool');
    const pool2Contract: IBPool = (await ethers.getContractAt('IBPool', testData['xWETH/xDAI'].address)) as IBPool;
    await (await pool2Contract.setSwapFee('1500000000000000')).wait();
    await (
      await pool2Contract.bind(testData.xETH.address, ethers.constants.WeiPerEther.mul(10), '25000000000000000000')
    ).wait();
    await (
      await pool2Contract.bind(testData.xDAI.address, ethers.constants.WeiPerEther.mul(17963), '25000000000000000000')
    ).wait();
    stopLog('Binding xTokens on Pool');

    // finalize
    startLog('Finalizing Pool');
    await (await pool2Contract.finalize()).wait();
    stopLog('Finalizing Pool');

    //set pares in BRegistry
    startLog('Registering Pairs');
    await (
      await bRegistryContract.addPoolPair(testData['xWETH/xDAI'].address, testData.xETH.address, testData.xDAI.address)
    ).wait();
    stopLog('Registering Pairs');

    // ----------- POOL 3
    //create
    startLog('Deploying xWETH 50% xUSDC 50% Pool');
    const pool3Receipt = await (await bFactoryContract.newBPool()).wait();
    const newPool3Event = pool3Receipt.events?.find(log => log.event && log.event === 'LOG_NEW_POOL');
    const pool3Address = (newPool3Event && newPool3Event.args ? newPool3Event.args.pool : '') as string;

    testData = {
      ...testData,
      'xWETH/xUSDC': {
        address: pool3Address,
      },
    };

    await write(testData);
    stopLog(`xWETH/xUSDC Pool - address: ${pool3Address}`);

    //mint required tokens
    startLog('Minting tokens');
    await (await USDCContract.mint(ethers.constants.WeiPerEther.mul(17856))).wait();
    stopLog('Minting tokens');

    //wrapp tokens
    startLog('Wrapping tokens');
    await (await xTokenWrapperContract.wrap(USDCContract.address, ethers.constants.WeiPerEther.mul(17856))).wait();
    stopLog('Wrapping tokens');

    //approve xTokens
    startLog('Approving xTokens');
    await (await xETHContract.approve(testData['xWETH/xUSDC'].address, ethers.constants.MaxUint256)).wait();
    await (await xUSDCContract.approve(testData['xWETH/xUSDC'].address, ethers.constants.MaxUint256)).wait();
    stopLog('Approving xTokens');

    //configure (bind)
    startLog('Binding xTokens on Pool');
    const pool3Contract: IBPool = (await ethers.getContractAt('IBPool', testData['xWETH/xUSDC'].address)) as IBPool;
    await (await pool3Contract.setSwapFee('8000000000000000')).wait();
    await (
      await pool3Contract.bind(testData.xETH.address, ethers.constants.WeiPerEther.mul(10), '25000000000000000000')
    ).wait();

    await (
      await pool3Contract.bind(testData.xUSDC.address, ethers.constants.WeiPerEther.mul(17856), '25000000000000000000')
    ).wait();
    stopLog('Binding xTokens on Pool');

    // NOT finalize

    //set pares in BRegistry
    startLog('Registering Pairs');
    await (
      await bRegistryContract.addPoolPair(
        testData['xWETH/xUSDC'].address,
        testData.xETH.address,
        testData.xUSDC.address,
      )
    ).wait();
    stopLog('Registering Pairs');
  }

  // Deploy xPool Tokens
  startLog('Deploying SM Wrapped Pool Token - 33xSNX/33xAAVE/33xUNI');
  const xPool1Receipt = await (
    await xTokenFactoryContract.deployXToken(
      testData['xSNX/xAAVE/xUNI'].address,
      'SM Wrapped Pool Token - 33% xSNX / 33% xAAVE / 33% xUNI',
      'xBPT',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      deploymentData.EthPriceFeed.address, // assetFeed can't be zero addres so we need to set something  althought xBPT wont use the assetFeed
    )
  ).wait();

  const xPool1DeployedEvent = xPool1Receipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xPool1Address = (xPool1DeployedEvent && xPool1DeployedEvent.args
    ? xPool1DeployedEvent.args.xToken
    : '') as string;

  testData = {
    ...testData,
    'SM Wrapped Pool Token - 33xSNX/33xAAVE/33xUNI': {
      address: xPool1Address,
    },
  };

  await write(testData);
  stopLog(`SM Wrapped Pool Token - 33% xSNX / 33% xAAVE / 33% xUNI deployed - address: ${xPool1Address}`);

  // Deploy xPool Tokens
  startLog('Deploying SM Wrapped Pool Token - 50% xWETH / 50% xDAI');
  const xPool2Receipt = await (
    await xTokenFactoryContract.deployXToken(
      testData['xWETH/xDAI'].address,
      'SM Wrapped Pool Token - 50% xWETH / 50% xDAI',
      'xBPT',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      deploymentData.EthPriceFeed.address, // assetFeed can't be zero addres so we need to set something  althought xBPT wont use the assetFeed
    )
  ).wait();

  const xPool2DeployedEvent = xPool2Receipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xPool2Address = (xPool2DeployedEvent && xPool2DeployedEvent.args
    ? xPool2DeployedEvent.args.xToken
    : '') as string;

  testData = {
    ...testData,
    'SM Wrapped Pool Token - 50xWETH/50xDAI': {
      address: xPool2Address,
    },
  };

  await write(testData);
  stopLog(`SM Wrapped Pool Token - 50% xWETH / 50% xDAI deployed - address: ${xPool2Address}`);

  // Deploy xPool Tokens
  startLog('Deploying SM Wrapped Pool Token - 50% xWETH / 50% xUSDC');
  const xPool3Receipt = await (
    await xTokenFactoryContract.deployXToken(
      testData['xWETH/xUSDC'].address,
      'SM Wrapped Pool Token - 50% xWETH / 50% xUSDC',
      'xBPT',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      deploymentData.EthPriceFeed.address, // assetFeed can't be zero addres so we need to set something  althought xBPT wont use the assetFeed
    )
  ).wait();

  const xPool3DeployedEvent = xPool3Receipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xPool3Address = (xPool3DeployedEvent && xPool3DeployedEvent.args
    ? xPool3DeployedEvent.args.xToken
    : '') as string;

  testData = {
    ...testData,
    'SM Wrapped Pool Token - 50xWETH/50xUSDC': {
      address: xPool3Address,
    },
  };

  await write(testData);
  stopLog(`SM Wrapped Pool Token - 50% xWETH / 50% xUSDC deployed - address: ${xPool3Address}`);
}

async function read(filename: string): Promise<any> {
  try {
    return JSON.parse(await fs.readFile(filename, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      return {};
    } else {
      throw e;
    }
  }
}

async function write(data: any): Promise<void> {
  const deploymentsFile = await getTestnetDataFile();
  await fsExtra.ensureFile(deploymentsFile);
  await fs.writeFile(deploymentsFile, JSON.stringify(data, null, 2) + '\n');
}

async function getDeploymentFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}.json`);
}

async function getTestnetDataFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}-testnet-data.json`);
}

function startLog(message: string) {
  spinner = ora().start(message);
}

function stopLog(message: string) {
  spinner.succeed(message);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    spinner.fail();
    process.exit(1);
  });
