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

interface ProtocolFeeInterface extends ethers.utils.Interface {
  functions: {
    "MAX_FEE()": FunctionFragment;
    "MIN_FEE()": FunctionFragment;
    "ONE()": FunctionFragment;
    "batchFee(tuple[],uint256)": FunctionFragment;
    "minProtocolFee()": FunctionFragment;
    "multihopBatch(tuple[][],uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "protocolFee()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setMinProtocolFee(uint256)": FunctionFragment;
    "setProtocolFee(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "MAX_FEE", values?: undefined): string;
  encodeFunctionData(functionFragment: "MIN_FEE", values?: undefined): string;
  encodeFunctionData(functionFragment: "ONE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "batchFee",
    values: [
      {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "minProtocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multihopBatch",
    values: [
      {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "protocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMinProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "MAX_FEE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "MIN_FEE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ONE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multihopBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "MinProtocolFeeSetted(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProtocolFeeSetted(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MinProtocolFeeSetted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProtocolFeeSetted"): EventFragment;
}

export class ProtocolFee extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ProtocolFeeInterface;

  functions: {
    MAX_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    MIN_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ONE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    batchFee(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "batchFee(tuple[],uint256)"(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    minProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "minProtocolFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    multihopBatch(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "multihopBatch(tuple[][],uint256)"(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    protocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "protocolFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setMinProtocolFee(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setMinProtocolFee(uint256)"(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setProtocolFee(
      _protocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setProtocolFee(uint256)"(
      _protocolFee: BigNumberish,
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

  MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

  MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

  ONE(overrides?: CallOverrides): Promise<BigNumber>;

  "ONE()"(overrides?: CallOverrides): Promise<BigNumber>;

  batchFee(
    swaps: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[],
    totalAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "batchFee(tuple[],uint256)"(
    swaps: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[],
    totalAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  minProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  "minProtocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  multihopBatch(
    swapSequences: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[][],
    totalAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "multihopBatch(tuple[][],uint256)"(
    swapSequences: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[][],
    totalAmountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  "protocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setMinProtocolFee(
    _minProtocolFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setMinProtocolFee(uint256)"(
    _minProtocolFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setProtocolFee(
    _protocolFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setProtocolFee(uint256)"(
    _protocolFee: BigNumberish,
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
    MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ONE(overrides?: CallOverrides): Promise<BigNumber>;

    "ONE()"(overrides?: CallOverrides): Promise<BigNumber>;

    batchFee(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "batchFee(tuple[],uint256)"(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    "minProtocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    multihopBatch(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "multihopBatch(tuple[][],uint256)"(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    "protocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setMinProtocolFee(
      _minProtocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setMinProtocolFee(uint256)"(
      _minProtocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setProtocolFee(
      _protocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setProtocolFee(uint256)"(
      _protocolFee: BigNumberish,
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
    MinProtocolFeeSetted(minProtocolFee: null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    ProtocolFeeSetted(protocolFee: null): EventFilter;
  };

  estimateGas: {
    MAX_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    MIN_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ONE(overrides?: CallOverrides): Promise<BigNumber>;

    "ONE()"(overrides?: CallOverrides): Promise<BigNumber>;

    batchFee(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "batchFee(tuple[],uint256)"(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    "minProtocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    multihopBatch(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "multihopBatch(tuple[][],uint256)"(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    "protocolFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setMinProtocolFee(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setMinProtocolFee(uint256)"(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setProtocolFee(
      _protocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setProtocolFee(uint256)"(
      _protocolFee: BigNumberish,
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
    MAX_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MAX_FEE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MIN_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "MIN_FEE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ONE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    batchFee(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "batchFee(tuple[],uint256)"(
      swaps: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minProtocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "minProtocolFee()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    multihopBatch(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "multihopBatch(tuple[][],uint256)"(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      totalAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    protocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "protocolFee()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setMinProtocolFee(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setMinProtocolFee(uint256)"(
      _minProtocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setProtocolFee(
      _protocolFee: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setProtocolFee(uint256)"(
      _protocolFee: BigNumberish,
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
