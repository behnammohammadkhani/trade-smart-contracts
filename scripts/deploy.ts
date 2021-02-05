import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import { PermissionItems, PermissionManager } from '../typechain';

import ora, { Ora } from 'ora';
import fsExtra from 'fs-extra';
import path from 'path';
import { promises as fs } from 'fs';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';

import PermissionItemsArtifact from '../artifacts/contracts/permissioning/PermissionItems.sol/PermissionItems.json';
import PermissionManagerArtifact from '../artifacts/contracts/permissioning/PermissionManager.sol/PermissionManager.json';

let spinner: Ora;

async function main(): Promise<void> {
  const { ethers, upgrades } = hre;
  // const [deployer] = await ethers.getSigners();
  let deploymentData = await read();

  startLog('Deploying PermissionItems contract');
  const PermissionItemsFactory: ContractFactory = await ethers.getContractFactory('PermissionItems');
  const permissionItemsContract: PermissionItems = (await PermissionItemsFactory.deploy()) as PermissionItems;
  await permissionItemsContract.deployed();

  deploymentData = {
    ...deploymentData,
    PermissionItems: {
      address: permissionItemsContract.address,
      abi: PermissionItemsArtifact.abi,
      deployTransaction: permissionItemsContract.deployTransaction,
    },
  };

  await write(deploymentData);
  stopLog(`PermissionItems deployed to ${permissionItemsContract.address}`);

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
      deployTransaction: permissionItemsContract.deployTransaction,
    },
  };

  await write(deploymentData);
  stopLog(`PermissionManager deployed to ${permissionManagerContract.address}`);
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

function stopLog(message: string) {
  spinner.succeed(message);
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
