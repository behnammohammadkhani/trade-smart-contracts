/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { XTokenMock } from "../XTokenMock";

export class XTokenMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    authorization_: string,
    operationsRegistry_: string,
    overrides?: Overrides
  ): Promise<XTokenMock> {
    return super.deploy(
      name_,
      symbol_,
      authorization_,
      operationsRegistry_,
      overrides || {}
    ) as Promise<XTokenMock>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    authorization_: string,
    operationsRegistry_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      authorization_,
      operationsRegistry_,
      overrides || {}
    );
  }
  attach(address: string): XTokenMock {
    return super.attach(address) as XTokenMock;
  }
  connect(signer: Signer): XTokenMock__factory {
    return super.connect(signer) as XTokenMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XTokenMock {
    return new Contract(address, _abi, signerOrProvider) as XTokenMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "authorization_",
        type: "address",
      },
      {
        internalType: "address",
        name: "operationsRegistry_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "contract IOperationsRegistry",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
  "0x60806040523480156200001157600080fd5b5060405162001bbf38038062001bbf833981810160405260808110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604090815260208281015192909101518651929450925085918591620001c59160039185019062000286565b508051620001db90600490602084019062000286565b50506005805460ff19166012179055506000620001f762000282565b60058054610100600160a81b0319166101006001600160a01b03841690810291909117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600680546001600160a01b039384166001600160a01b0319918216179091556007805492909316911617905550620003329050565b3390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002be576000855562000309565b82601f10620002d957805160ff191683800117855562000309565b8280016001018555821562000309579182015b8281111562000309578251825591602001919060010190620002ec565b50620003179291506200031b565b5090565b5b808211156200031757600081556001016200031c565b61187d80620003426000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806370a08231116100ad5780639c008673116100715780639c0086731461035e578063a457c2d714610366578063a9059cbb14610392578063dd62ed3e146103be578063f2fde38b146103ec57610121565b806370a08231146102f4578063715018a61461031a57806379cc6790146103225780638da5cb5b1461034e57806395d89b411461035657610121565b806323b872dd116100f457806323b872dd14610222578063313ce567146102585780633817c86c14610276578063395093511461029a57806340c10f19146102c657610121565b806306fdde0314610126578063095ea7b3146101a357806316967a10146101e357806318160ddd14610208575b600080fd5b61012e610412565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610168578181015183820152602001610150565b50505050905090810190601f1680156101955780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101cf600480360360408110156101b957600080fd5b506001600160a01b0381351690602001356104a8565b604080519115158252519081900360200190f35b6101eb6104c5565b604080516001600160e01b03199092168252519081900360200190f35b6102106104e9565b60408051918252519081900360200190f35b6101cf6004803603606081101561023857600080fd5b506001600160a01b038135811691602081013590911690604001356104ef565b6102606106e2565b6040805160ff9092168252519081900360200190f35b61027e6106eb565b604080516001600160a01b039092168252519081900360200190f35b6101cf600480360360408110156102b057600080fd5b506001600160a01b0381351690602001356106fa565b6102f2600480360360408110156102dc57600080fd5b506001600160a01b03813516906020013561074d565b005b6102106004803603602081101561030a57600080fd5b50356001600160a01b0316610997565b6102f26109b2565b6102f26004803603604081101561033857600080fd5b506001600160a01b038135169060200135610a5f565b61027e610c29565b61012e610c3d565b61027e610c9e565b6101cf6004803603604081101561037c57600080fd5b506001600160a01b038135169060200135610cad565b6101cf600480360360408110156103a857600080fd5b506001600160a01b038135169060200135610d15565b610210600480360360408110156103d457600080fd5b506001600160a01b0381358116916020013516610f22565b6102f26004803603602081101561040257600080fd5b50356001600160a01b0316610f4d565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561049e5780601f106104735761010080835404028352916020019161049e565b820191906000526020600020905b81548152906001019060200180831161048157829003601f168201915b5050505050905090565b60006104bc6104b5611056565b848461105a565b50600192915050565b7fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b81565b60025490565b6006546000906001600160a01b0316635c50893a61050b611056565b306000356001600160e01b031916610521611146565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561059b578181015183820152602001610583565b50505050905090810190601f1680156105c85780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b1580156105ea57600080fd5b505af11580156105fe573d6000803e3d6000fd5b505050506040513d602081101561061457600080fd5b5051610655576040805162461bcd60e51b815260206004820152601c6024820152600080516020611751833981519152604482015290519081900360640190fd5b610660848484611185565b506007546040805163375586b960e21b81526001600160a01b03878116600483015263a9059cbb60e01b6024830152604482018690529151919092169163dd561ae491606480830192600092919082900301818387803b1580156106c357600080fd5b505af11580156106d7573d6000803e3d6000fd5b505050509392505050565b60055460ff1690565b6006546001600160a01b031681565b60006104bc610707611056565b846107488560016000610718611056565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490611207565b61105a565b610755611056565b60055461010090046001600160a01b039081169116146107aa576040805162461bcd60e51b81526020600482018190526024820152600080516020611799833981519152604482015290519081900360640190fd5b6006546001600160a01b0316635c50893a6107c3611056565b306000356001600160e01b0319166107d9611146565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561085357818101518382015260200161083b565b50505050905090810190601f1680156108805780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b1580156108a257600080fd5b505af11580156108b6573d6000803e3d6000fd5b505050506040513d60208110156108cc57600080fd5b505161090d576040805162461bcd60e51b815260206004820152601c6024820152600080516020611751833981519152604482015290519081900360640190fd5b6109178282611268565b6007546040805163375586b960e21b81526001600160a01b038581166004830152600080356001600160e01b031916602484015260448301869052925193169263dd561ae49260648084019391929182900301818387803b15801561097b57600080fd5b505af115801561098f573d6000803e3d6000fd5b505050505050565b6001600160a01b031660009081526020819052604090205490565b6109ba611056565b60055461010090046001600160a01b03908116911614610a0f576040805162461bcd60e51b81526020600482018190526024820152600080516020611799833981519152604482015290519081900360640190fd5b60055460405160009161010090046001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a360058054610100600160a81b0319169055565b610a67611056565b60055461010090046001600160a01b03908116911614610abc576040805162461bcd60e51b81526020600482018190526024820152600080516020611799833981519152604482015290519081900360640190fd5b6006546001600160a01b0316635c50893a610ad5611056565b306000356001600160e01b031916610aeb611146565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610b65578181015183820152602001610b4d565b50505050905090810190601f168015610b925780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610bb457600080fd5b505af1158015610bc8573d6000803e3d6000fd5b505050506040513d6020811015610bde57600080fd5b5051610c1f576040805162461bcd60e51b815260206004820152601c6024820152600080516020611751833981519152604482015290519081900360640190fd5b6109178282611358565b60055461010090046001600160a01b031690565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561049e5780601f106104735761010080835404028352916020019161049e565b6007546001600160a01b031681565b60006104bc610cba611056565b84610748856040518060600160405280602581526020016118236025913960016000610ce4611056565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611454565b6006546000906001600160a01b0316635c50893a610d31611056565b306000356001600160e01b031916610d47611146565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610dc1578181015183820152602001610da9565b50505050905090810190601f168015610dee5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610e1057600080fd5b505af1158015610e24573d6000803e3d6000fd5b505050506040513d6020811015610e3a57600080fd5b5051610e7b576040805162461bcd60e51b815260206004820152601c6024820152600080516020611751833981519152604482015290519081900360640190fd5b610e8583836114eb565b506007546001600160a01b031663dd561ae4610e9f611056565b6000356001600160e01b031916856040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160e01b03191681526020018281526020019350505050600060405180830381600087803b158015610f0457600080fd5b505af1158015610f18573d6000803e3d6000fd5b5050505092915050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610f55611056565b60055461010090046001600160a01b03908116911614610faa576040805162461bcd60e51b81526020600482018190526024820152600080516020611799833981519152604482015290519081900360640190fd5b6001600160a01b038116610fef5760405162461bcd60e51b81526004018080602001828103825260268152602001806116e36026913960400191505060405180910390fd5b6005546040516001600160a01b0380841692610100900416907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600580546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b3390565b6001600160a01b03831661109f5760405162461bcd60e51b81526004018080602001828103825260248152602001806117ff6024913960400191505060405180910390fd5b6001600160a01b0382166110e45760405162461bcd60e51b81526004018080602001828103825260228152602001806117096022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60606000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935050505090565b60006111928484846114fb565b6111fd8461119e611056565b61074885604051806060016040528060288152602001611771602891396001600160a01b038a166000908152600160205260408120906111dc611056565b6001600160a01b031681526020810191909152604001600020549190611454565b5060019392505050565b600082820183811015611261576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b0382166112c3576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6112cf60008383611656565b6002546112dc9082611207565b6002556001600160a01b0382166000908152602081905260409020546113029082611207565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b03821661139d5760405162461bcd60e51b81526004018080602001828103825260218152602001806117b96021913960400191505060405180910390fd5b6113a982600083611656565b6113e6816040518060600160405280602281526020016116c1602291396001600160a01b0385166000908152602081905260409020549190611454565b6001600160a01b03831660009081526020819052604090205560025461140c908261165b565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b600081848411156114e35760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156114a8578181015183820152602001611490565b50505050905090810190601f1680156114d55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60006104bc6114f8611056565b84845b6001600160a01b0383166115405760405162461bcd60e51b81526004018080602001828103825260258152602001806117da6025913960400191505060405180910390fd5b6001600160a01b0382166115855760405162461bcd60e51b815260040180806020018281038252602381526020018061169e6023913960400191505060405180910390fd5b611590838383611656565b6115cd8160405180606001604052806026815260200161172b602691396001600160a01b0386166000908152602081905260409020549190611454565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546115fc9082611207565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b505050565b600061126183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061145456fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365417574686f72697a61626c653a206e6f7420617574686f72697a65640000000045524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657245524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220c6dafae96b3452537d47d943523cf9d896157598404f15ca8f3d2f2eb4844ab864736f6c63430007040033";
