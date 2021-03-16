/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { AuthorizationMock } from "../AuthorizationMock";

export class AuthorizationMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _authorized: boolean,
    overrides?: Overrides
  ): Promise<AuthorizationMock> {
    return super.deploy(
      _authorized,
      overrides || {}
    ) as Promise<AuthorizationMock>;
  }
  getDeployTransaction(
    _authorized: boolean,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_authorized, overrides || {});
  }
  attach(address: string): AuthorizationMock {
    return super.attach(address) as AuthorizationMock;
  }
  connect(signer: Signer): AuthorizationMock__factory {
    return super.connect(signer) as AuthorizationMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AuthorizationMock {
    return new Contract(address, _abi, signerOrProvider) as AuthorizationMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "bool",
        name: "_authorized",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "authorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "isAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_authorized",
        type: "bool",
      },
    ],
    name: "setAuthorized",
    outputs: [],
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
    name: "setEurPriceFeed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
    name: "setOperationsRegistry",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
    name: "setPermissions",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "setTradingLimint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161025a38038061025a8339818101604052602081101561003357600080fd5b50516000805491151560ff19909216919091179055610203806100576000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80635c50893a1161005b5780635c50893a146100e5578063728daa56146100bf5780639b00f17f146100bf578063d379a0d91461017f5761007d565b80633b04e2a314610082578063456cb7c6146100a3578063456d28d9146100bf575b600080fd5b6100a16004803603602081101561009857600080fd5b5035151561019c565b005b6100ab6101af565b604080519115158252519081900360200190f35b6100ab600480360360208110156100d557600080fd5b50356001600160a01b03166101b8565b6100ab600480360360808110156100fb57600080fd5b6001600160a01b0382358116926020810135909116916001600160e01b0319604083013516919081019060808101606082013564010000000081111561014057600080fd5b82018360208201111561015257600080fd5b8035906020019184600183028401116401000000008311171561017457600080fd5b5090925090506101be565b6100ab6004803603602081101561019557600080fd5b50356101b8565b6000805460ff1916911515919091179055565b60005460ff1681565b50600190565b60005460ff169594505050505056fea2646970667358221220c58935aa26ef9b67e1a4b1079652e80940c831d97bb11be63f093b494e27b06d64736f6c63430007040033";
