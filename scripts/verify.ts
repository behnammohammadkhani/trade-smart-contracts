import hre from 'hardhat';
import assert from 'assert';
import path from 'path';
import { promises as fs } from 'fs';

import { getChainId, networkNames } from '@openzeppelin/upgrades-core';

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
  const { ethers } = hre;
  const deploymentData = await read(await getDeploymentFile());
  const ozData = await read(await getOZFile());

  // // PermissionItems
  // await hre.run("verify:verify", {
  //   address: deploymentData.PermissionItems.address,
  //   constructorArguments: [],
  // })

  // PermissionManagerImpl
  const proxyAdmin: any = (await ethers.getContractAt(
    ['function getProxyImplementation(address proxy) public view returns (address)'],
    ozData.admin.address,
  )) as any;
  const permissionManagerImpl = await proxyAdmin.getProxyImplementation(deploymentData.PermissionManagerProxy.address);

  await hre.run('verify:verify', {
    address: permissionManagerImpl,
    constructorArguments: [],
  });

  // EurPriceFeed
  await hre.run('verify:verify', {
    address: deploymentData.EurPriceFeed.address,
    constructorArguments: [process.env.EUR_USD_FEED, process.env.ETH_USD_FEED, [], []],
  });

  // OperationsRegistry
  await hre.run('verify:verify', {
    address: deploymentData.OperationsRegistry.address,
    constructorArguments: [deploymentData.EurPriceFeed.address],
  });

  // OperationsRegistry
  await hre.run('verify:verify', {
    address: deploymentData.XTokenWrapper.address,
    constructorArguments: [],
  });

  // AuthorizationImple
  const authorizationImple = await proxyAdmin.getProxyImplementation(deploymentData.AuthorizationProxy.address);
  await hre.run('verify:verify', {
    address: authorizationImple,
    constructorArguments: [],
  });

  // XTokenFactory
  await hre.run('verify:verify', {
    address: deploymentData.XTokenFactory.address,
    constructorArguments: [
      deploymentData.XTokenWrapper.address,
      deploymentData.OperationsRegistry.address,
      deploymentData.EurPriceFeed.address,
    ],
  });

  // ProtocolFee
  await hre.run('verify:verify', {
    address: deploymentData.ProtocolFee.address,
    constructorArguments: [process.env.PROTOCOL_FEE, process.env.MIN_PROTOCOL_FEE],
  });

  // BRegistry
  await hre.run('verify:verify', {
    address: deploymentData.BRegistry.address,
    constructorArguments: [process.env.BFACTORY],
  });

  // BPoolProxy
  await hre.run('verify:verify', {
    address: deploymentData.BPoolProxy.address,
    constructorArguments: [
      deploymentData.BRegistry.address,
      deploymentData.ProtocolFee.address,
      process.env.FEE_RECEIVER,
      deploymentData.XTokenWrapper.address,
    ],
  });
}

async function read(filename: string): Promise<any> {
  // const deploymentsFile = await getDeploymentFile();

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

async function getDeploymentFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}.json`);
}

async function getOZFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`.openzeppelin/${name}.json`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    // spinner.fail();
    console.error(error);
    process.exit(1);
  });
