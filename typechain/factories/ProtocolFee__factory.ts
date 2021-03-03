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
    name: "MinProtocolFeeSetted",
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
    name: "ProtocolFeeSetted",
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
  "0x60806040523480156200001157600080fd5b506040516200103f3803806200103f8339810160408190526200003491620001d7565b600062000040620000a8565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506200009582620000ac565b620000a08162000146565b5050620002a0565b3390565b64e8d4a51000811015620000dd5760405162461bcd60e51b8152600401620000d490620001fb565b60405180910390fd5b6706f05b59d3b20000811115620001085760405162461bcd60e51b8152600401620000d49062000249565b7fe88294be50e7d33f8adaa86419ecbac7f2b98a5f2e514ee3224bf27d59c497118160405162000139919062000297565b60405180910390a1600155565b64e8d4a510008110156200016e5760405162461bcd60e51b8152600401620000d49062000220565b6706f05b59d3b20000811115620001995760405162461bcd60e51b8152600401620000d4906200026e565b7fcaff503a6ce909648d1384139922915ddce350fc0064616f417a882598fc4c0481604051620001ca919062000297565b60405180910390a1600255565b60008060408385031215620001ea578182fd5b505080516020909101519092909150565b6020808252600b908201526a4552525f4d494e5f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d494e5f4d494e5f46454560881b604082015260600190565b6020808252600b908201526a4552525f4d41585f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d41585f4d494e5f46454560881b604082015260600190565b90815260200190565b610d8f80620002b06000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638da5cb5b116100715780638da5cb5b1461012d578063b0e21e8a14610142578063bc063e1a1461014a578063c2ee3a0814610152578063e904e09d1461015a578063f2fde38b14610162576100b4565b80632ffcd73d146100b9578063715018a6146100ce57806376c7a3c7146100d6578063787dce3d146100f4578063848ed17f14610107578063886b91751461011a575b600080fd5b6100cc6100c7366004610bc7565b610175565b005b6100cc6101d9565b6100de61027b565b6040516100eb9190610ca7565b60405180910390f35b6100cc610102366004610bc7565b61028d565b6100de610115366004610af6565b6102ee565b6100de610128366004610b84565b6103f1565b610135610479565b6040516100eb9190610bf7565b6100de610488565b6100de61048e565b6100de61049e565b6100de6104aa565b6100cc610170366004610adc565b6104b0565b61017d6105a8565b6000546001600160a01b039081169116146101cd576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3a833981519152604482015290519081900360640190fd5b6101d6816105ac565b50565b6101e16105a8565b6000546001600160a01b03908116911614610231576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3a833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b620f4240670de0b6b3a76400005b0481565b6102956105a8565b6000546001600160a01b039081169116146102e5576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3a833981519152604482015290519081900360640190fd5b6101d68161063e565b600080805b84518110156103ae57600085828151811061030a57fe5b602002602001015160008151811061031e57fe5b602002602001015160600151905060005b86838151811061033b57fe5b6020026020010151518110156103a457600061038188858151811061035c57fe5b6020026020010151838151811061036f57fe5b602002602001015160000151846106c7565b905061038d8582610761565b945061039983826107c2565b92505060010161032f565b50506001016102f3565b506103e76103bb82610804565b6103e2670de0b6b3a76400006103dc8760025461082f90919063ffffffff16565b90610888565b6108ca565b9150505b92915050565b600080805b84518110156104535761044961044261043d87848151811061041457fe5b60200260200101516000015188858151811061042c57fe5b6020026020010151606001516106c7565b610804565b8390610761565b91506001016103f6565b506103e7816103e2670de0b6b3a76400006103dc8760025461082f90919063ffffffff16565b6000546001600160a01b031690565b60015481565b6002670de0b6b3a7640000610289565b670de0b6b3a764000081565b60025481565b6104b86105a8565b6000546001600160a01b03908116911614610508576040805162461bcd60e51b81526020600482018190526024820152600080516020610d3a833981519152604482015290519081900360640190fd5b6001600160a01b03811661054d5760405162461bcd60e51b8152600401808060200182810382526026815260200180610cf36026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b64e8d4a510008110156105da5760405162461bcd60e51b81526004016105d190610c30565b60405180910390fd5b6706f05b59d3b200008111156106025760405162461bcd60e51b81526004016105d190610c7e565b7fcaff503a6ce909648d1384139922915ddce350fc0064616f417a882598fc4c04816040516106319190610ca7565b60405180910390a1600255565b64e8d4a510008110156106635760405162461bcd60e51b81526004016105d190610c0b565b6706f05b59d3b2000081111561068b5760405162461bcd60e51b81526004016105d190610c59565b7fe88294be50e7d33f8adaa86419ecbac7f2b98a5f2e514ee3224bf27d59c49711816040516106ba9190610ca7565b60405180910390a1600155565b6000808390506000816001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b15801561070857600080fd5b505afa15801561071c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107409190610bdf565b9050610758670de0b6b3a76400006103dc838761082f565b95945050505050565b6000828201838110156107bb576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b60006107bb83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506108e1565b6000610827670de0b6b3a76400006103dc8460015461082f90919063ffffffff16565b90505b919050565b60008261083e575060006103eb565b8282028284828161084b57fe5b04146107bb5760405162461bcd60e51b8152600401808060200182810382526021815260200180610d196021913960400191505060405180910390fd5b60006107bb83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250610978565b6000818310156108da57816107bb565b5090919050565b600081848411156109705760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561093557818101518382015260200161091d565b50505050905090810190601f1680156109625780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600081836109c75760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561093557818101518382015260200161091d565b5060008385816109d357fe5b0495945050505050565b80356001600160a01b038116811461082a57600080fd5b600082601f830112610a04578081fd5b8135610a17610a1282610cd4565b610cb0565b818152915060208083019084810160c080850287018301881015610a3a57600080fd5b6000805b86811015610acf5782848b031215610a54578182fd5b6040805184810181811067ffffffffffffffff82111715610a7157fe5b8252610a7c866109dd565b8152610a898787016109dd565b87820152610a988287016109dd565b91810191909152606085810135908201526080808601359082015260a0808601359082015286529484019492820192600101610a3e565b5050505050505092915050565b600060208284031215610aed578081fd5b6107bb826109dd565b60008060408385031215610b08578081fd5b823567ffffffffffffffff811115610b1e578182fd5b8301601f81018513610b2e578182fd5b8035610b3c610a1282610cd4565b81815260208082019190848101865b85811015610b7457610b628b8484358a01016109f4565b85529382019390820190600101610b4b565b5091999701359750505050505050565b60008060408385031215610b96578182fd5b823567ffffffffffffffff811115610bac578283fd5b610bb8858286016109f4565b95602094909401359450505050565b600060208284031215610bd8578081fd5b5035919050565b600060208284031215610bf0578081fd5b5051919050565b6001600160a01b0391909116815260200190565b6020808252600b908201526a4552525f4d494e5f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d494e5f4d494e5f46454560881b604082015260600190565b6020808252600b908201526a4552525f4d41585f46454560a81b604082015260600190565b6020808252600f908201526e4552525f4d41585f4d494e5f46454560881b604082015260600190565b90815260200190565b60405181810167ffffffffffffffff81118282101715610ccc57fe5b604052919050565b600067ffffffffffffffff821115610ce857fe5b506020908102019056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220daed4293eabaccb343d35783a37ef00a93c2495890ecf240a8ff2a4ba2abbc2e64736f6c63430007040033";
