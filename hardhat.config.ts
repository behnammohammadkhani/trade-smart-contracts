import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(__dirname, './.env') });

import { HardhatUserConfig } from 'hardhat/config';
// import { HardhatNetworkUserConfig } from 'hardhat/types/config';
import { NetworkUserConfig } from 'hardhat/types';
import './tasks/accounts';
import './tasks/clean';

import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import 'solidity-coverage';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

// Ensure that we have all the environment variables we need.
let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error('Please set your MNEMONIC in a .env file');
} else {
  mnemonic = process.env.MNEMONIC;
}

let infuraApiKey: string;
if (!process.env.INFURA_API_KEY) {
  throw new Error('Please set your INFURA_API_KEY in a .env file');
} else {
  infuraApiKey = process.env.INFURA_API_KEY;
}

function createTestnetConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = 'https://' + network + '.infura.io/v3/' + infuraApiKey;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    gas: 'auto',
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    ganache: {
      url: 'http://localhost:8545', // Localhost (default: none)
    },
    hardhat: {
      forking: {
        url: 'not commiting this',
      },
      blockGasLimit: 1000000000,
      throwOnCallFailures: false,
      accounts: {
        mnemonic,
        accountsBalance: '10000000000000000000000000000000000',
      },
      chainId: chainIds.hardhat,
    },
    goerli: createTestnetConfig('goerli'),
    kovan: createTestnetConfig('kovan'),
    rinkeby: createTestnetConfig('rinkeby'),
    ropsten: createTestnetConfig('ropsten'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },

  solidity: {
    compilers: [
      {
        version: '0.7.4',
        settings: {
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  gasReporter: {
    coinmarketcap: process.env.COIN_MARKET_CAP_KEY,
    currency: 'USD',
    gasPrice: 21,
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: ['mocks/', 'test/'],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_ID,
  },
};

export default config;
