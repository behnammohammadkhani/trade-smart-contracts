import { ERC20Mintable } from '../typechain';
import hre from 'hardhat';
import { ContractFactory } from 'ethers';
import settings from '../deployments/unknown-1337-testnet-data.json';
const { ethers } = hre;

const aaveAddress = settings.AAVE.address;

async function main(): Promise<void> {
  const aaveFactory: ContractFactory = await ethers.getContractFactory('ERC20Mintable');
  const aaveInstance: ERC20Mintable = aaveFactory.attach(aaveAddress) as ERC20Mintable;
  await aaveInstance.mint(ethers.constants.WeiPerEther.mul(46));
  console.log('meme');
}

void main();
