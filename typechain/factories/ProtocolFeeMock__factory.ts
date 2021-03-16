/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ProtocolFeeMock } from "../ProtocolFeeMock";

export class ProtocolFeeMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    protocolFeeAmount: BigNumberish,
    overrides?: Overrides
  ): Promise<ProtocolFeeMock> {
    return super.deploy(
      protocolFeeAmount,
      overrides || {}
    ) as Promise<ProtocolFeeMock>;
  }
  getDeployTransaction(
    protocolFeeAmount: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(protocolFeeAmount, overrides || {});
  }
  attach(address: string): ProtocolFeeMock {
    return super.attach(address) as ProtocolFeeMock;
  }
  connect(signer: Signer): ProtocolFeeMock__factory {
    return super.connect(signer) as ProtocolFeeMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFeeMock {
    return new Contract(address, _abi, signerOrProvider) as ProtocolFeeMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "protocolFeeAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "struct ISwap.Swap[]",
        name: "",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "",
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
        name: "",
        type: "tuple[][]",
      },
      {
        internalType: "uint256",
        name: "",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "protocolFeeAmount",
        type: "uint256",
      },
    ],
    name: "setPotocolFeeAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161037738038061037783398101604081905261002f91610043565b6100388161003e565b5061005b565b600055565b600060208284031215610054578081fd5b5051919050565b61030d8061006a6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806331de1b1014610046578063848ed17f1461005b578063886b917514610084575b600080fd5b610059610054366004610274565b610092565b005b61006e6100693660046101a3565b610097565b60405161007b919061028c565b60405180910390f35b61006e610069366004610231565b600055565b505060005490565b80356001600160a01b03811681146100b657600080fd5b919050565b600082601f8301126100cb578081fd5b81356100de6100d9826102b9565b610295565b818152915060208083019084810160c08085028701830188101561010157600080fd5b6000805b868110156101965782848b03121561011b578182fd5b6040805184810181811067ffffffffffffffff8211171561013857fe5b82526101438661009f565b815261015087870161009f565b8782015261015f82870161009f565b91810191909152606085810135908201526080808601359082015260a0808601359082015286529484019492820192600101610105565b5050505050505092915050565b600080604083850312156101b5578182fd5b823567ffffffffffffffff8111156101cb578283fd5b8301601f810185136101db578283fd5b80356101e96100d9826102b9565b81815260208082019190848101875b858110156102215761020f8b8484358a01016100bb565b855293820193908201906001016101f8565b5091999701359750505050505050565b60008060408385031215610243578182fd5b823567ffffffffffffffff811115610259578283fd5b610265858286016100bb565b95602094909401359450505050565b600060208284031215610285578081fd5b5035919050565b90815260200190565b60405181810167ffffffffffffffff811182821017156102b157fe5b604052919050565b600067ffffffffffffffff8211156102cd57fe5b506020908102019056fea2646970667358221220c0947cbccb57c741390d8406df7c12d1a703dfaa08f4bf96d7128af269064f3864736f6c63430007040033";
