/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ProtocolFee } from "../ProtocolFee";

export class ProtocolFee__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _protocolFee: BigNumberish,
    _minProtocolFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ProtocolFee> {
    return super.deploy(
      _protocolFee,
      _minProtocolFee,
      overrides || {}
    ) as Promise<ProtocolFee>;
  }
  getDeployTransaction(
    _protocolFee: BigNumberish,
    _minProtocolFee: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _protocolFee,
      _minProtocolFee,
      overrides || {}
    );
  }
  attach(address: string): ProtocolFee {
    return super.attach(address) as ProtocolFee;
  }
  connect(signer: Signer): ProtocolFee__factory {
    return super.connect(signer) as ProtocolFee__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFee {
    return new Contract(address, _abi, signerOrProvider) as ProtocolFee;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_protocolFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minProtocolFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minProtocolFee",
        type: "uint256",
      },
    ],
    name: "MinProtocolFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "protocolFee",
        type: "uint256",
      },
    ],
    name: "ProtocolFeeSet",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_FEE",
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
    name: "MIN_FEE",
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
    name: "ONE",
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
        internalType: "struct ISwap.Swap[]",
        name: "swaps",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "totalAmountIn",
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
    inputs: [],
    name: "minProtocolFee",
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
        name: "totalAmountIn",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolFee",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minProtocolFee",
        type: "uint256",
      },
    ],
    name: "setMinProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_protocolFee",
        type: "uint256",
      },
    ],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001044380380620010448339810160408190526200003491620001d7565b600062000040620000a8565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506200009582620000ac565b620000a08162000146565b5050620002a0565b3390565b64e8d4a51000811015620000dd5760405162461bcd60e51b8152600401620000d490620001fb565b60405180910390fd5b6706f05b59d3b20000811115620001085760405162461bcd60e51b8152600401620000d49062000249565b7fdb5aafdb29539329e37d4e3ee869bc4031941fd55a5dfc92824fbe34b204e30d8160405162000139919062000297565b60405180910390a1600155565b64e8d4a510008110156200016e5760405162461bcd60e51b8152600401620000d49062000220565b6706f05b59d3b20000811115620001995760405162461bcd60e51b8152600401620000d4906200026e565b7f6d02e4f833e90d94cee67e82fd2e3dbf7d61c2eb9a3f063332791f56ee5ebb0881604051620001ca919062000297565b60405180910390a1600255565b60008060408385031215620001ea578182fd5b505080516020909101519092909150565b6020808252600b908201526a4552525f4d494e5f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d494e5f4d494e5f46454560881b604082015260600190565b6020808252600b908201526a4552525f4d41585f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d41585f4d494e5f46454560881b604082015260600190565b90815260200190565b610d9480620002b06000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638da5cb5b116100715780638da5cb5b1461012d578063b0e21e8a14610142578063bc063e1a1461014a578063c2ee3a0814610152578063e904e09d1461015a578063f2fde38b14610162576100b4565b80632ffcd73d146100b9578063715018a6146100ce57806376c7a3c7146100d6578063787dce3d146100f4578063848ed17f14610107578063886b91751461011a575b600080fd5b6100cc6100c7366004610bcc565b610175565b005b6100cc6101d9565b6100de61027b565b6040516100eb9190610cac565b60405180910390f35b6100cc610102366004610bcc565b61028d565b6100de610115366004610afb565b6102ee565b6100de610128366004610b89565b6103f1565b610135610487565b6040516100eb9190610bfc565b6100de610496565b6100de61049c565b6100de6104ac565b6100de6104b8565b6100cc610170366004610ae1565b6104be565b61017d6105b6565b6000546001600160a01b039081169116146101cd576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3f833981519152604482015290519081900360640190fd5b6101d6816105ba565b50565b6101e16105b6565b6000546001600160a01b03908116911614610231576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3f833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b620f4240670de0b6b3a76400005b0481565b6102956105b6565b6000546001600160a01b039081169116146102e5576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3f833981519152604482015290519081900360640190fd5b6101d68161064c565b600080805b84518110156103ae57600085828151811061030a57fe5b602002602001015160008151811061031e57fe5b602002602001015160600151905060005b86838151811061033b57fe5b6020026020010151518110156103a457600061038188858151811061035c57fe5b6020026020010151838151811061036f57fe5b602002602001015160000151846106d5565b905061038d8582610766565b945061039983826107c7565b92505060010161032f565b50506001016102f3565b506103e76103bb82610809565b6103e2670de0b6b3a76400006103dc8760025461083490919063ffffffff16565b9061088d565b6108cf565b9150505b92915050565b600080805b845181101561044b5761044161043a86838151811061041157fe5b60200260200101516000015187848151811061042957fe5b6020026020010151606001516106d5565b8390610766565b91506001016103f6565b50600061045782610809565b905061047e816103e2670de0b6b3a76400006103dc8860025461083490919063ffffffff16565b95945050505050565b6000546001600160a01b031690565b60015481565b6002670de0b6b3a7640000610289565b670de0b6b3a764000081565b60025481565b6104c66105b6565b6000546001600160a01b03908116911614610516576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3f833981519152604482015290519081900360640190fd5b6001600160a01b03811661055b5760405162461bcd60e51b8152600401808060200182810382526026815260200180610cf86026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b64e8d4a510008110156105e85760405162461bcd60e51b81526004016105df90610c35565b60405180910390fd5b6706f05b59d3b200008111156106105760405162461bcd60e51b81526004016105df90610c83565b7f6d02e4f833e90d94cee67e82fd2e3dbf7d61c2eb9a3f063332791f56ee5ebb088160405161063f9190610cac565b60405180910390a1600255565b64e8d4a510008110156106715760405162461bcd60e51b81526004016105df90610c10565b6706f05b59d3b200008111156106995760405162461bcd60e51b81526004016105df90610c5e565b7fdb5aafdb29539329e37d4e3ee869bc4031941fd55a5dfc92824fbe34b204e30d816040516106c89190610cac565b60405180910390a1600155565b6000808390506000816001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b15801561071657600080fd5b505afa15801561072a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074e9190610be4565b905061047e670de0b6b3a76400006103dc8387610834565b6000828201838110156107c0576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b60006107c083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506108e6565b600061082c670de0b6b3a76400006103dc8460015461083490919063ffffffff16565b90505b919050565b600082610843575060006103eb565b8282028284828161085057fe5b04146107c05760405162461bcd60e51b8152600401808060200182810382526021815260200180610d1e6021913960400191505060405180910390fd5b60006107c083836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061097d565b6000818310156108df57816107c0565b5090919050565b600081848411156109755760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561093a578181015183820152602001610922565b50505050905090810190601f1680156109675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600081836109cc5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561093a578181015183820152602001610922565b5060008385816109d857fe5b0495945050505050565b80356001600160a01b038116811461082f57600080fd5b600082601f830112610a09578081fd5b8135610a1c610a1782610cd9565b610cb5565b818152915060208083019084810160c080850287018301881015610a3f57600080fd5b6000805b86811015610ad45782848b031215610a59578182fd5b6040805184810181811067ffffffffffffffff82111715610a7657fe5b8252610a81866109e2565b8152610a8e8787016109e2565b87820152610a9d8287016109e2565b91810191909152606085810135908201526080808601359082015260a0808601359082015286529484019492820192600101610a43565b5050505050505092915050565b600060208284031215610af2578081fd5b6107c0826109e2565b60008060408385031215610b0d578081fd5b823567ffffffffffffffff811115610b23578182fd5b8301601f81018513610b33578182fd5b8035610b41610a1782610cd9565b81815260208082019190848101865b85811015610b7957610b678b8484358a01016109f9565b85529382019390820190600101610b50565b5091999701359750505050505050565b60008060408385031215610b9b578182fd5b823567ffffffffffffffff811115610bb1578283fd5b610bbd858286016109f9565b95602094909401359450505050565b600060208284031215610bdd578081fd5b5035919050565b600060208284031215610bf5578081fd5b5051919050565b6001600160a01b0391909116815260200190565b6020808252600b908201526a4552525f4d494e5f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d494e5f4d494e5f46454560881b604082015260600190565b6020808252600b908201526a4552525f4d41585f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d41585f4d494e5f46454560881b604082015260600190565b90815260200190565b60405181810167ffffffffffffffff81118282101715610cd157fe5b604052919050565b600067ffffffffffffffff821115610ced57fe5b506020908102019056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a264697066735822122077302353aad757f14248a766daea92446bb96c93d5c5a1527c01713eed4af54964736f6c63430007040033";
