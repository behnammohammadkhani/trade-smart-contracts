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

interface IAuthorizationInterface extends ethers.utils.Interface {
  functions: {
    "isAuthorized(address,address,bytes4,bytes)": FunctionFragment;
    "setEurPriceFeed(address)": FunctionFragment;
    "setOperationsRegistry(address)": FunctionFragment;
    "setPermissions(address)": FunctionFragment;
    "setTradingLimint(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string, string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setEurPriceFeed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperationsRegistry",
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

  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEurPriceFeed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOperationsRegistry",
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

  events: {};
}

export class IAuthorization extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IAuthorizationInterface;

  functions: {
    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setOperationsRegistry(
      _operationsRegistry: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setOperationsRegistry(address)"(
      _operationsRegistry: string,
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
  };

  isAuthorized(
    _user: string,
    _asset: string,
    _operation: BytesLike,
    _data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "isAuthorized(address,address,bytes4,bytes)"(
    _user: string,
    _asset: string,
    _operation: BytesLike,
    _data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setEurPriceFeed(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setEurPriceFeed(address)"(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setOperationsRegistry(
    _operationsRegistry: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setOperationsRegistry(address)"(
    _operationsRegistry: string,
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

  callStatic: {
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

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setOperationsRegistry(
      _operationsRegistry: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setOperationsRegistry(address)"(
      _operationsRegistry: string,
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
  };

  filters: {};

  estimateGas: {
    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setOperationsRegistry(
      _operationsRegistry: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setOperationsRegistry(address)"(
      _operationsRegistry: string,
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
  };

  populateTransaction: {
    isAuthorized(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "isAuthorized(address,address,bytes4,bytes)"(
      _user: string,
      _asset: string,
      _operation: BytesLike,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setEurPriceFeed(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setEurPriceFeed(address)"(
      _eurPriceFeed: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setOperationsRegistry(
      _operationsRegistry: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setOperationsRegistry(address)"(
      _operationsRegistry: string,
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
  };
}