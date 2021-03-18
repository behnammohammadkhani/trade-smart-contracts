import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import { XTokenFactory } from '../typechain';

import path from 'path';
import { promises as fs } from 'fs';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';

async function main(): Promise<void> {
  const { ethers } = hre;
  // const [deployer] = await ethers.getSigners();
  const deploymentData = await read();

  const XTokenFactoryFactory: ContractFactory = await ethers.getContractFactory('XTokenFactory');
  const xTokenFactoryContract: XTokenFactory = XTokenFactoryFactory.attach(
    deploymentData.XTokenFactory.address,
  ) as XTokenFactory;

  console.log('Deploying xDAI'); //0x4e89c71fd434693ba590e36b55703c4a9600edc6e34731c6fa23a291ac3e60bd
  const daiTx = await xTokenFactoryContract.deployXToken(
    '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    'Dai',
    'DAI',
    18,
    '',
    deploymentData.AuthorizationProxy.address,
    '0x74825DbC8BF76CC4e9494d0ecB210f676Efa001D',
  );

  const daiRecipt = await daiTx.wait();
  console.log(daiRecipt);

  console.log('Deploying xUSDC'); //0xdbaa16439969e3633ff23d066fc13ed6339534fbcaf3ec681bfe3d49216f1a22
  const usdcTx = await xTokenFactoryContract.deployXToken(
    '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    'USD Coin',
    'USDC',
    6,
    '',
    deploymentData.AuthorizationProxy.address,
    '0xdCA36F27cbC4E38aE16C4E9f99D39b42337F6dcf',
  );

  const usdcRecipt = await usdcTx.wait();
  console.log(usdcRecipt);
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
async function getDeploymentFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}.json`);
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
