import hre from 'hardhat';
import assert from 'assert';
import { BigNumberish, ContractFactory, BigNumber } from 'ethers';
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

import ora, { Ora } from 'ora';
import {readDeploymentFile, readTestnetDataFile, combinations, EthAsToken, TestnetData, TokenSymbol, writeTestnetData, XTokenSymbol, tokenToXToken, getAssetToEthPricefeed} from './common';

const { ethers } = hre;

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

type PoolConfig = {
  token: ERC20Mintable|EthAsToken,
  xToken: XToken,
  amount: BigNumberish,
  denorm: BigNumberish,
}

let spinner: Ora;

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(deployerAddress);
  const deploymentData = await readDeploymentFile();
  const testData = await readTestnetDataFile();

  const permissionManagerContract: PermissionManager = (await ethers.getContractAt(
    'PermissionManager',
    deploymentData.PermissionManagerProxy.address,
  )) as PermissionManager;
  startLog('Assigning Tier2 to user');
  // FIXME: this wastes gas
  await permissionManagerContract
    .assignItem(2, [deployerAddress], {gasLimit: '200000'})
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

  // // xTokens
  const xDAIContract: XToken = await deployXToken(deploymentData, testData, DAIContract, 'SM Wrapped Dai Stablecoin');
  const xWBTCContract: XToken =  await deployXToken(deploymentData, testData, WBTCContract, 'SM Wrapped Wrapped Bitcoin');

  const xTokenWrapperAddress: string =  deploymentData.XTokenWrapper.address;
  //approve tokens
  startLog('Approving tokens');
  await WBTCContract.approve(xTokenWrapperAddress, ethers.constants.MaxUint256);
  await DAIContract.approve(xTokenWrapperAddress, ethers.constants.MaxUint256);
  stopLog('Approving tokens');
  startLog('Minting tokens');
  // remove for mainnet
  await WBTCContract.mint('90000000000000000000000000');
  await DAIContract.mint('90000000000000000000000000');
  stopLog('Minting tokens');

  await createPool(
    deploymentData,
    testData,
    'xDAI/xWBTC',
    'SM Wrapped Pool Token - 50% xWBTC / 50% xDAI',
    '2500000000000000',
    [
      {token: WBTCContract, xToken: xWBTCContract, amount: '1000000', denorm:  '25000000000000000000'},
      {token: DAIContract, xToken: xDAIContract, amount:'230000000000000000000', denorm:  '25000000000000000000'}
    ]
  );
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
  if(testData[symbol]){
    const address:string = testData[symbol].address;
    startLog(`token ${symbol} already deployed, at address: ${address}`);
    stopLog(`token ${symbol} already deployed, at address: ${address}`);
    return (await ethers.getContractAt('ERC20Mintable', address)) as ERC20Mintable;
  }
  startLog(`Deploying Mock ${symbol}`);
  const ERC20MintableFactory: ContractFactory = await ethers.getContractFactory('ERC20Mintable');

  const contract: ERC20Mintable = (await ERC20MintableFactory.deploy(name, symbol, decimals)) as ERC20Mintable;
  await contract.deployed();

  await hre.run('verify:verify', {
    address: contract.address,
    constructorArguments: [name,symbol, decimals],
  }).catch(console.error);

  testData[symbol] = { address: contract.address };

  await writeTestnetData(testData);
  stopLog(`Mock ${symbol} deployed - address: ${contract.address}`);
  return contract;
}

// TODO type for the deployment data
async function deployXToken(
  deploymentData: any,
  testData: TestnetData,
  token: ERC20Mintable | EthAsToken,
  name: string,
  overrideIdentifier?: string
): Promise<XToken> {

  const xTokenFactoryContract: XTokenFactory = (await ethers.getContractAt(
    'XTokenFactory',
    deploymentData.XTokenFactory.address,
  )) as XTokenFactory;

  const tokenSymbol: TokenSymbol = token === 'ETH' ? 'ETH' : ((await token.symbol()) as TokenSymbol);
  // always use the symbol here. wrapped pools have symbol SPT and should always have a warpper with symbol xSPT
  const xTokenSymbol: XTokenSymbol = tokenToXToken(tokenSymbol);
  const identifier: string = overrideIdentifier || xTokenSymbol;
  if(testData[identifier]){
    const address:string = testData[identifier].address;
    startLog(`xtoken ${identifier} already deployed, at address: ${address}`);
    stopLog(`xtoken ${identifier} already deployed, at address: ${address}`);
    return (await ethers.getContractAt('XToken', address)) as XToken;
  }
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

  await hre.run('verify:verify', {
    address: xTokenAddress,
    constructorArguments: [name, xTokenSymbol, decimals, xTokenSymbol, deploymentData.AuthorizationProxy.address, deploymentData.OperationsRegistry.address],
  }).catch(console.error);

  testData[identifier] = {
    address: xTokenAddress,
  };

  await writeTestnetData(testData);
  stopLog(`deployed xToken for ${tokenSymbol}, ${xTokenSymbol} at address: ${xTokenAddress}`);
  // I'm doing a return await just to do a cast 😭
  return (await ethers.getContractAt('XToken', xTokenAddress)) as XToken;
}

