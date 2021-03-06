import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import assert from 'assert';
import {
  PermissionItems,
  PermissionManager,
  EurPriceFeed,
  EthPriceFeed,
  OperationsRegistry,
  Authorization,
  XTokenWrapper,
  XTokenFactory,
  ProtocolFee,
  BRegistry,
  BPoolProxy,
  IBFactory,
} from '../typechain';

import ora, { Ora } from 'ora';
import fsExtra from 'fs-extra';
import path from 'path';
import { promises as fs } from 'fs';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';

import PermissionItemsArtifact from '../artifacts/contracts/permissioning/PermissionItems.sol/PermissionItems.json';
import PermissionManagerArtifact from '../artifacts/contracts/permissioning/PermissionManager.sol/PermissionManager.json';
import EurPriceFeedArtifact from '../artifacts/contracts/authorization/EurPriceFeed.sol/EurPriceFeed.json';
import EthPriceFeedArtifact from '../artifacts/contracts/authorization/EthPriceFeed.sol/EthPriceFeed.json';
import OperationsRegistryArtifact from '../artifacts/contracts/authorization/OperationsRegistry.sol/OperationsRegistry.json';
import AuthorizationArtifact from '../artifacts/contracts/authorization/Authorization.sol/Authorization.json';
import XTokenWrapperArtifact from '../artifacts/contracts/token/XTokenWrapper.sol/XTokenWrapper.json';
import XTokenFactoryArtifact from '../artifacts/contracts/token/XTokenFactory.sol/XTokenFactory.json';
import ProtocolFeeArtifact from '../artifacts/contracts/balancer/ProtocolFee.sol/ProtocolFee.json';
import BRegistryArtifact from '../artifacts/contracts/balancer/BRegistry.sol/BRegistry.json';
import BPoolProxyArtifact from '../artifacts/contracts/balancer/BPoolProxy.sol/BPoolProxy.json';

let spinner: Ora;

const PROTOCOL_CONTRACT = 4;
const POOL_CREATOR = 5;

const requiredConfigs = [
  'EUR_USD_FEED',
  'ETH_USD_FEED',
  'TRAIDING_LIMIT',
  'BFACTORY',
  'PROTOCOL_FEE',
  'MIN_PROTOCOL_FEE',
  'FEE_RECEIVER',
  'POOL_CREATOR_USER',
];
requiredConfigs.forEach(conf => assert(process.env[conf], `Missing configuration variable: ${conf}`));

