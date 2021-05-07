import hre from 'hardhat';
import assert from 'assert';
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
import * as chainlinkFeeds from './chainlink-feeds.json';

const { ethers } = hre;

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

type ValidChainId = keyof typeof chainlinkFeeds;
type EthAsToken = 'ETH';
type TokenSymbol = 'USDC' | 'DAI' | 'WBTC' | 'SNX' | 'AAVE' | EthAsToken;
type XTokenSymbol = 'xUSDC' | 'xDAI' | 'xWBTC' | 'xSNX' | 'xAAVE' | 'xETH';

function tokenToXToken(token: TokenSymbol): XTokenSymbol {
  const map = {
    USDC: 'xUSDC',
    ETH: 'xETH',
    DAI: 'xDAI',
    WBTC: 'xWBTC',
    SNX: 'xSNX',
    AAVE: 'xAAVE',
  };
  return map[token] as XTokenSymbol;
}

let spinner: Ora;

async function main(): Promise<void> {
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
  await permissionManagerContract
    .assignItem(2, [deployerAddress])
    .then(() => {
      stopLog('Assigning Tier2 to user');
    })
    .catch(err => {
      if (err.message.includes('Account is assigned with item')) {
        stopLog('The deployer already has the required permissions. Skipping');
      } else {
        throw err;
      }
    });

  // Mock Tokens
  const DAIContract = await deployMockedToken(testData, 'DAI', 'DAI stablecoin', 18);
  const WBTCContract = await deployMockedToken(testData, 'WBTC', 'Wrapped Bitcoin', 8);
  // const USDCContract = await deployMockedToken(testData, 'USDC', 'USD Coin', 18);

  // // xTokens
  const xDAIContract: XToken = await deployXToken(deploymentData, testData, DAIContract, 'SM Wrapped Dai Stablecoin');
  // const xWBTCContract: XToken =  await deployXToken(deploymentData, testData, WBTCContract, 'SM Wrapped Wrapped Bitcoin');
  // const xUSDCContract: XToken = await deployXToken(deploymentData, testData, USDCContract, 'SM Wrapped USD Coin')
  const xETHContract: XToken = await deployXToken(deploymentData, testData, 'ETH', 'SM Wrapped Ether');

  const xTokenWrapperContract: XTokenWrapper = (await ethers.getContractAt(
    'XTokenWrapper',
    deploymentData.XTokenWrapper.address,
  )) as XTokenWrapper;
  const bRegistryContract: BRegistry = (await ethers.getContractAt(
    'BRegistry',
    deploymentData.BRegistry.address,
  )) as BRegistry;

  //approve tokens
  startLog('Approving tokens');
  await await WBTCContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  await await DAIContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  // await await USDCContract.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);
  stopLog('Approving tokens');
}

type TestnetData = { [key: string]: { address: string } };

