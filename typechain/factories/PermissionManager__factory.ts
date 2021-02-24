/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PermissionManager } from "../PermissionManager";

export class PermissionManager__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<PermissionManager> {
    return super.deploy(overrides || {}) as Promise<PermissionManager>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PermissionManager {
    return super.attach(address) as PermissionManager;
  }
  connect(signer: Signer): PermissionManager__factory {
    return super.connect(signer) as PermissionManager__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PermissionManager {
    return new Contract(address, _abi, signerOrProvider) as PermissionManager;
  }
}

const _abi = [
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
        indexed: true,
        internalType: "address",
        name: "newPermissions",
        type: "address",
      },
    ],
    name: "PermissionItemsSetted",
    type: "event",
  },
  {
    inputs: [],
    name: "SUSPENDED_ID",
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
    name: "TIER_1_ID",
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
    name: "TIER_2_ID",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "assingTier1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "assingTier2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "hasTier1",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "hasTier2",
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
        name: "_permissionItems",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isSuspended",
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
    name: "permissionItems",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "revokeTier1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "revokeTier2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_permissionItems",
        type: "address",
      },
    ],
    name: "setPermissionItems",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "suspendUser",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_proxy",
        type: "address",
      },
    ],
    name: "unsuspendUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506118bd806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638da5cb5b116100a2578063d5222bf011610071578063d5222bf0146102fd578063d88a89511461032b578063d9d7b47214610351578063f2fde38b14610359578063fc8a53641461037f57610116565b80638da5cb5b1461027d57806391836b3d146102a1578063c4d66de8146102cf578063c6b6c17a146102f557610116565b80632d703a09116100e95780632d703a09146101d957806330c76bf7146101f3578063715018a61461022157806382e672d614610229578063887e7a601461024f57610116565b806312bdaf501461011b57806318dc8bed1461014b578063232e0e9a14610185578063299ebf7a146101ab575b600080fd5b6101496004803603604081101561013157600080fd5b506001600160a01b0381358116916020013516610387565b005b6101716004803603602081101561016157600080fd5b50356001600160a01b031661055f565b604080519115158252519081900360200190f35b6101716004803603602081101561019b57600080fd5b50356001600160a01b0316610657565b610149600480360360408110156101c157600080fd5b506001600160a01b038135811691602001351661066a565b6101e1610829565b60408051918252519081900360200190f35b6101496004803603604081101561020957600080fd5b506001600160a01b038135811691602001351661082e565b610149610a07565b6101716004803603602081101561023f57600080fd5b50356001600160a01b0316610aa9565b6101496004803603604081101561026557600080fd5b506001600160a01b0381358116916020013516610ab6565b610285610c75565b604080516001600160a01b039092168252519081900360200190f35b610149600480360360408110156102b757600080fd5b506001600160a01b0381358116916020013516610c84565b610149600480360360208110156102e557600080fd5b50356001600160a01b0316610e5d565b6101e1610f9f565b6101496004803603604081101561031357600080fd5b506001600160a01b0381358116916020013516610fa4565b6101716004803603602081101561034157600080fd5b50356001600160a01b031661117d565b6101e161118a565b6101496004803603602081101561036f57600080fd5b50356001600160a01b031661118f565b610285611288565b61038f611297565b6033546001600160a01b039081169116146103df576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b6103e882610657565b6104235760405162461bcd60e51b81526004018080602001828103825260358152602001806117b56035913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03858116600483015260006024830181905260016044840152925193169263f5298aca9260648084019391929182900301818387803b15801561047d57600080fd5b505af1158015610491573d6000803e3d6000fd5b505050506001600160a01b0381161561055b576104ad81610657565b6104e85760405162461bcd60e51b81526004018080602001828103825260338152602001806116676033913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03848116600483015260006024830181905260016044840152925193169263f5298aca9260648084019391929182900301818387803b15801561054257600080fd5b505af1158015610556573d6000803e3d6000fd5b505050505b5050565b6000610569611297565b6033546001600160a01b039081169116146105b9576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b6001600160a01b0382166105fe5760405162461bcd60e51b81526004018080602001828103825260248152602001806115d76024913960400191505060405180910390fd5b6040516001600160a01b038316907f5cf3ee68ff962dbb278fe94313961466b214821783222e46baeb069cb1a59bff90600090a250606580546001600160a01b0383166001600160a01b03199091161790556001919050565b600061066482600061129b565b92915050565b610672611297565b6033546001600160a01b039081169116146106c2576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b6106cb8261117d565b6107065760405162461bcd60e51b81526004018080602001828103825260368152602001806115fb6036913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03858116600483015260016024830181905260448301529151919092169163f5298aca91606480830192600092919082900301818387803b15801561076257600080fd5b505af1158015610776573d6000803e3d6000fd5b505050506001600160a01b0381161561055b576107928161117d565b6107cd5760405162461bcd60e51b81526004018080602001828103825260348152602001806117526034913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03848116600483015260016024830181905260448301529151919092169163f5298aca91606480830192600092919082900301818387803b15801561054257600080fd5b600281565b610836611297565b6033546001600160a01b03908116911614610886576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b61088f8261117d565b156108cb5760405162461bcd60e51b81526004018080602001828103825260368152602001806118526036913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038581166004830152600160248301819052604483015260806064830152600060848301819052925193169263731133e99260c48084019391929182900301818387803b15801561093357600080fd5b505af1158015610947573d6000803e3d6000fd5b505050506001600160a01b0381161561055b576109638161117d565b1561099f5760405162461bcd60e51b81526004018080602001828103825260348152602001806117ea6034913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038481166004830152600160248301819052604483015260806064830152600060848301819052925193169263731133e99260c48084019391929182900301818387803b15801561054257600080fd5b610a0f611297565b6033546001600160a01b03908116911614610a5f576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b600061066482600261129b565b610abe611297565b6033546001600160a01b03908116911614610b0e576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b610b1782610aa9565b610b525760405162461bcd60e51b815260040180806020018281038252603681526020018061169a6036913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03858116600483015260026024830152600160448301529151919092169163f5298aca91606480830192600092919082900301818387803b158015610bae57600080fd5b505af1158015610bc2573d6000803e3d6000fd5b505050506001600160a01b0381161561055b57610bde81610aa9565b610c195760405162461bcd60e51b81526004018080602001828103825260348152602001806116fe6034913960400191505060405180910390fd5b60655460408051637a94c56560e11b81526001600160a01b03848116600483015260026024830152600160448301529151919092169163f5298aca91606480830192600092919082900301818387803b15801561054257600080fd5b6033546001600160a01b031690565b610c8c611297565b6033546001600160a01b03908116911614610cdc576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b610ce582610657565b15610d215760405162461bcd60e51b815260040180806020018281038252602f815260200180611786602f913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038581166004830152600060248301819052600160448401526080606484015260848301819052925193169263731133e99260c48084019391929182900301818387803b158015610d8957600080fd5b505af1158015610d9d573d6000803e3d6000fd5b505050506001600160a01b0381161561055b57610db981610657565b15610df55760405162461bcd60e51b815260040180806020018281038252602d815260200180611584602d913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038481166004830152600060248301819052600160448401526080606484015260848301819052925193169263731133e99260c48084019391929182900301818387803b15801561054257600080fd5b600054610100900460ff1680610e765750610e76611332565b80610e84575060005460ff16155b610ebf5760405162461bcd60e51b815260040180806020018281038252602e8152602001806116d0602e913960400191505060405180910390fd5b600054610100900460ff16158015610eea576000805460ff1961ff0019909116610100171660011790555b6001600160a01b038216610f2f5760405162461bcd60e51b81526004018080602001828103825260248152602001806115d76024913960400191505060405180910390fd5b606580546001600160a01b0319166001600160a01b038416179055610f52611338565b6065546040516001600160a01b03909116907f5cf3ee68ff962dbb278fe94313961466b214821783222e46baeb069cb1a59bff90600090a2801561055b576000805461ff00191690555050565b600181565b610fac611297565b6033546001600160a01b03908116911614610ffc576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b61100582610aa9565b156110415760405162461bcd60e51b81526004018080602001828103825260368152602001806116316036913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038581166004830152600260248301526001604483015260806064830152600060848301819052925193169263731133e99260c48084019391929182900301818387803b1580156110a957600080fd5b505af11580156110bd573d6000803e3d6000fd5b505050506001600160a01b0381161561055b576110d981610aa9565b156111155760405162461bcd60e51b815260040180806020018281038252603481526020018061181e6034913960400191505060405180910390fd5b6065546040805163731133e960e01b81526001600160a01b038481166004830152600260248301526001604483015260806064830152600060848301819052925193169263731133e99260c48084019391929182900301818387803b15801561054257600080fd5b600061066482600161129b565b600081565b611197611297565b6033546001600160a01b039081169116146111e7576040805162461bcd60e51b81526020600482018190526024820152600080516020611732833981519152604482015290519081900360640190fd5b6001600160a01b03811661122c5760405162461bcd60e51b81526004018080602001828103825260268152602001806115b16026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b6065546001600160a01b031681565b3390565b60655460408051627eeac760e11b81526001600160a01b038581166004830152602482018590529151600093929092169162fdd58e91604480820192602092909190829003018186803b1580156112f157600080fd5b505afa158015611305573d6000803e3d6000fd5b505050506040513d602081101561131b57600080fd5b505161132957506000610664565b50600192915050565b303b1590565b600054610100900460ff16806113515750611351611332565b8061135f575060005460ff16155b61139a5760405162461bcd60e51b815260040180806020018281038252602e8152602001806116d0602e913960400191505060405180910390fd5b600054610100900460ff161580156113c5576000805460ff1961ff0019909116610100171660011790555b6113cd6113ea565b6113d561148a565b80156113e7576000805461ff00191690555b50565b600054610100900460ff16806114035750611403611332565b80611411575060005460ff16155b61144c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806116d0602e913960400191505060405180910390fd5b600054610100900460ff161580156113d5576000805460ff1961ff00199091166101001716600117905580156113e7576000805461ff001916905550565b600054610100900460ff16806114a357506114a3611332565b806114b1575060005460ff16155b6114ec5760405162461bcd60e51b815260040180806020018281038252602e8152602001806116d0602e913960400191505060405180910390fd5b600054610100900460ff16158015611517576000805460ff1961ff0019909116610100171660011790555b6000611521611297565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156113e7576000805461ff00191690555056fe5065726d697373696f6e4d616e616765723a2050726f787920697320616c72656164792073757370656e6465644f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735f7065726d697373696f6e4974656d7320697320746865207a65726f20616464726573735065726d697373696f6e4d616e616765723a204164647265737320646f65736e277420686173205469657220312061737369676e65645065726d697373696f6e4d616e616765723a204164647265737320616c726561647920686173205469657220322061737369676e65645065726d697373696f6e4d616e616765723a2050726f7879206973206e6f742063757272656e746c792073757370656e6465645065726d697373696f6e4d616e616765723a204164647265737320646f65736e277420686173205469657220322061737369676e6564496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a65645065726d697373696f6e4d616e616765723a2050726f787920646f65736e277420686173205469657220322061737369676e65644f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65725065726d697373696f6e4d616e616765723a2050726f787920646f65736e277420686173205469657220312061737369676e65645065726d697373696f6e4d616e616765723a204164647265737320697320616c72656164792073757370656e6465645065726d697373696f6e4d616e616765723a2041646472657373206973206e6f742063757272656e746c792073757370656e6465645065726d697373696f6e4d616e616765723a2050726f787920616c726561647920686173205469657220312061737369676e65645065726d697373696f6e4d616e616765723a2050726f787920616c726561647920686173205469657220322061737369676e65645065726d697373696f6e4d616e616765723a204164647265737320616c726561647920686173205469657220312061737369676e6564a26469706673582212209d7539d0841a2d246bc41b286c6711344901ae08b26c5a9159067ade8933305564736f6c63430007040033";