async function main(): Promise<void> {
  const { ethers, upgrades } = hre;
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  let deploymentData = await read();

  startLog('Deploying PermissionItems contract');
  const PermissionItemsFactory: ContractFactory = await ethers.getContractFactory('PermissionItems');
  const permissionItemsContract: PermissionItems = (await PermissionItemsFactory.deploy()) as PermissionItems;
  updatetLog(`Deploying PermissionItems contract - txHash: ${permissionItemsContract.deployTransaction.hash}`);
  await permissionItemsContract.deployed();

  deploymentData = {
    ...deploymentData,
    PermissionItems: {
      address: permissionItemsContract.address,
      abi: PermissionItemsArtifact.abi,
      deployTransaction: await getRecipt(permissionItemsContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `PermissionItems deployed - txHash: ${permissionItemsContract.deployTransaction.hash} - address: ${permissionItemsContract.address}`,
  );

  startLog('Deploying PermissionManager contract');
  const PermissionManagerFactory: ContractFactory = await ethers.getContractFactory('PermissionManager');
  const permissionManagerContract: PermissionManager = (await upgrades.deployProxy(PermissionManagerFactory, [
    permissionItemsContract.address,
    deployerAddress,
  ])) as PermissionManager;

  deploymentData = {
    ...deploymentData,
    PermissionManagerProxy: {
      address: permissionManagerContract.address,
      abi: PermissionManagerArtifact.abi,
      deployTransaction: await getRecipt(permissionManagerContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `PermissionManager deployed deployed - txHash: ${permissionManagerContract.deployTransaction.hash} - address: ${permissionManagerContract.address}`,
  );

  // Deploy EurPriceFeed
  startLog('Deploying EurPriceFeed contract');
  const EurPriceFeedFactory: ContractFactory = await ethers.getContractFactory('EurPriceFeed');
  const eurPriceFeedContract: EurPriceFeed = (await EurPriceFeedFactory.deploy(
    process.env.EUR_USD_FEED,
    process.env.ETH_USD_FEED,
    [],
    [],
  )) as EurPriceFeed;
  updatetLog(`Deploying PermissionItems contract - txHash: ${eurPriceFeedContract.deployTransaction.hash}`);
  await eurPriceFeedContract.deployed();

  deploymentData = {
    ...deploymentData,
    EurPriceFeed: {
      address: eurPriceFeedContract.address,
      abi: EurPriceFeedArtifact.abi,
      deployTransaction: await getRecipt(eurPriceFeedContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `EurPriceFeed deployed - txHash: ${eurPriceFeedContract.deployTransaction.hash} - address: ${eurPriceFeedContract.address}`,
  );

  // Deploy EthPriceFeed
  startLog('Deploying EthPriceFeed contract');
  const EthPriceFeedFactory: ContractFactory = await ethers.getContractFactory('EthPriceFeed');
  const ethPriceFeedContract: EthPriceFeed = (await EthPriceFeedFactory.deploy()) as EthPriceFeed;
  updatetLog(`Deploying EthPriceFeed contract - txHash: ${ethPriceFeedContract.deployTransaction.hash}`);
  await ethPriceFeedContract.deployed();

  deploymentData = {
    ...deploymentData,
    EthPriceFeed: {
      address: ethPriceFeedContract.address,
      abi: EthPriceFeedArtifact.abi,
      deployTransaction: await getRecipt(ethPriceFeedContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `EthPriceFeed deployed - txHash: ${ethPriceFeedContract.deployTransaction.hash} - address: ${ethPriceFeedContract.address}`,
  );

  // Deploy OperationsRegistry
  // EurPriceFeed
  startLog('Deploying OperationsRegistry contract');
  const OperationsRegistryFactory: ContractFactory = await ethers.getContractFactory('OperationsRegistry');
  const operationsRegistryContract: OperationsRegistry = (await OperationsRegistryFactory.deploy(
    eurPriceFeedContract.address,
  )) as OperationsRegistry;
  updatetLog(`Deploying OperationsRegistry contract - txHash: ${operationsRegistryContract.deployTransaction.hash}`);
  await operationsRegistryContract.deployed();

  deploymentData = {
    ...deploymentData,
    OperationsRegistry: {
      address: operationsRegistryContract.address,
      abi: OperationsRegistryArtifact.abi,
      deployTransaction: await getRecipt(operationsRegistryContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `OperationsRegistry deployed - txHash: ${operationsRegistryContract.deployTransaction.hash} - address: ${operationsRegistryContract.address}`,
  );

  // Deploy xTokenWrapper
  startLog('Deploying XTokenWrapper contract');
  const XTokenWrapperFactory: ContractFactory = await ethers.getContractFactory('XTokenWrapper');
  const xTokenWrapperContract: XTokenWrapper = (await XTokenWrapperFactory.deploy()) as XTokenWrapper;
  updatetLog(`Deploying XTokenWrapper contract - txHash: ${xTokenWrapperContract.deployTransaction.hash}`);
  await xTokenWrapperContract.deployed();

  deploymentData = {
    ...deploymentData,
    XTokenWrapper: {
      address: xTokenWrapperContract.address,
      abi: XTokenWrapperArtifact.abi,
      deployTransaction: await getRecipt(xTokenWrapperContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `XTokenWrapper deployed - txHash: ${xTokenWrapperContract.deployTransaction.hash} - address: ${xTokenWrapperContract.address}`,
  );

  // Deploy Authorization
  // PermissionItems
  // EurPriceFeed
  // OperationsRegistry
  // Balancer BFactory address
  // XTokenWrapper address
  // Trade Limit
  startLog('Deploying Authorization contract');
  const AuthorizationFactory: ContractFactory = await ethers.getContractFactory('Authorization');
  const authorizationContract: Authorization = (await upgrades.deployProxy(AuthorizationFactory, [
    permissionItemsContract.address,
    eurPriceFeedContract.address,
    operationsRegistryContract.address,
    process.env.BFACTORY,
    xTokenWrapperContract.address,
    process.env.TRAIDING_LIMIT,
    false,
  ])) as Authorization;

  deploymentData = {
    ...deploymentData,
    AuthorizationProxy: {
      address: authorizationContract.address,
      abi: AuthorizationArtifact.abi,
      deployTransaction: await getRecipt(authorizationContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `Authorization deployed - txHash: ${authorizationContract.deployTransaction.hash} - address: ${authorizationContract.address}`,
  );

  // Deploy xTokenFactory
  // xTokenWrapper
  // OperationsRegistry
  // EurPriceFeed
  startLog('Deploying XTokenFactory contract');
  const XTokenFactoryFactory: ContractFactory = await ethers.getContractFactory('XTokenFactory');
  const xTokenFactoryContract: XTokenFactory = (await XTokenFactoryFactory.deploy(
    xTokenWrapperContract.address,
    operationsRegistryContract.address,
    eurPriceFeedContract.address,
  )) as XTokenFactory;
  updatetLog(`Deploying XTokenFactory contract - txHash: ${xTokenFactoryContract.deployTransaction.hash}`);
  await xTokenFactoryContract.deployed();

  deploymentData = {
    ...deploymentData,
    XTokenFactory: {
      address: xTokenFactoryContract.address,
      abi: XTokenFactoryArtifact.abi,
      deployTransaction: await getRecipt(xTokenFactoryContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `XTokenFactory deployed - txHash: ${xTokenFactoryContract.deployTransaction.hash} - address: ${xTokenFactoryContract.address}`,
  );

  // Deploy ProtocolFee
  // _protocolFee
  // _minProtocolFee
  startLog('Deploying ProtocolFee contract');
  const ProtocolFeeFactory: ContractFactory = await ethers.getContractFactory('ProtocolFee');
  const protocolFeeContract: ProtocolFee = (await ProtocolFeeFactory.deploy(
    process.env.PROTOCOL_FEE,
    process.env.MIN_PROTOCOL_FEE,
  )) as ProtocolFee;
  updatetLog(`Deploying ProtocolFee contract - txHash: ${protocolFeeContract.deployTransaction.hash}`);
  await protocolFeeContract.deployed();

  deploymentData = {
    ...deploymentData,
    ProtocolFee: {
      address: protocolFeeContract.address,
      abi: ProtocolFeeArtifact.abi,
      deployTransaction: await getRecipt(protocolFeeContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `ProtocolFee deployed - txHash: ${protocolFeeContract.deployTransaction.hash} - address: ${protocolFeeContract.address}`,
  );

  // Deploy BRegistry
  // BFactory
  startLog('Deploying BRegistry contract');
  const BRegistryFactory: ContractFactory = await ethers.getContractFactory('BRegistry');
  const bRegistryContract: BRegistry = (await BRegistryFactory.deploy(process.env.BFACTORY)) as BRegistry;
  updatetLog(`Deploying BRegistry contract - txHash: ${bRegistryContract.deployTransaction.hash}`);
  await bRegistryContract.deployed();

  deploymentData = {
    ...deploymentData,
    BRegistry: {
      address: bRegistryContract.address,
      abi: BRegistryArtifact.abi,
      deployTransaction: await getRecipt(bRegistryContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `BRegistry deployed - txHash: ${bRegistryContract.deployTransaction.hash} - address: ${bRegistryContract.address}`,
  );

  // Deploy BPoolProxy
  // BRegistry
  // ProtocolFee
  // FEE_RECEIVER
  // XTokenWrapper
  // UtilityToken
  // UtilityTokenPriceFeed
  startLog('Deploying BPoolProxy contract');
  const BPoolProxyFactory: ContractFactory = await ethers.getContractFactory('BPoolProxy');
  const bPoolProxyContract: BPoolProxy = (await BPoolProxyFactory.deploy(
    bRegistryContract.address,
    protocolFeeContract.address,
    process.env.FEE_RECEIVER,
    xTokenWrapperContract.address,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
  )) as BPoolProxy;
  updatetLog(`Deploying BPoolProxy contract - txHash: ${bPoolProxyContract.deployTransaction.hash}`);
  await bPoolProxyContract.deployed();

  deploymentData = {
    ...deploymentData,
    BPoolProxy: {
      address: bPoolProxyContract.address,
      abi: BPoolProxyArtifact.abi,
      deployTransaction: await getRecipt(bPoolProxyContract.deployTransaction),
    },
  };

  await write(deploymentData);
  stopLog(
    `BPoolProxy deployed - txHash: ${bPoolProxyContract.deployTransaction.hash} - address: ${bPoolProxyContract.address}`,
  );

  // Set PermissionManager as the MINTER/BURNER of PermissionItems
  startLog('Setting PermisisonManager as PermissionItems admin');
  const piaTx = await permissionItemsContract.setAdmin(permissionManagerContract.address);
  updatetLog(`Setting PermisisonManager as PermissionItems admin - txHash: ${piaTx.hash}`);
  await piaTx.wait();
  stopLog(`Done setting PermisisonManager as PermissionItems admin - txHash: ${piaTx.hash}`);

  // Configure xTokenWrapper, setRegistryManager(xTokenFactory)
  startLog('Granting xTokenWrapper REGISTRY_MANAGER_ROL to XTokenFactory contract');
  const rmTx = await xTokenWrapperContract.setRegistryManager(xTokenFactoryContract.address);
  updatetLog(`Granting xTokenWrapper REGISTRY_MANAGER_ROL to XTokenFactory contract - txHash: ${rmTx.hash}`);
  await rmTx.wait();
  stopLog(`Granted xTokenWrapper REGISTRY_MANAGER_ROL to XTokenFactory contract - txHash: ${rmTx.hash}`);

  // Configure OperationsRegistry setAssetsManager(xTokenFactory)
  startLog('Granting OperationsRegistry ASSET_MANAGER_ROL to XTokenFactory contract');
  const amTx = await operationsRegistryContract.setAssetsManager(xTokenFactoryContract.address);
  updatetLog(`Granting OperationsRegistry ASSET_MANAGER_ROL to XTokenFactory contract - txHash: ${amTx.hash}`);
  await amTx.wait();
  stopLog(`Granted OperationsRegistry ASSET_MANAGER_ROL to XTokenFactory contract - txHash: ${amTx.hash}`);

  // Configure EurPriceFeed setFeedsManager(xTokenFactory)
  startLog('Granting EurPriceFeed FEEDS_MANAGER_ROL to XTokenFactory contract');
  const fmTx = await eurPriceFeedContract.setFeedsManager(xTokenFactoryContract.address);
  updatetLog(`Granting EurPriceFeed FEEDS_MANAGER_ROL to XTokenFactory contract - txHash: ${fmTx.hash}`);
  await fmTx.wait();
  stopLog(`Granted EurPriceFeed FEEDS_MANAGER_ROL to XTokenFactory contract - txHash: ${fmTx.hash}`);

  // Configure PermissionManager setPermissionsAdmin(deployer)
  startLog('Granting PermissionManager PERMISSIONS_ADMIN_ROLE to deployer');
  const pmSpTx = await permissionManagerContract.setPermissionsAdmin(deployerAddress);
  updatetLog(`Granting PermissionManager PERMISSIONS_ADMIN_ROLE to deployer - txHash: ${pmSpTx.hash}`);
  await pmSpTx.wait();
  stopLog(`Granted PermissionManager PERMISSIONS_ADMIN_ROLE to deployer - txHash: ${pmSpTx.hash}`);

  //Grant PROTOCOL_CONTRACT permission to BPoolProxy
  startLog('Granting PROTOCOL_CONTRACT permission to BPoolProxy contract');
  const proConTx = await permissionManagerContract.assignItem(PROTOCOL_CONTRACT, [bPoolProxyContract.address]);
  updatetLog(`Granting PROTOCOL_CONTRACT permission to BPoolProxy contract - txHash: ${proConTx.hash}`);
  await proConTx.wait();
  stopLog(`Granting PROTOCOL_CONTRACT permission to BPoolProxy contract - txHash: ${proConTx.hash}`);

  //Grant TIER_2 permission to BPoolProxy 
  startLog('Grant TIER_2 permission to BPoolProxy');
  const tier2BpoolTx = await permissionManagerContract.assignItem(2, [bPoolProxyContract.address]);
  updatetLog(`Granting TIER_2 permission to BPoolProxy contract - txHash: ${tier2BpoolTx.hash}`);
  await tier2BpoolTx.wait();
  stopLog(`Granting TIER_2 permission to BPoolProxy contract - txHash: ${tier2BpoolTx.hash}`);

  // POOL_CREATOR_USER is required
  if (process.env.POOL_CREATOR_USER) {
    //Grant POOL_CREATOR permission to Admin
    startLog('Granting POOL_CREATOR permission to Amin');
    const poolCTx = await permissionManagerContract.assignItem(POOL_CREATOR, [process.env.POOL_CREATOR_USER]);
    updatetLog(`Granting POOL_CREATOR permission to Admin - txHash: ${poolCTx.hash}`);
    await poolCTx.wait();
    stopLog(`Granting POOL_CREATOR permission to Admin - txHash: ${poolCTx.hash}`);
  }

  // BFACTORY is required
  if (process.env.BFACTORY) {
    const bFactoryContract: IBFactory = (await ethers.getContractAt('IBFactory', process.env.BFACTORY)) as IBFactory;

    //Set BFactory - ExchaProxy
    startLog('Setting PoolProxy contract as ExchangeProxy in BFactory');
    const excPTx = await bFactoryContract.setExchProxy(bPoolProxyContract.address);
    updatetLog(`Setting PoolProxy contract as ExchangeProxy in BFactory - txHash: ${excPTx.hash}`);
    await excPTx.wait();
    stopLog(`Setting PoolProxy contract as ExchangeProxy in BFactory - txHash: ${excPTx.hash}`);

    //Set BFactory - OperationsRegistry
    startLog('Setting OperationsRegistry in BFactory');
    const opRTx = await bFactoryContract.setOperationsRegistry(operationsRegistryContract.address);
    updatetLog(`Setting OperationsRegistry in BFactory - txHash: ${opRTx.hash}`);
    await opRTx.wait();
    stopLog(`Setting OperationsRegistry in BFactory - txHash: ${opRTx.hash}`);

    //Set BFactory - PermissionManager
    startLog('Setting PermissionManager in BFactory');
    const pmCTx = await bFactoryContract.setPermissionManager(permissionManagerContract.address);
    updatetLog(`Setting PermissionManager in BFactory - txHash: ${pmCTx.hash}`);
    await pmCTx.wait();
    stopLog(`Setting PermissionManager in BFactory - txHash: ${pmCTx.hash}`);

    //Set BFactory - ExchaProxy, OperationsRegistry and Authorization
    startLog('Setting Authorization in BFactory');
    const authTx = await bFactoryContract.setAuthorization(authorizationContract.address);
    updatetLog(`Setting Authorization in BFactory - txHash: ${authTx.hash}`);
    await authTx.wait();
    stopLog(`Setting Authorization in BFactory - txHash: ${authTx.hash}`);

    // Configure PermissionManager setPermissionsAdmin(BFactory)
    startLog('Granting PermissionManager PERMISSIONS_ADMIN_ROLE to BFactory contract');
    const pmSpBTx = await permissionManagerContract.setPermissionsAdmin(process.env.BFACTORY);
    updatetLog(`Granting PermissionManager PERMISSIONS_ADMIN_ROLE to BFactory contract - txHash: ${pmSpBTx.hash}`);
    await pmSpBTx.wait();
    stopLog(`Granted PermissionManager PERMISSIONS_ADMIN_ROLE to BFactory contract - txHash: ${pmSpBTx.hash}`);
  }
}

async function read(): Promise<any> {
  const deploymentsFile = await getDeploymentFile();

  try {
    return JSON.parse(await fs.readFile(deploymentsFile, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      return {};
    } else {
      throw e;
    }
  }
}

async function write(data: any): Promise<void> {
  const deploymentsFile = await getDeploymentFile();
  await fsExtra.ensureFile(deploymentsFile);
  await fs.writeFile(deploymentsFile, JSON.stringify(data, null, 2) + '\n');
}

async function getDeploymentFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}.json`);
}

function startLog(message: string) {
  spinner = ora().start(message);
}

function updatetLog(message: string) {
  spinner.text = message;
}

function stopLog(message: string) {
  spinner.succeed(message);
}

async function getRecipt(transactionResponse: TransactionResponse) {
  const receipt = await transactionResponse.wait();
  return {
    ...transactionResponse,
    ...receipt,
    gasPrice: transactionResponse.gasPrice.toString(),
    gasLimit: transactionResponse.gasLimit.toString(),
    value: transactionResponse.value.toString(),
    gasUsed: receipt.gasUsed.toString(),
    cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
  };
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    spinner.fail();
    console.error(error);
    process.exit(1);
  });
