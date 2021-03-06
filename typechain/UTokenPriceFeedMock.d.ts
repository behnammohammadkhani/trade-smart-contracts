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

interface UTokenPriceFeedMockInterface extends ethers.utils.Interface {
  functions: {
    "calculateAmount(address,uint256)": FunctionFragment;
    "getPrice(address)": FunctionFragment;
    "noPrice()": FunctionFragment;
    "setNoPrice(bool)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculateAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPrice", values: [string]): string;
  encodeFunctionData(functionFragment: "noPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "setNoPrice", values: [boolean]): string;

  decodeFunctionResult(
    functionFragment: "calculateAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "noPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setNoPrice", data: BytesLike): Result;

  events: {};
}

export class UTokenPriceFeedMock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: UTokenPriceFeedMockInterface;

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

    getPrice(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    "getPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    noPrice(overrides?: CallOverrides): Promise<[boolean]>;

    "noPrice()"(overrides?: CallOverrides): Promise<[boolean]>;

    setNoPrice(
      _noPrice: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setNoPrice(bool)"(
      _noPrice: boolean,
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

  getPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  "getPrice(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  noPrice(overrides?: CallOverrides): Promise<boolean>;

  "noPrice()"(overrides?: CallOverrides): Promise<boolean>;

  setNoPrice(
    _noPrice: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setNoPrice(bool)"(
    _noPrice: boolean,
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

    noPrice(overrides?: CallOverrides): Promise<boolean>;

    "noPrice()"(overrides?: CallOverrides): Promise<boolean>;

    setNoPrice(_noPrice: boolean, overrides?: CallOverrides): Promise<void>;

    "setNoPrice(bool)"(
      _noPrice: boolean,
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

    getPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    noPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "noPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    setNoPrice(_noPrice: boolean, overrides?: Overrides): Promise<BigNumber>;

    "setNoPrice(bool)"(
      _noPrice: boolean,
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
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    noPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "noPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setNoPrice(
      _noPrice: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setNoPrice(bool)"(
      _noPrice: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