async function read(filename: string): Promise<TestnetData> {
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

async function getAssetToEthPricefeed(asset: TokenSymbol): Promise<string> {
  // trust, don't verify
  // TODO: learn typescript
  const chainId: ValidChainId = (await getChainId(hre.network.provider)).toString() as ValidChainId;
  const feedAddress = chainlinkFeeds[chainId][asset] as string;
  if (!feedAddress) {
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

async function deployMockedToken(
  testData: TestnetData,
  symbol: TokenSymbol,
  name: string,
  decimals: number,
): Promise<ERC20Mintable> {
  startLog(`Deploying Mock ${symbol}`);
  const ERC20MintableFactory: ContractFactory = await ethers.getContractFactory('ERC20Mintable');

  const contract: ERC20Mintable = (await ERC20MintableFactory.deploy(name, symbol, decimals)) as ERC20Mintable;
  await contract.deployed();

  testData[symbol] = { address: contract.address };

  await write(testData);
  stopLog(`Mock ${symbol} deployed - address: ${contract.address}`);
  return contract;
}

// TODO type for the deployment data
async function deployXToken(
  deploymentData: any,
  testData: TestnetData,
  token: ERC20Mintable | EthAsToken,
  name: string,
): Promise<XToken> {
  const xTokenFactoryContract: XTokenFactory = (await ethers.getContractAt(
    'XTokenFactory',
    deploymentData.XTokenFactory.address,
  )) as XTokenFactory;

  const tokenSymbol: TokenSymbol = token === 'ETH' ? 'ETH' : ((await token.symbol()) as TokenSymbol);
  const xTokenSymbol: XTokenSymbol = tokenToXToken(tokenSymbol);
  const tokenAddress: string = token === 'ETH' ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : token.address;
  const decimals: number = token === 'ETH' ? 18 : await token.decimals();

  startLog(`deploying xToken for ${tokenSymbol}, ${xTokenSymbol}`);
  const receipt = await (
    await xTokenFactoryContract.deployXToken(
      tokenAddress,
      name,
      xTokenSymbol,
      decimals,
      xTokenSymbol,
      deploymentData.AuthorizationProxy.address,
      await getAssetToEthPricefeed(tokenSymbol),
    )
  ).wait();

  const deploymentEvent = receipt.events?.find(log => log.event && log.event === 'XTokenDeployed');
  const xTokenAddress = (deploymentEvent && deploymentEvent.args ? deploymentEvent.args.xToken : '') as string;

  testData[xTokenSymbol] = {
    address: xTokenAddress,
  };

  await write(testData);
  stopLog(`deployed xToken for ${tokenSymbol}, ${xTokenSymbol} at address: ${xTokenAddress}`);
  // I'm doing a return await just to do a cast 😭
  return (await ethers.getContractAt('XToken', xTokenAddress)) as XToken;
}

async function createPool(deploymentData: any, testData: TestnetData, identifier: string, contracts:[{contract: ERC20Mintable, amount: number}]){
  assert(process.env.BFACTORY);
  const bFactoryContract: IBFactory = (await ethers.getContractAt('IBFactory', process.env.BFACTORY)) as IBFactory;
  const xTokenWrapperContract: XTokenWrapper = (await ethers.getContractAt(
    'XTokenWrapper',
    deploymentData.XTokenWrapper.address,
  )) as XTokenWrapper;

  //create
  startLog(`Deploying ${identifier} Pool`);
  const poolReceipt = await (await bFactoryContract.newBPool({ gasLimit: '1000000' })).wait();
  const newPoolEvent = poolReceipt.events?.find(log => log.event && log.event === 'LOG_NEW_POOL');
  const poolAddress = (newPoolEvent && newPoolEvent.args ? newPoolEvent.args.pool : '') as string;
  const poolContract: IBPool = (await ethers.getContractAt('IBPool', poolAddress)) as IBPool;
  await poolContract.setSwapFee('1500000000000000', { gasLimit: '1000000' });

  testData[identifier] = {
    address: poolAddress,
  };

  await write(testData);
  stopLog(`${identifier} Pool - address: ${poolAddress}`);

  //mint required tokens
  // TODO: deal with real tokens
  await contracts.reduce((async function(acc:Promise<void>, {contract, amount}) {
    const tokenSymbol: string = await contract.symbol();
    startLog(`Minting ${tokenSymbol}`);
    await contract.mint(amount);
    stopLog(`Minting ${tokenSymbol}`);
    startLog(`Approving ${tokenSymbol}`);
    // TODO: there are tokens that revert when changing the allowance from non-zero to non-zero
    // yes that makes sense: https://github.com/sec-bit/awesome-buggy-erc20-tokens/blob/master/ERC20_token_issue_list.md#a20-re-approve
    await contract.approve(xTokenWrapperContract.address, amount);
    stopLog(`Approving ${tokenSymbol}`);
    startLog(`Wrapping ${tokenSymbol}`);
    await xTokenWrapperContract.wrap(contract.address, amount);
    stopLog(`Wrapping ${tokenSymbol}`);
    // TODO figure out what the last parameter even means
    startLog(`Binding ${tokenSymbol} on ${identifier}, amount: ${amount}`);
    await poolContract.bind(contract.address, amount, '25000000000000000000', {
      gasLimit: '1000000',
    })
    stopLog(`Bound ${tokenSymbol} on ${identifier}, amount: ${amount}`);
  }),Promise.resolve());

  // finalize
  startLog(`Finalizing Pool ${identifier}`);
  await pool2Contract.finalize();
  stopLog(`Finalizing Pool ${identifier}`);

  //set pares in BRegistry
  startLog('Registering Pairs');
  await (
    await bRegistryContract.addPoolPair(testData['xWETH/xDAI'].address, testData.xETH.address, testData.xDAI.address)
  ).wait();
  stopLog('Registering Pairs');
  }

  const xTokenFactoryContract: XTokenFactory = (await ethers.getContractAt(
    'XTokenFactory',
    deploymentData.XTokenFactory.address,
  )) as XTokenFactory;
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

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    spinner.fail();
    process.exit(1);
  });
