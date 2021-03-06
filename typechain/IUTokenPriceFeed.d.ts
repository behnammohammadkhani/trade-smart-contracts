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

interface IUTokenPriceFeedInterface extends ethers.utils.Interface {
  functions: {
    "calculateAmount(address,uint256)": FunctionFragment;
    "getPrice(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculateAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPrice", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "calculateAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;

  events: {};
}

export class IUTokenPriceFeed extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IUTokenPriceFeedInterface;

  functions: {
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

    getPrice(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getPrice(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

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

  getPrice(_asset: string, overrides?: Overrides): Promise<ContractTransaction>;

  "getPrice(address)"(
    _asset: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
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

    getPrice(_asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPrice(address)"(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
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

    getPrice(_asset: string, overrides?: Overrides): Promise<BigNumber>;

    "getPrice(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
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

    getPrice(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getPrice(address)"(
      _asset: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
