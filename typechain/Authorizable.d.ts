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

interface AuthorizableInterface extends ethers.utils.Interface {
  functions: {
    "authorization()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "authorization",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "authorization",
    data: BytesLike
  ): Result;

  events: {};
}

export class Authorizable extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AuthorizableInterface;

  functions: {
    authorization(overrides?: CallOverrides): Promise<[string]>;

    "authorization()"(overrides?: CallOverrides): Promise<[string]>;
  };

  authorization(overrides?: CallOverrides): Promise<string>;

  "authorization()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    authorization(overrides?: CallOverrides): Promise<string>;

    "authorization()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    authorization(overrides?: CallOverrides): Promise<BigNumber>;

    "authorization()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    authorization(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "authorization()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
