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

interface PermissionManagerStorageInterface extends ethers.utils.Interface {
  functions: {
    "permissionItems()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "permissionItems",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "permissionItems",
    data: BytesLike
  ): Result;

  events: {};
}

export class PermissionManagerStorage extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: PermissionManagerStorageInterface;

  functions: {
    permissionItems(overrides?: CallOverrides): Promise<[string]>;

    "permissionItems()"(overrides?: CallOverrides): Promise<[string]>;
  };

  permissionItems(overrides?: CallOverrides): Promise<string>;

  "permissionItems()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    permissionItems(overrides?: CallOverrides): Promise<string>;

    "permissionItems()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    permissionItems(overrides?: CallOverrides): Promise<BigNumber>;

    "permissionItems()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    permissionItems(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "permissionItems()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
