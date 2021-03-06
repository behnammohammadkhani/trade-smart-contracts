/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BPoolSwapFeeMock } from "../BPoolSwapFeeMock";

export class BPoolSwapFeeMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    swapFee: BigNumberish,
    overrides?: Overrides
  ): Promise<BPoolSwapFeeMock> {
    return super.deploy(swapFee, overrides || {}) as Promise<BPoolSwapFeeMock>;
  }
  getDeployTransaction(
    swapFee: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(swapFee, overrides || {});
  }
  attach(address: string): BPoolSwapFeeMock {
    return super.attach(address) as BPoolSwapFeeMock;
  }
  connect(signer: Signer): BPoolSwapFeeMock__factory {
    return super.connect(signer) as BPoolSwapFeeMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BPoolSwapFeeMock {
    return new Contract(address, _abi, signerOrProvider) as BPoolSwapFeeMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getSwapFee",
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
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "setSwapFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516101033803806101038339818101604052602081101561003357600080fd5b505161003e81610044565b50610049565b600055565b60ac806100576000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806334e19907146037578063d4cadf68146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea2646970667358221220aa38e3c760be3d6df0f663a54387afbe3050db31ff1769b9122e9cff333f121e64736f6c63430007040033";
