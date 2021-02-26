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

interface PermissionManagerInterface extends ethers.utils.Interface {
  functions: {
    "REJECTED_ID()": FunctionFragment;
    "SUSPENDED_ID()": FunctionFragment;
    "TIER_1_ID()": FunctionFragment;
    "TIER_2_ID()": FunctionFragment;
    "assingTier1(address[])": FunctionFragment;
    "assingTier2(tuple[])": FunctionFragment;
    "hasTier1(address)": FunctionFragment;
    "hasTier2(address)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "isRejected(address)": FunctionFragment;
    "isSuspended(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "permissionItems()": FunctionFragment;
    "rejectUser(tuple[])": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revokeTier1(address[])": FunctionFragment;
    "revokeTier2(tuple[])": FunctionFragment;
    "setPermissionItems(address)": FunctionFragment;
    "suspendUser(tuple[])": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unrejectUser(tuple[])": FunctionFragment;
    "unsuspendUser(tuple[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "REJECTED_ID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SUSPENDED_ID",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TIER_1_ID", values?: undefined): string;
  encodeFunctionData(functionFragment: "TIER_2_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "assingTier1",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "assingTier2",
    values: [{ user: string; proxy: string }[]]
  ): string;
  encodeFunctionData(functionFragment: "hasTier1", values: [string]): string;
  encodeFunctionData(functionFragment: "hasTier2", values: [string]): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(functionFragment: "isRejected", values: [string]): string;
  encodeFunctionData(functionFragment: "isSuspended", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "permissionItems",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rejectUser",
    values: [{ user: string; proxy: string }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeTier1",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeTier2",
    values: [{ user: string; proxy: string }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setPermissionItems",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "suspendUser",
    values: [{ user: string; proxy: string }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unrejectUser",
    values: [{ user: string; proxy: string }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "unsuspendUser",
    values: [{ user: string; proxy: string }[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "REJECTED_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SUSPENDED_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TIER_1_ID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TIER_2_ID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "assingTier1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assingTier2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasTier1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasTier2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isRejected", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isSuspended",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "permissionItems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rejectUser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeTier1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeTier2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermissionItems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "suspendUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unrejectUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unsuspendUser",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "PermissionItemsSetted(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PermissionItemsSetted"): EventFragment;
}

export class PermissionManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: PermissionManagerInterface;

  functions: {
    REJECTED_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "REJECTED_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    SUSPENDED_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "SUSPENDED_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIER_1_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    TIER_2_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    assingTier1(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "assingTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    assingTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "assingTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    hasTier1(_account: string, overrides?: CallOverrides): Promise<[boolean]>;

    "hasTier1(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hasTier2(_account: string, overrides?: CallOverrides): Promise<[boolean]>;

    "hasTier2(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isRejected(_account: string, overrides?: CallOverrides): Promise<[boolean]>;

    "isRejected(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isSuspended(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isSuspended(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    permissionItems(overrides?: CallOverrides): Promise<[string]>;

    "permissionItems()"(overrides?: CallOverrides): Promise<[string]>;

    rejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "rejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    revokeTier1(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "revokeTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    revokeTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "revokeTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setPermissionItems(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setPermissionItems(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    suspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "suspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
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

    unrejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unrejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    unsuspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unsuspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  REJECTED_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "REJECTED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  SUSPENDED_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "SUSPENDED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

  "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

  assingTier1(
    _accounts: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "assingTier1(address[])"(
    _accounts: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  assingTier2(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "assingTier2(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  hasTier1(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "hasTier1(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hasTier2(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "hasTier2(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _permissionItems: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address)"(
    _permissionItems: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isRejected(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "isRejected(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isSuspended(_account: string, overrides?: CallOverrides): Promise<boolean>;

  "isSuspended(address)"(
    _account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  permissionItems(overrides?: CallOverrides): Promise<string>;

  "permissionItems()"(overrides?: CallOverrides): Promise<string>;

  rejectUser(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "rejectUser(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  revokeTier1(
    _accounts: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "revokeTier1(address[])"(
    _accounts: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  revokeTier2(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "revokeTier2(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setPermissionItems(
    _permissionItems: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setPermissionItems(address)"(
    _permissionItems: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  suspendUser(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "suspendUser(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
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

  unrejectUser(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unrejectUser(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  unsuspendUser(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unsuspendUser(tuple[])"(
    _usersProxies: { user: string; proxy: string }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    REJECTED_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "REJECTED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    SUSPENDED_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "SUSPENDED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    assingTier1(_accounts: string[], overrides?: CallOverrides): Promise<void>;

    "assingTier1(address[])"(
      _accounts: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    assingTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "assingTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    hasTier1(_account: string, overrides?: CallOverrides): Promise<boolean>;

    "hasTier1(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hasTier2(_account: string, overrides?: CallOverrides): Promise<boolean>;

    "hasTier2(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _permissionItems: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address)"(
      _permissionItems: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isRejected(_account: string, overrides?: CallOverrides): Promise<boolean>;

    "isRejected(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isSuspended(_account: string, overrides?: CallOverrides): Promise<boolean>;

    "isSuspended(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    permissionItems(overrides?: CallOverrides): Promise<string>;

    "permissionItems()"(overrides?: CallOverrides): Promise<string>;

    rejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "rejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    revokeTier1(_accounts: string[], overrides?: CallOverrides): Promise<void>;

    "revokeTier1(address[])"(
      _accounts: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    revokeTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "revokeTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    setPermissionItems(
      _permissionItems: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setPermissionItems(address)"(
      _permissionItems: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    suspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "suspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
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

    unrejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "unrejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    unsuspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "unsuspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    PermissionItemsSetted(newPermissions: string | null): EventFilter;
  };

  estimateGas: {
    REJECTED_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "REJECTED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    SUSPENDED_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "SUSPENDED_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_1_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    TIER_2_ID(overrides?: CallOverrides): Promise<BigNumber>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<BigNumber>;

    assingTier1(_accounts: string[], overrides?: Overrides): Promise<BigNumber>;

    "assingTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    assingTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "assingTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    hasTier1(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "hasTier1(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasTier2(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "hasTier2(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isRejected(_account: string, overrides?: CallOverrides): Promise<BigNumber>;

    "isRejected(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isSuspended(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isSuspended(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    permissionItems(overrides?: CallOverrides): Promise<BigNumber>;

    "permissionItems()"(overrides?: CallOverrides): Promise<BigNumber>;

    rejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "rejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    revokeTier1(_accounts: string[], overrides?: Overrides): Promise<BigNumber>;

    "revokeTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    revokeTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "revokeTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    setPermissionItems(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setPermissionItems(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    suspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "suspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
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

    unrejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unrejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    unsuspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unsuspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    REJECTED_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "REJECTED_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SUSPENDED_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "SUSPENDED_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIER_1_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "TIER_1_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TIER_2_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "TIER_2_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assingTier1(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "assingTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    assingTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "assingTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    hasTier1(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasTier1(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasTier2(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasTier2(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isRejected(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isRejected(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSuspended(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isSuspended(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    permissionItems(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "permissionItems()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "rejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    revokeTier1(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "revokeTier1(address[])"(
      _accounts: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    revokeTier2(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "revokeTier2(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setPermissionItems(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setPermissionItems(address)"(
      _permissionItems: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    suspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "suspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
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

    unrejectUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unrejectUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    unsuspendUser(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unsuspendUser(tuple[])"(
      _usersProxies: { user: string; proxy: string }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
