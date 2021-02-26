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

interface OperationsRegistryAssetMockInterface extends ethers.utils.Interface {
  functions: {
    "operationsRegistry()": FunctionFragment;
    "someFunction(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "operationsRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "someFunction",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "operationsRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "someFunction",
    data: BytesLike
  ): Result;

  events: {};
}

export class OperationsRegistryAssetMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OperationsRegistryAssetMockInterface;

  functions: {
    operationsRegistry(overrides?: CallOverrides): Promise<[string]>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<[string]>;

    someFunction(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "someFunction(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  operationsRegistry(overrides?: CallOverrides): Promise<string>;

  "operationsRegistry()"(overrides?: CallOverrides): Promise<string>;

  someFunction(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "someFunction(uint256)"(
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    operationsRegistry(overrides?: CallOverrides): Promise<string>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<string>;

    someFunction(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "someFunction(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    operationsRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    "operationsRegistry()"(overrides?: CallOverrides): Promise<BigNumber>;

    someFunction(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "someFunction(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    operationsRegistry(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "operationsRegistry()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    someFunction(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "someFunction(uint256)"(
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}