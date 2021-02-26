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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface XTokenWrapperMockInterface extends ethers.utils.Interface {
  functions: {
    "unwrap(address,uint256)": FunctionFragment;
    "wrap(address,uint256)": FunctionFragment;
    "xToken()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "unwrap",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "wrap",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "xToken", values?: undefined): string;

  decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "xToken", data: BytesLike): Result;

  events: {};
}

export class XTokenWrapperMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: XTokenWrapperMockInterface;

  functions: {
    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    wrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "wrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    xToken(overrides?: CallOverrides): Promise<[string]>;

    "xToken()"(overrides?: CallOverrides): Promise<[string]>;
  };

  unwrap(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "unwrap(address,uint256)"(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  wrap(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "wrap(address,uint256)"(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  xToken(overrides?: CallOverrides): Promise<string>;

  "xToken()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    wrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "wrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    xToken(overrides?: CallOverrides): Promise<string>;

    "xToken()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    wrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "wrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    xToken(overrides?: CallOverrides): Promise<BigNumber>;

    "xToken()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    wrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "wrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    xToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "xToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}