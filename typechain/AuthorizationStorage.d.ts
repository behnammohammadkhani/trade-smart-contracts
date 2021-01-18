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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface AuthorizationStorageInterface extends ethers.utils.Interface {
  functions: {
    "ERC20_APPROVE()": FunctionFragment;
    "ERC20_BURN_FROM()": FunctionFragment;
    "ERC20_MINT()": FunctionFragment;
    "ERC20_TRANSFER()": FunctionFragment;
    "ERC20_TRANSFER_FROM()": FunctionFragment;
    "TIER_1_ID()": FunctionFragment;
    "TIER_2_ID()": FunctionFragment;
    "eurPriceFeed()": FunctionFragment;
    "operationsRegistry()": FunctionFragment;
    "permissions()": FunctionFragment;
    "tradingLimit()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ERC20_APPROVE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ERC20_BURN_FROM",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ERC20_MINT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ERC20_TRANSFER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ERC20_TRANSFER_FROM",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TIER_1_ID", values?: undefined): string;
  encodeFunctionData(functionFragment: "TIER_2_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "eurPriceFeed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "operationsRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "permissions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradingLimit",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ERC20_APPROVE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ERC20_BURN_FROM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ERC20_MINT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ERC20_TRANSFER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ERC20_TRANSFER_FROM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TIER_1_ID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TIER_2_ID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "eurPriceFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "operationsRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "permissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradingLimit",
    data: BytesLike
  ): Result;

  events: {};
}

export class AuthorizationStorage extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AuthorizationStorageInterface;

  functions: {
    ERC20_APPROVE(overrides?: CallOverrides): Promise<[string]>;

    "ERC20_APPROVE()"(overrides?: CallOverrides): Promise<[string]>;

    ERC20_BURN_FROM(overrides?: CallOverrides): Promise<[string]>;

    "ERC20_BURN_FROM()"(overrides?: CallOverrides): Promise<[string]>;

    ERC20_MINT(overrides?: CallOverrides): Promise<[string]>;

    "ERC20_MINT()"(overrides?: CallOverrides): Promise<[string]>;

    ERC20_TRANSFER(overrides?: CallOverrides): Promise<[string]>;

    "ERC20_TRANSFER()"(overrides?: CallOverrides): Promise<[string]>;

    ERC20_TRANSFER_FROM(overrides?: CallOverrides): Promise<[string]>;

    "ERC20_TRANSFER_FROM()"(overrides?: CallOverrides): Promise<[string]>;

    TIER_1_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIER_2_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    eurPriceFeed(overrides?: CallOverrides): Promise<[string]>;

    "eurPriceFeed()"(overrides?: CallOverrides): Promise<[string]>;

    operationsRegistry(overrides?: CallOverrides): Promise<[string]>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<[string]>;

    permissions(overrides?: CallOverrides): Promise<[string]>;

    "permissions()"(overrides?: CallOverrides): Promise<[string]>;

    tradingLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  ERC20_APPROVE(overrides?: CallOverrides): Promise<string>;

  "ERC20_APPROVE()"(overrides?: CallOverrides): Promise<string>;

  ERC20_BURN_FROM(overrides?: CallOverrides): Promise<string>;

  "ERC20_BURN_FROM()"(overrides?: CallOverrides): Promise<string>;

  ERC20_MINT(overrides?: CallOverrides): Promise<string>;

  "ERC20_MINT()"(overrides?: CallOverrides): Promise<string>;

  ERC20_TRANSFER(overrides?: CallOverrides): Promise<string>;

  "ERC20_TRANSFER()"(overrides?: CallOverrides): Promise<string>;

  ERC20_TRANSFER_FROM(overrides?: CallOverrides): Promise<string>;

  "ERC20_TRANSFER_FROM()"(overrides?: CallOverrides): Promise<string>;

  TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  eurPriceFeed(overrides?: CallOverrides): Promise<string>;

  "eurPriceFeed()"(overrides?: CallOverrides): Promise<string>;

  operationsRegistry(overrides?: CallOverrides): Promise<string>;

  "operationsRegistry()"(overrides?: CallOverrides): Promise<string>;

  permissions(overrides?: CallOverrides): Promise<string>;

  "permissions()"(overrides?: CallOverrides): Promise<string>;

  tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

  "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ERC20_APPROVE(overrides?: CallOverrides): Promise<string>;

    "ERC20_APPROVE()"(overrides?: CallOverrides): Promise<string>;

    ERC20_BURN_FROM(overrides?: CallOverrides): Promise<string>;

    "ERC20_BURN_FROM()"(overrides?: CallOverrides): Promise<string>;

    ERC20_MINT(overrides?: CallOverrides): Promise<string>;

    "ERC20_MINT()"(overrides?: CallOverrides): Promise<string>;

    ERC20_TRANSFER(overrides?: CallOverrides): Promise<string>;

    "ERC20_TRANSFER()"(overrides?: CallOverrides): Promise<string>;

    ERC20_TRANSFER_FROM(overrides?: CallOverrides): Promise<string>;

    "ERC20_TRANSFER_FROM()"(overrides?: CallOverrides): Promise<string>;

    TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    eurPriceFeed(overrides?: CallOverrides): Promise<string>;

    "eurPriceFeed()"(overrides?: CallOverrides): Promise<string>;

    operationsRegistry(overrides?: CallOverrides): Promise<string>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<string>;

    permissions(overrides?: CallOverrides): Promise<string>;

    "permissions()"(overrides?: CallOverrides): Promise<string>;

    tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    ERC20_APPROVE(overrides?: CallOverrides): Promise<BigNumber>;

    "ERC20_APPROVE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ERC20_BURN_FROM(overrides?: CallOverrides): Promise<BigNumber>;

    "ERC20_BURN_FROM()"(overrides?: CallOverrides): Promise<BigNumber>;

    ERC20_MINT(overrides?: CallOverrides): Promise<BigNumber>;

    "ERC20_MINT()"(overrides?: CallOverrides): Promise<BigNumber>;

    ERC20_TRANSFER(overrides?: CallOverrides): Promise<BigNumber>;

    "ERC20_TRANSFER()"(overrides?: CallOverrides): Promise<BigNumber>;

    ERC20_TRANSFER_FROM(overrides?: CallOverrides): Promise<BigNumber>;

    "ERC20_TRANSFER_FROM()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    eurPriceFeed(overrides?: CallOverrides): Promise<BigNumber>;

    "eurPriceFeed()"(overrides?: CallOverrides): Promise<BigNumber>;

    operationsRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<BigNumber>;

    permissions(overrides?: CallOverrides): Promise<BigNumber>;

    "permissions()"(overrides?: CallOverrides): Promise<BigNumber>;

    tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ERC20_APPROVE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ERC20_APPROVE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ERC20_BURN_FROM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ERC20_BURN_FROM()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ERC20_MINT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ERC20_MINT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ERC20_TRANSFER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ERC20_TRANSFER()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ERC20_TRANSFER_FROM(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "ERC20_TRANSFER_FROM()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    TIER_1_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIER_2_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eurPriceFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "eurPriceFeed()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    operationsRegistry(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "operationsRegistry()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    permissions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "permissions()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tradingLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
