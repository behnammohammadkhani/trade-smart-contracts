import hre from 'hardhat';
import path from 'path';
import _ from 'lodash';
import { promises as fs } from 'fs';
import fsExtra from 'fs-extra';
import { getChainId, networkNames } from '@openzeppelin/upgrades-core';
import * as chainlinkFeeds from './chainlink-feeds.json';

export type TestnetData = { [key: string]: { address: string } };

export type ValidChainId = keyof typeof chainlinkFeeds;
export type EthAsToken = 'ETH';
export type TokenSymbol = 'USDC' | 'DAI' | 'WBTC' | 'SMT' | 'SNX' | 'AAVE'| 'SPT' | 'WETH'|EthAsToken;
export type XTokenSymbol = 'xUSDC' | 'xDAI' | 'xWBTC' | 'xSMT'| 'xSNX' | 'xAAVE' | 'xETH'|'xSPT'|'xWETH';

// FIXME: figure out the proper way to add type bindings withoug copypasting the code
export function combinations<Type>(collection: Array<Type>, n: number) :Array<[Type, Type]>{
  const array = _.values(collection);
  if (array.length < n) {
    return [];
  }
  const recur = ((array: any, n: number) => {
    if (--n < 0) {
      return [[]];
    }
    const workingCombinations: any = [];
    array = array.slice();
    while (array.length - n) {
      const value: any = array.shift();
      recur(array, n).forEach((combination: any) => {
        combination.unshift(value);
        workingCombinations.push(combination);
      });
    }
    return workingCombinations;
  });
  return recur(array, n);
}

export async function getDeploymentFile():Promise<string> {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}.json`);
}

async function getOZFile() {
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`.openzeppelin/${name}.json`);
}

export async function getTestnetDataFile():Promise<string>{
  const chainId = await getChainId(hre.network.provider);
  const name = networkNames[chainId] ?? `unknown-${chainId}`;
  return path.join(`deployments/${name}-testnet-data.json`);
}

export async function writeTestnetData(data: TestnetData): Promise<void> {
  const file = await getTestnetDataFile();
  await fsExtra.ensureFile(file);
  await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n');
}

async function readFile(filename: string): Promise<any> {
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

export async function readDeploymentFile():Promise<any>{
  return readFile(await getDeploymentFile());
}

export async function readOZFile():Promise<any>{
  return readFile(await getOZFile());
}

export async function readTestnetDataFile():Promise<TestnetData>{
  return readFile(await getTestnetDataFile()) as unknown as TestnetData;
}

export function tokenToXToken(token: TokenSymbol): XTokenSymbol {
  const map = {
    USDC: 'xUSDC',
    ETH: 'xETH',
    WETH: 'xWETH',
    DAI: 'xDAI',
    WBTC: 'xWBTC',
    SPT: 'xSPT',
    SMT: 'xSMT',
    SNX: 'xSNX',
    AAVE: 'xAAVE',
  };
  return map[token] as XTokenSymbol;
}

export async function getAssetToEthPricefeed(asset: TokenSymbol): Promise<string> {
  // trust, don't verify
  // TODO: learn typescript
  const chainId: ValidChainId = (await getChainId(hre.network.provider)).toString() as ValidChainId;
  // i'd do a .includes but that doesn't help with static checking
  if(asset == 'SPT' || asset =='WETH') return chainlinkFeeds[chainId]['ETH'];
  const feedAddress = chainlinkFeeds[chainId][asset] as string;
  if (!feedAddress) {
    throw new Error(`feed ${asset} unavailable on network ${chainId}`);
  }
  return feedAddress;
}

