/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Authorization } from "../Authorization";

export class Authorization__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Authorization> {
    return super.deploy(overrides || {}) as Promise<Authorization>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Authorization {
    return super.attach(address) as Authorization;
  }
  connect(signer: Signer): Authorization__factory {
    return super.connect(signer) as Authorization__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Authorization {
    return new Contract(address, _abi, signerOrProvider) as Authorization;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newEurPriceFeed",
        type: "address",
      },
    ],
    name: "EurPriceFeedSetted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOperationsRegistry",
        type: "address",
      },
    ],
    name: "OperationsRegistrySetted",
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
        indexed: true,
        internalType: "address",
        name: "newPermissions",
        type: "address",
      },
    ],
    name: "PermissionsSetted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLimit",
        type: "uint256",
      },
    ],
    name: "TradingLimitSetted",
    type: "event",
  },
  {
    inputs: [],
    name: "ERC20_APPROVE",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC20_BURN_FROM",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC20_MINT",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC20_TRANSFER",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC20_TRANSFER_FROM",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
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
    inputs: [],
    name: "eurPriceFeed",
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
    inputs: [
      {
        internalType: "address",
        name: "_permissions",
        type: "address",
      },
      {
        internalType: "address",
        name: "_eurPriceFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_operationsRegistry",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tradingLimit",
        type: "uint256",
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
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_operation",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "_data",
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
    inputs: [],
    name: "operationsRegistry",
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
    name: "permissions",
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
        name: "_eurPriceFeed",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operationsRegistry",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_permissions",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradingLimit",
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tradingLimit",
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
  "0x608060405234801561001057600080fd5b5061161d806100206000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80639c008673116100ad578063cf91d79a11610071578063cf91d79a1461032a578063d379a0d914610332578063e7592c601461034f578063ee98faf114610357578063f2fde38b1461035f5761012c565b80639c008673146102ce578063ab8c71c0146102d6578063c6b6c17a146102de578063c7740121146102e6578063cf756fdf146102ee5761012c565b8063632d877c116100f4578063632d877c1461024c578063715018a614610254578063728daa561461025e5780638da5cb5b146102845780639b00f17f146102a85761012c565b806316967a10146101315780632d703a09146101565780633cd0ad0b14610170578063456d28d9146101785780635c50893a146101b2575b600080fd5b610139610385565b604080516001600160e01b03199092168252519081900360200190f35b61015e6103a9565b60408051918252519081900360200190f35b61015e6103ae565b61019e6004803603602081101561018e57600080fd5b50356001600160a01b03166103b4565b604080519115158252519081900360200190f35b61019e600480360360808110156101c857600080fd5b6001600160a01b0382358116926020810135909116916001600160e01b0319604083013516919081019060808101606082013564010000000081111561020d57600080fd5b82018360208201111561021f57600080fd5b8035906020019184600183028401116401000000008311171561024157600080fd5b5090925090506104ac565b61013961065c565b61025c610680565b005b61019e6004803603602081101561027457600080fd5b50356001600160a01b0316610722565b61028c61081a565b604080516001600160a01b039092168252519081900360200190f35b61019e600480360360208110156102be57600080fd5b50356001600160a01b0316610829565b61028c610921565b61028c610930565b61015e61093f565b610139610944565b61025c6004803603608081101561030457600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135610968565b610139610bfc565b61019e6004803603602081101561034857600080fd5b5035610c20565b61028c610cfd565b610139610d0c565b61025c6004803603602081101561037557600080fd5b50356001600160a01b0316610d30565b7fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b81565b600281565b60685481565b60006103be610e29565b6033546001600160a01b0390811691161461040e576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b6001600160a01b0382166104535760405162461bcd60e51b81526004018080602001828103825260238152602001806115316023913960400191505060405180910390fd5b6040516001600160a01b038316907fbff2119d06e0f2b11a0132f0264e61554a930f0113f77cc9fbf9bba23baca86390600090a250606580546001600160a01b0383166001600160a01b03199091161790556001919050565b60006001600160e01b0319841663a9059cbb60e01b14806104dd57506001600160e01b031984166323b872dd60e01b145b806104f857506001600160e01b031984166340c10f1960e01b145b8061051357506001600160e01b0319841663079cc67960e41b145b1561064f57858460006001600160e01b031982166340c10f1960e01b148061054b57506001600160e01b0319871663079cc67960e41b145b1561058557600080610560876004818b6114e2565b604081101561056e57600080fd5b506001600160a01b03813516955060200135925050505b6001600160e01b0319871663a9059cbb60e01b14156105c6576000806105ae876004818b6114e2565b60408110156105bc57600080fd5b5060200135925050505b6001600160e01b031987166323b872dd60e01b141561063957600080806105f0886004818c6114e2565b60608110156105fe57600080fd5b506001600160a01b0381351696507fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b95506040013593505050505b61064583898484610e2d565b9350505050610653565b5060005b95945050505050565b7f23b872dd7302113369cda2901243429419bec145408fa8b352b3dd92b66c680b81565b610688610e29565b6033546001600160a01b039081169116146106d8576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b600061072c610e29565b6033546001600160a01b0390811691161461077c576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b6001600160a01b0382166107c15760405162461bcd60e51b81526004018080602001828103825260248152602001806115c46024913960400191505060405180910390fd5b6040516001600160a01b038316907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a250606780546001600160a01b0383166001600160a01b03199091161790556001919050565b6033546001600160a01b031690565b6000610833610e29565b6033546001600160a01b03908116911614610883576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b6001600160a01b0382166108c85760405162461bcd60e51b81526004018080602001828103825260228152602001806115546022913960400191505060405180910390fd5b6040516001600160a01b038316907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a250606680546001600160a01b0383166001600160a01b03199091161790556001919050565b6067546001600160a01b031681565b6065546001600160a01b031681565b600181565b7f79cc679044ee9a2021f0a26c0fdec02ac39179cd005bb971a471b7f9f17c576c81565b600054610100900460ff16806109815750610981611230565b8061098f575060005460ff16155b6109ca5760405162461bcd60e51b815260040180806020018281038252602e815260200180611576602e913960400191505060405180910390fd5b600054610100900460ff161580156109f5576000805460ff1961ff0019909116610100171660011790555b6001600160a01b038516610a3a5760405162461bcd60e51b81526004018080602001828103825260238152602001806115316023913960400191505060405180910390fd5b6001600160a01b038416610a7f5760405162461bcd60e51b81526004018080602001828103825260228152602001806115546022913960400191505060405180910390fd5b81610ac6576040805162461bcd60e51b8152602060048201526012602482015271074726164696e67206c696d697420697320360741b604482015290519081900360640190fd5b606580546001600160a01b038088166001600160a01b0319928316179092556066805487841690831617905560678054928616929091169190911790556068829055610b10611236565b6065546040516001600160a01b03909116907fbff2119d06e0f2b11a0132f0264e61554a930f0113f77cc9fbf9bba23baca86390600090a26040516001600160a01b038516907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a26040516001600160a01b038416907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a26040805183815290517f8170ba631b67fd88957dab2403b6fbb84c89a338bdfda451038014f2f72f01c79181900360200190a18015610bf5576000805461ff00191690555b5050505050565b7f40c10f19c047ae7dfa66d6312b683d2ea3dfbcb4159e96b967c5f4b0a86f284281565b6000610c2a610e29565b6033546001600160a01b03908116911614610c7a576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b81610cc1576040805162461bcd60e51b8152602060048201526012602482015271074726164696e67206c696d697420697320360741b604482015290519081900360640190fd5b6040805183815290517f8170ba631b67fd88957dab2403b6fbb84c89a338bdfda451038014f2f72f01c79181900360200190a150606855600190565b6066546001600160a01b031681565b7f095ea7b334ae44009aa867bfb386f5c3b4b443ac6f0ee573fa91c4608fbadfba81565b610d38610e29565b6033546001600160a01b03908116911614610d88576040805162461bcd60e51b815260206004820181905260248201526000805160206115a4833981519152604482015290519081900360640190fd5b6001600160a01b038116610dcd5760405162461bcd60e51b815260040180806020018281038252602681526020018061150b6026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b60408051600280825260608083018452600093909291906020830190803683370190505090508581600081518110610e6157fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508581600181518110610e8f57fe5b6001600160a01b0392909216602092830291909101909101526040805160028082526060828101909352816020016020820280368337019050509050600181600081518110610eda57fe5b602002602001018181525050600281600181518110610ef557fe5b602090810291909101810191909152606554604080516313849cfd60e21b8152600481019182528551604482015285516060946001600160a01b0390941693634e1273f4938893889391928392602483019260640191878101910280838360005b83811015610f6e578181015183820152602001610f56565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610fad578181015183820152602001610f95565b5050505090500194505050505060006040518083038186803b158015610fd257600080fd5b505afa158015610fe6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052602081101561100f57600080fd5b810190808051604051939291908464010000000082111561102f57600080fd5b90830190602082018581111561104457600080fd5b825186602082028301116401000000008211171561106157600080fd5b82525081516020918201928201910280838360005b8381101561108e578181015183820152602001611076565b5050505090500160405250505090506000816001815181106110ac57fe5b602002602001015111156110c65760019350505050611228565b60675460408051635be2dd3760e11b81526001600160a01b038b811660048301526001600160e01b03198a1660248301529151600093929092169163b7c5ba6e91604480820192602092909190829003018186803b15801561112757600080fd5b505afa15801561113b573d6000803e3d6000fd5b505050506040513d602081101561115157600080fd5b5051606654604080516329550f9760e01b81526001600160a01b038c81166004830152602482018b9052915193945060009391909216916329550f97916044808301926020929190829003018186803b1580156111ad57600080fd5b505afa1580156111c1573d6000803e3d6000fd5b505050506040513d60208110156111d757600080fd5b50518351909150600090849082906111eb57fe5b602002602001015111801561120b575060685461120883836112e8565b11155b1561121e57600195505050505050611228565b6000955050505050505b949350505050565b303b1590565b600054610100900460ff168061124f575061124f611230565b8061125d575060005460ff16155b6112985760405162461bcd60e51b815260040180806020018281038252602e815260200180611576602e913960400191505060405180910390fd5b600054610100900460ff161580156112c3576000805460ff1961ff0019909116610100171660011790555b6112cb611349565b6112d36113e9565b80156112e5576000805461ff00191690555b50565b600082820183811015611342576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600054610100900460ff16806113625750611362611230565b80611370575060005460ff16155b6113ab5760405162461bcd60e51b815260040180806020018281038252602e815260200180611576602e913960400191505060405180910390fd5b600054610100900460ff161580156112d3576000805460ff1961ff00199091166101001716600117905580156112e5576000805461ff001916905550565b600054610100900460ff16806114025750611402611230565b80611410575060005460ff16155b61144b5760405162461bcd60e51b815260040180806020018281038252602e815260200180611576602e913960400191505060405180910390fd5b600054610100900460ff16158015611476576000805460ff1961ff0019909116610100171660011790555b6000611480610e29565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156112e5576000805461ff001916905550565b600080858511156114f1578182fd5b838611156114fd578182fd5b505082019391909203915056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573736e6577207065726d697373696f6e7320697320746865207a65726f2061646472657373657572207072696365206665656420697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a65644f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657274726164696e6720726567697374727920697320746865207a65726f2061646472657373a2646970667358221220215fe5842184c864b05f212c527252fbf3777c2b4888d06bb2872afc2707f9d864736f6c63430007040033";
