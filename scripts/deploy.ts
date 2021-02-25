import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import assert from 'assert';
import {
  PermissionItems,
  PermissionManager,
  EurPriceFeed,
  OperationsRegistry,
  Authorization,
  XTokenWrapper,
  XTokenFactory,
} from '../typechain';

import ora, { Ora } from 'ora';
import fsExtra from 'fs-extra';
import path from 'path';
import { promises as fs } from 'fs';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';

import PermissionItemsArtifact from '../artifacts/contracts/permissioning/PermissionItems.sol/PermissionItems.json';
import PermissionManagerArtifact from '../artifacts/contracts/permissioning/PermissionManager.sol/PermissionManager.json';
import EurPriceFeedArtifact from '../artifacts/contracts/authorization/EurPriceFeed.sol/EurPriceFeed.json';
import OperationsRegistryArtifact from '../artifacts/contracts/authorization/OperationsRegistry.sol/OperationsRegistry.json';
import AuthorizationArtifact from '../artifacts/contracts/authorization/Authorization.sol/Authorization.json';
import XTokenWrapperArtifact from '../artifacts/contracts/token/XTokenWrapper.sol/XTokenWrapper.json';
import XTokenFactoryArtifact from '../artifacts/contracts/token/XTokenFactory.sol/XTokenFactory.json';

let spinner: Ora;

const requiredConfigs = ['EUR_USD_FEED', 'ETH_USD_FEED', 'TRAIDING_LIMIT'];
requiredConfigs.forEach(conf => assert(process.env[conf], `Missing configuration variable: ${conf}`));

async function main(): Promise<void> {
  const { ethers, upgrades } = hre;
  // const [deployer] = await ethers.getSigners();
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

  // Deploy Authorization
  // PermissionItems
  // EurPriceFeed
  // OperationsRegistry
  // Trade Limit
  startLog('Deploying Authorization contract');
  const AuthorizationFactory: ContractFactory = await ethers.getContractFactory('Authorization');
  const authorizationContract: Authorization = (await upgrades.deployProxy(AuthorizationFactory, [
    permissionItemsContract.address,
    eurPriceFeedContract.address,
    operationsRegistryContract.address,
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
