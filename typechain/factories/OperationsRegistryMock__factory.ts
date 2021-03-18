/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { OperationsRegistryMock } from "../OperationsRegistryMock";

export class OperationsRegistryMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OperationsRegistryMock> {
    return super.deploy(overrides || {}) as Promise<OperationsRegistryMock>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OperationsRegistryMock {
    return super.attach(address) as OperationsRegistryMock;
  }
  connect(signer: Signer): OperationsRegistryMock__factory {
    return super.connect(signer) as OperationsRegistryMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OperationsRegistryMock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OperationsRegistryMock;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "operation",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AddTrade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "operation",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060f58061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063dd561ae414602d575b600080fd5b606660048036036060811015604157600080fd5b506001600160a01b03813516906001600160e01b031960208201351690604001356068565b005b604080516001600160a01b03851681526001600160e01b03198416602082015280820183905290517fe80ec9f91d1f83dbb683dde1549001e03c729ac8d73c711d20879234bfa01f829181900360600190a150505056fea26469706673582212204fde82fe871e5af2597b890cb5c3da0184528048ebbeca414430d3614b3e30c064736f6c63430007040033";
