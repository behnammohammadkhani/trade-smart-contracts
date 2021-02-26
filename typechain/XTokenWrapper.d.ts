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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface XTokenWrapperInterface extends ethers.utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "ETH_TOKEN_ADDRESS()": FunctionFragment;
    "REGISTRY_MANAGER_ROLE()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "registerToken(address,address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setRegistryManager(address)": FunctionFragment;
    "tokenToXToken(address)": FunctionFragment;
    "unwrap(address,uint256)": FunctionFragment;
    "wrap(address,uint256)": FunctionFragment;
    "xTokenToToken(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ETH_TOKEN_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REGISTRY_MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerToken",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRegistryManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenToXToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unwrap",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "wrap",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "xTokenToToken",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ETH_TOKEN_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REGISTRY_MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRegistryManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenToXToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "xTokenToToken",
    data: BytesLike
  ): Result;

  events: {
    "RegisterToken(address,address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RegisterToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export class XTokenWrapper extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: XTokenWrapperInterface;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    "DEFAULT_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<[string]>;

    ETH_TOKEN_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    "ETH_TOKEN_ADDRESS()"(overrides?: CallOverrides): Promise<[string]>;

    REGISTRY_MANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    "REGISTRY_MANAGER_ROLE()"(overrides?: CallOverrides): Promise<[string]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    "getRoleAdmin(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "getRoleMember(bytes32,uint256)"(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getRoleMemberCount(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "grantRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "hasRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerToken(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerToken(address,address)"(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "renounceRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "revokeRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setRegistryManager(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setRegistryManager(address)"(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    tokenToXToken(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    "tokenToXToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    wrap(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "wrap(address,uint256)"(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    xTokenToToken(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    "xTokenToToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  "DEFAULT_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;

  ETH_TOKEN_ADDRESS(overrides?: CallOverrides): Promise<string>;

  "ETH_TOKEN_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

  REGISTRY_MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

  "REGISTRY_MANAGER_ROLE()"(overrides?: CallOverrides): Promise<string>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  "getRoleAdmin(bytes32)"(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMember(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getRoleMember(bytes32,uint256)"(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getRoleMemberCount(bytes32)"(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "grantRole(bytes32,address)"(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "hasRole(bytes32,address)"(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerToken(
    _token: string,
    _xToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerToken(address,address)"(
    _token: string,
    _xToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "renounceRole(bytes32,address)"(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "revokeRole(bytes32,address)"(
    role: BytesLike,
    account: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setRegistryManager(
    _registryManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setRegistryManager(address)"(
    _registryManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  tokenToXToken(arg0: string, overrides?: CallOverrides): Promise<string>;

  "tokenToXToken(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  unwrap(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unwrap(address,uint256)"(
    _xToken: string,
    _amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  wrap(
    _token: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "wrap(address,uint256)"(
    _token: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  xTokenToToken(arg0: string, overrides?: CallOverrides): Promise<string>;

  "xTokenToToken(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    "DEFAULT_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<string>;

    ETH_TOKEN_ADDRESS(overrides?: CallOverrides): Promise<string>;

    "ETH_TOKEN_ADDRESS()"(overrides?: CallOverrides): Promise<string>;

    REGISTRY_MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

    "REGISTRY_MANAGER_ROLE()"(overrides?: CallOverrides): Promise<string>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    "getRoleAdmin(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getRoleMember(bytes32,uint256)"(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRoleMemberCount(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "grantRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "hasRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerToken(
      _token: string,
      _xToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerToken(address,address)"(
      _token: string,
      _xToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "renounceRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "revokeRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRegistryManager(
      _registryManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setRegistryManager(address)"(
      _registryManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenToXToken(arg0: string, overrides?: CallOverrides): Promise<string>;

    "tokenToXToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

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
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "wrap(address,uint256)"(
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    xTokenToToken(arg0: string, overrides?: CallOverrides): Promise<string>;

    "xTokenToToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    RegisterToken(token: string | null, xToken: string | null): EventFilter;

    RoleAdminChanged(
      role: BytesLike | null,
      previousAdminRole: BytesLike | null,
      newAdminRole: BytesLike | null
    ): EventFilter;

    RoleGranted(
      role: BytesLike | null,
      account: string | null,
      sender: string | null
    ): EventFilter;

    RoleRevoked(
      role: BytesLike | null,
      account: string | null,
      sender: string | null
    ): EventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    "DEFAULT_ADMIN_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ETH_TOKEN_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    "ETH_TOKEN_ADDRESS()"(overrides?: CallOverrides): Promise<BigNumber>;

    REGISTRY_MANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    "REGISTRY_MANAGER_ROLE()"(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRoleAdmin(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRoleMember(bytes32,uint256)"(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getRoleMemberCount(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "grantRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hasRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerToken(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerToken(address,address)"(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "renounceRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "revokeRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setRegistryManager(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setRegistryManager(address)"(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    tokenToXToken(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "tokenToXToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    wrap(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "wrap(address,uint256)"(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    xTokenToToken(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "xTokenToToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "DEFAULT_ADMIN_ROLE()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ETH_TOKEN_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ETH_TOKEN_ADDRESS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REGISTRY_MANAGER_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "REGISTRY_MANAGER_ROLE()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getRoleAdmin(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getRoleMember(bytes32,uint256)"(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getRoleMemberCount(bytes32)"(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "grantRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerToken(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerToken(address,address)"(
      _token: string,
      _xToken: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "renounceRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "revokeRole(bytes32,address)"(
      role: BytesLike,
      account: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setRegistryManager(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setRegistryManager(address)"(
      _registryManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    tokenToXToken(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenToXToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    unwrap(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unwrap(address,uint256)"(
      _xToken: string,
      _amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    wrap(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "wrap(address,uint256)"(
      _token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    xTokenToToken(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "xTokenToToken(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}