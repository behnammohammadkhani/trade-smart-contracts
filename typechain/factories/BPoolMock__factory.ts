/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BPoolMock } from "../BPoolMock";

export class BPoolMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<BPoolMock> {
    return super.deploy(overrides || {}) as Promise<BPoolMock>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BPoolMock {
    return super.attach(address) as BPoolMock;
  }
  connect(signer: Signer): BPoolMock__factory {
    return super.connect(signer) as BPoolMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BPoolMock {
    return new Contract(address, _abi, signerOrProvider) as BPoolMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenBalanceIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenWeightIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenBalanceOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenWeightOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "calcInGivenOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenBalanceIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenWeightIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenBalanceOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenWeightOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "calcOutGivenIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getBalance",
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
        name: "token",
        type: "address",
      },
    ],
    name: "getDenormalizedWeight",
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
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPrice",
        type: "uint256",
      },
    ],
    name: "swapExactAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxAmountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPrice",
        type: "uint256",
      },
    ],
    name: "swapExactAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
  "0x608060405234801561001057600080fd5b5061021c806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063ba9530a61161005b578063ba9530a6146100cc578063d4cadf68146100df578063f8b2cb4f146100ac578063f8d6aed4146100cc5761007d565b80637c5e9ea4146100825780638201aa3f14610082578063948d8ce6146100ac575b600080fd5b610095610090366004610140565b6100e7565b6040516100a39291906101d8565b60405180910390f35b6100bf6100ba36600461011f565b6100f2565b6040516100a391906101cf565b6100bf6100da36600461018d565b6100fa565b6100bf610103565b509360019350915050565b60015b919050565b50949350505050565b600190565b80356001600160a01b03811681146100f557600080fd5b600060208284031215610130578081fd5b61013982610108565b9392505050565b600080600080600060a08688031215610157578081fd5b61016086610108565b94506020860135935061017560408701610108565b94979396509394606081013594506080013592915050565b60008060008060008060c087890312156101a5578081fd5b505084359660208601359650604086013595606081013595506080810135945060a0013592509050565b90815260200190565b91825260208201526040019056fea2646970667358221220df80d0bfd3ddb6f097f55b02f447a93a23b83fb9a9260a364ae7b57c52c9320664736f6c63430007040033";
