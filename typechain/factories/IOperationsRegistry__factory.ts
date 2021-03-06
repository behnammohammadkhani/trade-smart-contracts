/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IOperationsRegistry } from "../IOperationsRegistry";

export class IOperationsRegistry__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOperationsRegistry {
    return new Contract(address, _abi, signerOrProvider) as IOperationsRegistry;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_operation",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "allowAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "disallowAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_eurPriceFeed",
        type: "address",
      },
    ],
    name: "setEurPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_operation",
        type: "bytes4",
      },
    ],
    name: "tradingBalanceByOperation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
