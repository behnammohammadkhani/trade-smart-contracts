/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { UTokenPriceFeedMock } from "../UTokenPriceFeedMock";

export class UTokenPriceFeedMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<UTokenPriceFeedMock> {
    return super.deploy(overrides || {}) as Promise<UTokenPriceFeedMock>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UTokenPriceFeedMock {
    return super.attach(address) as UTokenPriceFeedMock;
  }
  connect(signer: Signer): UTokenPriceFeedMock__factory {
    return super.connect(signer) as UTokenPriceFeedMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UTokenPriceFeedMock {
    return new Contract(address, _abi, signerOrProvider) as UTokenPriceFeedMock;
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
    name: "getPrice",
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
    name: "noPrice",
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
        name: "_noPrice",
        type: "bool",
      },
    ],
    name: "setNoPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805460ff1916905534801561001a57600080fd5b5061017d8061002a6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806329550f971461005157806341976e091461008f578063b066bc79146100b5578063bacc7930146100d1575b600080fd5b61007d6004803603604081101561006757600080fd5b506001600160a01b0381351690602001356100f2565b60408051918252519081900360200190f35b61007d600480360360208110156100a557600080fd5b50356001600160a01b031661010d565b6100bd61012b565b604080519115158252519081900360200190f35b6100f0600480360360208110156100e757600080fd5b50351515610134565b005b6000805460ff166101035781610106565b60005b9392505050565b6000805460ff1661011f576001610122565b60005b60ff1692915050565b60005460ff1681565b6000805460ff191691151591909117905556fea264697066735822122000ba1fb38d4b7b37a88c71cdea71746e51e20abb16186b70b25a9de9cf91f81b64736f6c63430007040033";