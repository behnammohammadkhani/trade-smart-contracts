/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BFactoryMock } from "../BFactoryMock";

export class BFactoryMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<BFactoryMock> {
    return super.deploy(overrides || {}) as Promise<BFactoryMock>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BFactoryMock {
    return super.attach(address) as BFactoryMock;
  }
  connect(signer: Signer): BFactoryMock__factory {
    return super.connect(signer) as BFactoryMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BFactoryMock {
    return new Contract(address, _abi, signerOrProvider) as BFactoryMock;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAuthorization",
        type: "address",
      },
    ],
    name: "AuthorizationSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "LOG_NEW_POOL",
    type: "event",
  },
  {
    inputs: [],
    name: "authorization",
    outputs: [
      {
        internalType: "contract IAuthorization",
        name: "",
        type: "address",
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
    ],
    name: "isBPool",
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
    inputs: [],
    name: "isBPoolAnswer",
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
    inputs: [],
    name: "newBPool",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authorization_",
        type: "address",
      },
    ],
    name: "setAuthorization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "answer",
        type: "bool",
      },
    ],
    name: "setIsBPoolAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805460ff60a01b1916905534801561001d57600080fd5b506103ac8061002d6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063025c126e146100675780630dade6441461008f5780633817c86c146100ae578063c2bb6dc2146100d2578063d556c5dc1461010c578063f8963c6c14610114575b600080fd5b61008d6004803603602081101561007d57600080fd5b50356001600160a01b031661011c565b005b61008d600480360360208110156100a557600080fd5b5035151561013e565b6100b661015c565b604080516001600160a01b039092168252519081900360200190f35b6100f8600480360360208110156100e857600080fd5b50356001600160a01b031661016b565b604080519115158252519081900360200190f35b6100f861017c565b6100f8610323565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b60008054911515600160a01b0260ff60a01b19909216919091179055565b6000546001600160a01b031681565b50600054600160a01b900460ff1690565b600080546001600160a01b0316635c50893a610196610333565b306000356001600160e01b0319166101ac610337565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561022657818101518382015260200161020e565b50505050905090810190601f1680156102535780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561027557600080fd5b505af1158015610289573d6000803e3d6000fd5b505050506040513d602081101561029f57600080fd5b50516102f2576040805162461bcd60e51b815260206004820152601c60248201527f417574686f72697a61626c653a206e6f7420617574686f72697a656400000000604482015290519081900360640190fd5b60405133907f9177eb5e39ca21b84d8f230345af051b6a6fedc627dd732e3cb3b94670125ceb90600090a250600190565b600054600160a01b900460ff1681565b3390565b60606000368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293505050509056fea264697066735822122050542ba1e0b9668380e0d32a8568fc21a99836af6a944b54c7323356b08ab2d164736f6c63430007040033";
