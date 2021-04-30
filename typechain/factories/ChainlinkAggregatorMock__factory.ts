/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ChainlinkAggregatorMock } from "../ChainlinkAggregatorMock";

export class ChainlinkAggregatorMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _decimals: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides
  ): Promise<ChainlinkAggregatorMock> {
    return super.deploy(
      _decimals,
      _price,
      overrides || {}
    ) as Promise<ChainlinkAggregatorMock>;
  }
  getDeployTransaction(
    _decimals: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_decimals, _price, overrides || {});
  }
  attach(address: string): ChainlinkAggregatorMock {
    return super.attach(address) as ChainlinkAggregatorMock;
  }
  connect(signer: Signer): ChainlinkAggregatorMock__factory {
    return super.connect(signer) as ChainlinkAggregatorMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainlinkAggregatorMock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ChainlinkAggregatorMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_decimals",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_price",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
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
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_price",
        type: "int256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161012b38038061012b8339818101604052604081101561003357600080fd5b50805160209091015160009190915560015560d8806100536000396000f3fe6080604052348015600f57600080fd5b506004361060465760003560e01c8063313ce56714604b57806350d25bcd146063578063a035b1fe146069578063f7a3080614606f575b600080fd5b6051608b565b60408051918252519081900360200190f35b60516091565b60516097565b608960048036036020811015608357600080fd5b5035609d565b005b60005481565b60015490565b60015481565b60015556fea2646970667358221220ae08843cf080fd5ef30708275291a9fd632d2284f8b04a854d2fe46240b7959d64736f6c63430007040033";
