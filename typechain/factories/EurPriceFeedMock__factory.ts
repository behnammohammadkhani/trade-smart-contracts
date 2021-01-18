/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { EurPriceFeedMock } from "../EurPriceFeedMock";

export class EurPriceFeedMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<EurPriceFeedMock> {
    return super.deploy(overrides || {}) as Promise<EurPriceFeedMock>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): EurPriceFeedMock {
    return super.attach(address) as EurPriceFeedMock;
  }
  connect(signer: Signer): EurPriceFeedMock__factory {
    return super.connect(signer) as EurPriceFeedMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EurPriceFeedMock {
    return new Contract(address, _abi, signerOrProvider) as EurPriceFeedMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "calculateAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060d68061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806329550f9714603757806341976e09146072575b600080fd5b606060048036036040811015604b57600080fd5b506001600160a01b0381351690602001356095565b60408051918252519081900360200190f35b606060048036036020811015608657600080fd5b50356001600160a01b0316609a565b919050565b5060019056fea26469706673582212208b0a19365e2f24c99a7b9f721ddaec6605a6fa5f540c698aa7d4182af9f1afe364736f6c63430007040033";
