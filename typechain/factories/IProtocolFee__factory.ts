/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IProtocolFee } from "../IProtocolFee";

export class IProtocolFee__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProtocolFee {
    return new Contract(address, _abi, signerOrProvider) as IProtocolFee;
  }
}

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "swapAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limitReturnAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPrice",
            type: "uint256",
          },
        ],
        internalType: "struct ISwap.Swap[]",
        name: "swaps",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "batchFee",
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
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "swapAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limitReturnAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPrice",
            type: "uint256",
          },
        ],
        internalType: "struct ISwap.Swap[][]",
        name: "swapSequences",
        type: "tuple[][]",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "multihopBatch",
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