async function createPool(deploymentData: any, testData: TestnetData, identifier: string, name: string, swapFee: BigNumberish, contracts:Array<PoolConfig>){
  assert(process.env.BFACTORY);
  const bFactoryContract: IBFactory = (await ethers.getContractAt('IBFactory', process.env.BFACTORY)) as IBFactory;
  const bRegistryContract: BRegistry = (await ethers.getContractAt(
    'BRegistry',
    deploymentData.BRegistry.address,
  )) as BRegistry;
  const xTokenWrapperContract: XTokenWrapper = (await ethers.getContractAt(
    'XTokenWrapper',
    deploymentData.XTokenWrapper.address,
  )) as XTokenWrapper;

  //create
  startLog(`Deploying ${identifier} Pool`);
  let poolContract: IBPool;

  // TODO: this skips straight to finalization if the pool is already present,
  // because it's what was useful for a particular deploy. In the future we'll
  // probably want to check for every step separately
  if(testData[identifier]){
    const poolAddress = testData[identifier].address;
    poolContract= (await ethers.getContractAt('IBPool', poolAddress)) as IBPool;
    stopLog(`${identifier} Pool already deployed at address: ${poolAddress}`);
  } else {
    const poolReceipt = await (await bFactoryContract.newBPool({ gasLimit: '1000000' })).wait();
    const newPoolEvent = poolReceipt.events?.find(log => log.event && log.event === 'LOG_NEW_POOL');
    const poolAddress = (newPoolEvent && newPoolEvent.args ? newPoolEvent.args.pool : '') as string;
    poolContract = (await ethers.getContractAt('IBPool', poolAddress)) as IBPool;
    await poolContract.setSwapFee(swapFee, { gasLimit: '1000000' });

    testData[identifier] = {
      address: poolAddress,
    };

    await writeTestnetData(testData);
    stopLog(`${identifier} Pool - address: ${poolAddress}`);

    await contracts.reduce((async function(acc:Promise<void>, {token, xToken, amount, denorm}) {
      await acc;
      const tokenSymbol: string = token === 'ETH'? 'ETH' : await token.symbol();
      if(token !== 'ETH'){
        startLog(`Approving ${tokenSymbol}`);
        // TODO: there are tokens that revert when changing the allowance from non-zero to non-zero
        // yes that makes sense: https://github.com/sec-bit/awesome-buggy-erc20-tokens/blob/master/ERC20_token_issue_list.md#a20-re-approve
        await token.approve(xTokenWrapperContract.address, amount);
        await xToken.approve(poolContract.address, amount);
        stopLog(`Approving ${tokenSymbol}`);
        startLog(`Wrapping ${tokenSymbol}`);
        await xTokenWrapperContract.wrap(token.address, amount, {gasLimit: '400000'});
        stopLog(`Wraped ${tokenSymbol}`);
      } else {
        startLog(`Wrapping ${tokenSymbol}`);
        await xTokenWrapperContract.wrap(ETH_ADDRESS, amount, {gasLimit: '400000'});
        stopLog(`Wraped ${tokenSymbol}`);
      }
      startLog(`Binding ${tokenSymbol} on ${identifier}, amount: ${amount}`);
      // TODO figure out what the last parameter even means
      await poolContract.bind(xToken.address, BigNumber.from(amount), denorm, {
        gasLimit: '1000000',
      })
      stopLog(`Bound ${tokenSymbol} on ${identifier}, amount: ${amount}`);
    }),Promise.resolve());

    // finalize
    startLog(`Finalizing Pool ${identifier}`);
    await poolContract.finalize({gasLimit: '300000'});
    stopLog(`Finalizing Pool ${identifier}`);
  }

  //set pares in BRegistry
  startLog('Registering Pairs');
  await Promise.all(
    combinations(contracts, 2 ).map(
      ([left, right]: [PoolConfig, PoolConfig]) =>
      bRegistryContract.addPoolPair(poolContract.address, left.xToken.address, right.xToken.address, {gasLimit:'700000'}))
  );
  stopLog('Registering Pairs');
  const poolAsToken: ERC20Mintable = (await ethers.getContractAt('ERC20Mintable', poolContract.address)) as ERC20Mintable;
  // TODO: this saves the pool token under `xSPT`, so we should work on redefining how will the testnetData file look like
  return deployXToken(deploymentData, testData, poolAsToken, name, name);
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
