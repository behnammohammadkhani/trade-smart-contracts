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

interface EurPriceFeedMockInterface extends ethers.utils.Interface {
  functions: {
    "calculateAmount(address,uint256)": FunctionFragment;
    "getPrice(address)": FunctionFragment;
    "setAssetFeed(address,address)": FunctionFragment;
    "setAssetsFeeds(address[],address[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculateAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPrice", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setAssetFeed",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetsFeeds",
    values: [string[], string[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAssetFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetsFeeds",
    data: BytesLike
  ): Result;

  events: {};
}

export class EurPriceFeedMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: EurPriceFeedMockInterface;

  functions: {
    calculateAmount(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calculateAmount(address,uint256)"(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPrice(arg0: string, overrides?: Overrides): Promise<ContractTransaction>;

    "getPrice(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setAssetFeed(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setAssetFeed(address,address)"(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

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
  };

  calculateAmount(
    arg0: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateAmount(address,uint256)"(
    arg0: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPrice(arg0: string, overrides?: Overrides): Promise<ContractTransaction>;

  "getPrice(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setAssetFeed(
    _asset: string,
    _feed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setAssetFeed(address,address)"(
    _asset: string,
    _feed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

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

  callStatic: {
    calculateAmount(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmount(address,uint256)"(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAssetFeed(
      _asset: string,
      _feed: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setAssetFeed(address,address)"(
      _asset: string,
      _feed: string,
      overrides?: CallOverrides
    ): Promise<void>;

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
  };

  filters: {};

  estimateGas: {
    calculateAmount(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmount(address,uint256)"(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPrice(arg0: string, overrides?: Overrides): Promise<BigNumber>;

    "getPrice(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setAssetFeed(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setAssetFeed(address,address)"(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

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
  };

  populateTransaction: {
    calculateAmount(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateAmount(address,uint256)"(
      arg0: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPrice(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getPrice(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setAssetFeed(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAssetFeed(address,address)"(
      _asset: string,
      _feed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

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
  };
}
