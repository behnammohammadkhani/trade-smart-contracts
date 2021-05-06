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
import * as chainlinkFeeds from './chainlink-feeds.json' 

type ValidChainId = keyof typeof chainlinkFeeds;

type Token = 'USDC'| 'DAI'| 'BTC'| 'SNX'| 'AAVE'

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
  // FIXME: this wastes gas
  await permissionManagerContract.assignItem(2, [deployerAddress]).catch(err => {
    if(err.message.includes('Account is assigned with item')){
      console.log('The deployer already has the required permissions. Skipping');
    }else{
      throw err;
    }
  });
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

  startLog('Deploying Mock WBTC');
  const WBTCContract: ERC20Mintable = (await ERC20MintableFactory.deploy('Wrapped Bitcoin', 'WBTC', 18)) as ERC20Mintable;
  await WBTCContract.deployed();

  testData = {
    ...testData,
    WBTC: {
      address: WBTCContract.address,
    },
  };

  await write(testData);
  stopLog(`Mock WBTC deployed - address: ${WBTCContract.address}`);

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
      await getAssetToEthPricefeed('DAI'),
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

  startLog('Deploying xWBTC');
  const UNIReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.WBTC.address,
      'SM Wrapped Wrapped Bitcoin',
      'xWBTC',
      18,
      '',
      deploymentData.AuthorizationProxy.address,
      await getAssetToEthPricefeed('BTC'),
    )
  ).wait();

  const xWBTCDeployedEvent = UNIReceipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xWBTCAddress = (xWBTCDeployedEvent && xWBTCDeployedEvent.args ? xWBTCDeployedEvent.args.xToken : '') as string;

  testData = {
    ...testData,
    xWBTC: {
      address: xWBTCAddress,
    },
  };

  await write(testData);
  stopLog(`xWBTC deployed - address: ${xWBTCAddress}`);

  startLog('Deploying xUSDC');
  const USDCReceipt = await (
    await xTokenFactoryContract.deployXToken(
      testData.USDC.address,
      'SM Wrapped USD Coin',
      'xUSDC',
      6,
      '',
      deploymentData.AuthorizationProxy.address,
      await getAssetToEthPricefeed('USDC'),
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

  const xDAIContract: XToken = (await ethers.getContractAt('XToken', testData.xDAI.address)) as XToken;
  const xUSDCContract: XToken = (await ethers.getContractAt('XToken', testData.xUSDC.address)) as XToken;
  const xETHContract: XToken = (await ethers.getContractAt('XToken', testData.xETH.address)) as XToken;

  //approve tokens
  startLog('Approving tokens');
  await await WBTCContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await DAIContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await USDCContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  stopLog('Approving tokens');

  // Pools
  if (process.env.BFACTORY) {
    const bFactoryContract: IBFactory = (await ethers.getContractAt('IBFactory', process.env.BFACTORY)) as IBFactory;

    // ----------- POOL 2
    //create
    startLog('Deploying xWETH 50% xDAI 50% Pool');
    const pool2Receipt = await (await bFactoryContract.newBPool({gasLimit: '1000000'})).wait();
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
    await (await DAIContract.mint(ethers.constants.WeiPerEther.mul(1000))).wait();
    stopLog('Minting tokens');

    //wrapp tokens
    startLog('Wrapping tokens');
    await (
      await xTokenWrapperContract.wrap('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 0, {
        value: '200000000000000000',
        gasLimit: '1000000'
      })
    ).wait();
    await (await xTokenWrapperContract.wrap(DAIContract.address, ethers.constants.WeiPerEther.mul(500))).wait();
    stopLog('Wrapping tokens');

    //approve xTokens
    startLog('Approving xTokens');
    await (await xETHContract.approve(testData['xWETH/xDAI'].address, ethers.constants.MaxUint256)).wait();
    await (await xDAIContract.approve(testData['xWETH/xDAI'].address, ethers.constants.MaxUint256)).wait();
    stopLog('Approving xTokens');

    //configure (bind)
    startLog('Binding xTokens on Pool');
    const pool2Contract: IBPool = (await ethers.getContractAt('IBPool', testData['xWETH/xDAI'].address)) as IBPool;
    await (await pool2Contract.setSwapFee('1500000000000000', {gasLimit: '1000000'})).wait();
    await (
      await pool2Contract.bind(testData.xETH.address,  '100000000000000000', '25000000000000000000', {gasLimit: '1000000'})
    ).wait();
    await (
      await pool2Contract.bind(testData.xDAI.address, ethers.constants.WeiPerEther.mul(179), '25000000000000000000', {gasLimit: '1000000'})
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
  }

  // Deploy xPool Tokens
  startLog('Deploying SM Wrapped Pool Token - 50% xWETH / 50% xDAI');
  const xPool2Receipt = await (
    await xTokenFactoryContract.deployXToken(
      testData['xWETH/xDAI'].address,
      'SM Wrapped Pool Token - 50% xWETH / 50% xDAI',
      'xSPT',
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

async function getAssetToEthPricefeed(asset: Token): Promise<string>{
  // trust, don't verify
  // TODO: learn typescript
  const chainId: ValidChainId = (await getChainId(hre.network.provider)).toString() as ValidChainId;
  console.log(chainId);
  const feedAddress = chainlinkFeeds[chainId][asset] as string;
  if (!feedAddress){
    throw new Error(`feed ${asset} unavailable on network ${chainId}`);
  }
  return feedAddress;
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
