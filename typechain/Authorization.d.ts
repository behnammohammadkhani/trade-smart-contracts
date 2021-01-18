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

interface AuthorizationInterface extends ethers.utils.Interface {
  functions: {
    "ERC20_APPROVE()": FunctionFragment;
    "ERC20_BURN_FROM()": FunctionFragment;
    "ERC20_MINT()": FunctionFragment;
    "ERC20_TRANSFER()": FunctionFragment;
    "ERC20_TRANSFER_FROM()": FunctionFragment;
    "TIER_1_ID()": FunctionFragment;
    "TIER_2_ID()": FunctionFragment;
    "eurPriceFeed()": FunctionFragment;
    "initialize(address,address,address,uint256)": FunctionFragment;
    "isAuthorized(address,address,bytes4,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "permissions()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setEurPriceFeed(address)": FunctionFragment;
    "setPermissions(address)": FunctionFragment;
    "setTradingLimint(uint256)": FunctionFragment;
    "setTradingRegistry(address)": FunctionFragment;
    "tradingLimit()": FunctionFragment;
    "tradingRegistry()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
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
    functionFragment: "initialize",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string, string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "permissions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setEurPriceFeed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setPermissions",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setTradingLimint",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTradingRegistry",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tradingLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradingRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
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
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "permissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEurPriceFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTradingLimint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTradingRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradingLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradingRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "EurPriceFeedSetted(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PermissionsSetted(address)": EventFragment;
    "TradingLimitSetted(uint256)": EventFragment;
    "TradingRegistrySetted(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EurPriceFeedSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PermissionsSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TradingLimitSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TradingRegistrySetted"): EventFragment;
}

export class Authorization extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AuthorizationInterface;

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

    initialize(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address,address,address,uint256)"(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    permissions(overrides?: CallOverrides): Promise<[string]>;

    "permissions()"(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setPermissions(
      _permissions: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setPermissions(address)"(
      _permissions: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setTradingLimint(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setTradingLimint(uint256)"(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setTradingRegistry(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setTradingRegistry(address)"(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    tradingLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    tradingRegistry(overrides?: CallOverrides): Promise<[string]>;

    "tradingRegistry()"(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
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

  initialize(
    _permissions: string,
    _eurPriceFeed: string,
    _tradingRegistry: string,
    _tradingLimit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address,address,address,uint256)"(
    _permissions: string,
    _eurPriceFeed: string,
    _tradingRegistry: string,
    _tradingLimit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isAuthorized(
    _user: string,
    _asset: string,
    _operation: BytesLike,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isAuthorized(address,address,bytes4,bytes)"(
    _user: string,
    _asset: string,
    _operation: BytesLike,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  permissions(overrides?: CallOverrides): Promise<string>;

  "permissions()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setEurPriceFeed(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setEurPriceFeed(address)"(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setPermissions(
    _permissions: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setPermissions(address)"(
    _permissions: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setTradingLimint(
    _tradingLimit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setTradingLimint(uint256)"(
    _tradingLimit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setTradingRegistry(
    _tradingRegistry: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setTradingRegistry(address)"(
    _tradingRegistry: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

  "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;

  tradingRegistry(overrides?: CallOverrides): Promise<string>;

  "tradingRegistry()"(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

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

    initialize(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address,address,uint256)"(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    permissions(overrides?: CallOverrides): Promise<string>;

    "permissions()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setPermissions(
      _permissions: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setPermissions(address)"(
      _permissions: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setTradingLimint(
      _tradingLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setTradingLimint(uint256)"(
      _tradingLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setTradingRegistry(
      _tradingRegistry: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setTradingRegistry(address)"(
      _tradingRegistry: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;

    tradingRegistry(overrides?: CallOverrides): Promise<string>;

    "tradingRegistry()"(overrides?: CallOverrides): Promise<string>;

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
    EurPriceFeedSetted(newEurPriceFeed: string | null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    PermissionsSetted(newPermissions: string | null): EventFilter;

    TradingLimitSetted(newLimit: null): EventFilter;

    TradingRegistrySetted(newTradingRegistry: string | null): EventFilter;
  };

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

    initialize(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(address,address,address,uint256)"(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    permissions(overrides?: CallOverrides): Promise<BigNumber>;

    "permissions()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setPermissions(
      _permissions: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setPermissions(address)"(
      _permissions: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setTradingLimint(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setTradingLimint(uint256)"(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setTradingRegistry(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setTradingRegistry(address)"(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    tradingLimit(overrides?: CallOverrides): Promise<BigNumber>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<BigNumber>;

    tradingRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    "tradingRegistry()"(overrides?: CallOverrides): Promise<BigNumber>;

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

    initialize(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,address,uint256)"(
      _permissions: string,
      _eurPriceFeed: string,
      _tradingRegistry: string,
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    permissions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "permissions()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setPermissions(
      _permissions: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setPermissions(address)"(
      _permissions: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setTradingLimint(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setTradingLimint(uint256)"(
      _tradingLimit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setTradingRegistry(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setTradingRegistry(address)"(
      _tradingRegistry: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    tradingLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tradingLimit()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tradingRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tradingRegistry()"(
      overrides?: CallOverrides
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
