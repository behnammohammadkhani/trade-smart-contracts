/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface EurPriceFeedInterface extends ethers.utils.Interface {
  functions: {
    "assetEthFeed(address)": FunctionFragment;
    "calculateAmount(address,uint256)": FunctionFragment;
    "ethUsdFeed()": FunctionFragment;
    "eurUsdFeed()": FunctionFragment;
    "getPrice(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAssetsFeeds(address[],address[])": FunctionFragment;
    "setEthUsdFeed(address)": FunctionFragment;
    "setEurUsdFeed(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "assetEthFeed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ethUsdFeed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "eurUsdFeed",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getPrice", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetsFeeds",
    values: [string[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setEthUsdFeed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setEurUsdFeed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "assetEthFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ethUsdFeed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "eurUsdFeed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetsFeeds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEthUsdFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEurUsdFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AssetEthFeedSetted(address,address)": EventFragment;
    "EthUsdFeedSetted(address)": EventFragment;
    "EurUsdFeedSetted(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetEthFeedSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthUsdFeedSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EurUsdFeedSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class EurPriceFeed extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: EurPriceFeedInterface;

  functions: {
    assetEthFeed(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    "assetEthFeed(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    calculateAmount(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calculateAmount(address,uint256)"(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    ethUsdFeed(overrides?: CallOverrides): Promise<[string]>;

    "ethUsdFeed()"(overrides?: CallOverrides): Promise<[string]>;

    eurUsdFeed(overrides?: CallOverrides): Promise<[string]>;

    "eurUsdFeed()"(overrides?: CallOverrides): Promise<[string]>;

    getPrice(_asset: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "getPrice(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setAssetsFeeds(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setAssetsFeeds(address[],address[])"(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setEthUsdFeed(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setEthUsdFeed(address)"(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setEurUsdFeed(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setEurUsdFeed(address)"(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  assetEthFeed(arg0: string, overrides?: CallOverrides): Promise<string>;

  "assetEthFeed(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  calculateAmount(
    _asset: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateAmount(address,uint256)"(
    _asset: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  ethUsdFeed(overrides?: CallOverrides): Promise<string>;

  "ethUsdFeed()"(overrides?: CallOverrides): Promise<string>;

  eurUsdFeed(overrides?: CallOverrides): Promise<string>;

  "eurUsdFeed()"(overrides?: CallOverrides): Promise<string>;

  getPrice(_asset: string, overrides?: CallOverrides): Promise<BigNumber>;

  "getPrice(address)"(
    _asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setAssetsFeeds(
    _assets: string[],
    _feeds: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setAssetsFeeds(address[],address[])"(
    _assets: string[],
    _feeds: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setEthUsdFeed(
    _ethUsdFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setEthUsdFeed(address)"(
    _ethUsdFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setEurUsdFeed(
    _eurUsdFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setEurUsdFeed(address)"(
    _eurUsdFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    assetEthFeed(arg0: string, overrides?: CallOverrides): Promise<string>;

    "assetEthFeed(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

    calculateAmount(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmount(address,uint256)"(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ethUsdFeed(overrides?: CallOverrides): Promise<string>;

    "ethUsdFeed()"(overrides?: CallOverrides): Promise<string>;

    eurUsdFeed(overrides?: CallOverrides): Promise<string>;

    "eurUsdFeed()"(overrides?: CallOverrides): Promise<string>;

    getPrice(_asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setAssetsFeeds(
      _assets: string[],
      _feeds: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setAssetsFeeds(address[],address[])"(
      _assets: string[],
      _feeds: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    setEthUsdFeed(
      _ethUsdFeed: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setEthUsdFeed(address)"(
      _ethUsdFeed: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setEurUsdFeed(
      _eurUsdFeed: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setEurUsdFeed(address)"(
      _eurUsdFeed: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    AssetEthFeedSetted(asset: string | null, feed: string | null): EventFilter;

    EthUsdFeedSetted(newEthUsdFeed: string | null): EventFilter;

    EurUsdFeedSetted(newEurUsdFeed: string | null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    assetEthFeed(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "assetEthFeed(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateAmount(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmount(address,uint256)"(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ethUsdFeed(overrides?: CallOverrides): Promise<BigNumber>;

    "ethUsdFeed()"(overrides?: CallOverrides): Promise<BigNumber>;

    eurUsdFeed(overrides?: CallOverrides): Promise<BigNumber>;

    "eurUsdFeed()"(overrides?: CallOverrides): Promise<BigNumber>;

    getPrice(_asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setAssetsFeeds(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setAssetsFeeds(address[],address[])"(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    setEthUsdFeed(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setEthUsdFeed(address)"(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setEurUsdFeed(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setEurUsdFeed(address)"(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetEthFeed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "assetEthFeed(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateAmount(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateAmount(address,uint256)"(
      _asset: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ethUsdFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ethUsdFeed()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eurUsdFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "eurUsdFeed()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPrice(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getPrice(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setAssetsFeeds(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAssetsFeeds(address[],address[])"(
      _assets: string[],
      _feeds: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setEthUsdFeed(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setEthUsdFeed(address)"(
      _ethUsdFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setEurUsdFeed(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setEurUsdFeed(address)"(
      _eurUsdFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
