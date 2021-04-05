/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { XToken } from "../XToken";

export class XToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    kya_: string,
    authorization_: string,
    operationsRegistry_: string,
    overrides?: Overrides
  ): Promise<XToken> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      kya_,
      authorization_,
      operationsRegistry_,
      overrides || {}
    ) as Promise<XToken>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    kya_: string,
    authorization_: string,
    operationsRegistry_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      kya_,
      authorization_,
      operationsRegistry_,
      overrides || {}
    );
  }
  attach(address: string): XToken {
    return super.attach(address) as XToken;
  }
  connect(signer: Signer): XToken__factory {
    return super.connect(signer) as XToken__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): XToken {
    return new Contract(address, _abi, signerOrProvider) as XToken;
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
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "kya_",
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
        indexed: false,
        internalType: "string",
        name: "newKya",
        type: "string",
      },
    ],
    name: "KyaSet",
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
    name: "OperationsRegistrySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WRAPPER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [],
    name: "kya",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
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
        internalType: "string",
        name: "kya_",
        type: "string",
      },
    ],
    name: "setKya",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operationsRegistry_",
        type: "address",
      },
    ],
    name: "setOperationsRegistry",
    outputs: [],
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
    ],
    name: "setWrapper",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002c9038038062002c90833981810160405260c08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604081815260208301519201805192949193919284640100000000821115620001c157600080fd5b908301906020820185811115620001d757600080fd5b8251640100000000811182820188101715620001f257600080fd5b82525081516020918201929091019080838360005b838110156200022157818101518382015260200162000207565b50505050905090810190601f1680156200024f5780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015188519294509250879187916200027c9160039185019062000645565b5080516200029290600490602084019062000645565b50506005805461ff001960ff199091166012171690555060ff8416620002ef576040805162461bcd60e51b815260206004820152600d60248201526c0646563696d616c73206973203609c1b604482015290519081900360640190fd5b6001600160a01b038216620003365760405162461bcd60e51b815260040180806020018281038252602181526020018062002c6f6021913960400191505060405180910390fd5b6001600160a01b0381166200037d5760405162461bcd60e51b815260040180806020018281038252602681526020018062002c1a6026913960400191505060405180910390fd5b6200038884620003d7565b62000395600033620003ed565b620003a083620003fd565b620003ab82620004ae565b600880546001600160a01b0319166001600160a01b039290921691909117905550620006f19350505050565b6005805460ff191660ff92909216919091179055565b620003f982826200053f565b5050565b7faba1c4b56d2769d396c1f56941f54e3ac6346070669c5cce324ab8411e271d67816040518080602001828103825283818151815260200191508051906020019080838360005b838110156200045e57818101518382015260200162000444565b50505050905090810190601f1680156200048c5780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051620003f990600990602084019062000645565b6001600160a01b038116620004f55760405162461bcd60e51b815260040180806020018281038252602f81526020018062002c40602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f0b13ebfb339521b6e5b463c48cb139349ce9ec66833ea58f7c7101847c1fa61c90600090a250565b600082815260066020908152604090912062000566918390620015bd620005ba821b17901c565b15620003f95762000576620005da565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620005d1836001600160a01b038416620005de565b90505b92915050565b3390565b6000620005ec83836200062d565b6200062457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620005d4565b506000620005d4565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200067d5760008555620006c8565b82601f106200069857805160ff1916838001178555620006c8565b82800160010185558215620006c8579182015b82811115620006c8578251825591602001919060010190620006ab565b50620006d6929150620006da565b5090565b5b80821115620006d65760008155600101620006db565b61251980620007016000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806370a082311161010f5780639c008673116100a2578063c2167d9311610071578063c2167d931461063e578063ca15c87314610664578063d547741f14610681578063dd62ed3e146106ad576101f0565b80639c008673146105d6578063a217fddf146105de578063a457c2d7146105e6578063a9059cbb14610612576101f0565b80639010d07c116100de5780639010d07c146104d957806391d14854146104fc57806395d89b411461052857806398d9423e14610530576101f0565b806370a0823114610459578063728daa561461047f57806379cc6790146104a55780638456cb59146104d1576101f0565b806336568abe116101875780633fc7293a116101565780633fc7293a1461041557806340c10f191461041d57806341ce7248146104495780635c975abb14610451576101f0565b806336568abe146103915780633817c86c146103bd57806339509351146103e15780633f4ba83a1461040d576101f0565b806323b872dd116101c357806323b872dd146102f4578063248a9ca31461032a5780632f2ff15d14610347578063313ce56714610373576101f0565b8063025c126e146101f557806306fdde031461021d578063095ea7b31461029a57806318160ddd146102da575b600080fd5b61021b6004803603602081101561020b57600080fd5b50356001600160a01b03166106db565b005b610225610738565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561025f578181015183820152602001610247565b50505050905090810190601f16801561028c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102c6600480360360408110156102b057600080fd5b506001600160a01b0381351690602001356107ce565b604080519115158252519081900360200190f35b6102e26107ec565b60408051918252519081900360200190f35b6102c66004803603606081101561030a57600080fd5b506001600160a01b038135811691602081013590911690604001356107f2565b6102e26004803603602081101561034057600080fd5b50356109e8565b61021b6004803603604081101561035d57600080fd5b50803590602001356001600160a01b03166109fd565b61037b610a64565b6040805160ff9092168252519081900360200190f35b61021b600480360360408110156103a757600080fd5b50803590602001356001600160a01b0316610a6d565b6103c5610ace565b604080516001600160a01b039092168252519081900360200190f35b6102c6600480360360408110156103f757600080fd5b506001600160a01b038135169060200135610add565b61021b610b30565b610225610b86565b61021b6004803603604081101561043357600080fd5b506001600160a01b038135169060200135610c14565b6102e2610e65565b6102c6610e77565b6102e26004803603602081101561046f57600080fd5b50356001600160a01b0316610e85565b61021b6004803603602081101561049557600080fd5b50356001600160a01b0316610ea0565b61021b600480360360408110156104bb57600080fd5b506001600160a01b038135169060200135610f87565b61021b611158565b6103c5600480360360408110156104ef57600080fd5b50803590602001356111ac565b6102c66004803603604081101561051257600080fd5b50803590602001356001600160a01b03166111cb565b6102256111e3565b61021b6004803603602081101561054657600080fd5b81019060208101813564010000000081111561056157600080fd5b82018360208201111561057357600080fd5b8035906020019184600183028401116401000000008311171561059557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611244945050505050565b6103c5611299565b6102e26112a8565b6102c6600480360360408110156105fc57600080fd5b506001600160a01b0381351690602001356112ad565b6102c66004803603604081101561062857600080fd5b506001600160a01b038135169060200135611315565b61021b6004803603602081101561065457600080fd5b50356001600160a01b031661150a565b6102e26004803603602081101561067a57600080fd5b5035611522565b61021b6004803603604081101561069757600080fd5b50803590602001356001600160a01b0316611539565b6102e2600480360360408110156106c357600080fd5b506001600160a01b0381358116916020013516611592565b6106ed60006106e86115d2565b6111cb565b61072c576040805162461bcd60e51b815260206004820152601c6024820152600080516020612256833981519152604482015290519081900360640190fd5b610735816115d6565b50565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107c45780601f10610799576101008083540402835291602001916107c4565b820191906000526020600020905b8154815290600101906020018083116107a757829003601f168201915b5050505050905090565b60006107e26107db6115d2565b8484611665565b5060015b92915050565b60025490565b6007546000906001600160a01b0316635c50893a61080e6115d2565b306000356001600160e01b031916610824611751565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561089e578181015183820152602001610886565b50505050905090810190601f1680156108cb5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b1580156108ed57600080fd5b505af1158015610901573d6000803e3d6000fd5b505050506040513d602081101561091757600080fd5b5051610958576040805162461bcd60e51b815260206004820152601c6024820152600080516020612364833981519152604482015290519081900360640190fd5b610963848484611790565b506008546040805163375586b960e21b81526001600160a01b03878116600483015263a9059cbb60e01b6024830152604482018690529151919092169163dd561ae491606480830192600092919082900301818387803b1580156109c657600080fd5b505af11580156109da573d6000803e3d6000fd5b506001979650505050505050565b60009081526006602052604090206002015490565b600082815260066020526040902060020154610a1b906106e86115d2565b610a565760405162461bcd60e51b815260040180806020018281038252602f815260200180612276602f913960400191505060405180910390fd5b610a608282611812565b5050565b60055460ff1690565b610a756115d2565b6001600160a01b0316816001600160a01b031614610ac45760405162461bcd60e51b815260040180806020018281038252602f81526020018061248b602f913960400191505060405180910390fd5b610a60828261187b565b6007546001600160a01b031681565b60006107e2610aea6115d2565b84610b2b8560016000610afb6115d2565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906118e4565b611665565b610b3d60006106e86115d2565b610b7c576040805162461bcd60e51b815260206004820152601c6024820152600080516020612256833981519152604482015290519081900360640190fd5b610b8461193e565b565b6009805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c0c5780601f10610be157610100808354040283529160200191610c0c565b820191906000526020600020905b815481529060010190602001808311610bef57829003601f168201915b505050505081565b610c2e6000805160206123dc8339815191526106e86115d2565b610c78576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a610c916115d2565b306000356001600160e01b031916610ca7611751565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610d21578181015183820152602001610d09565b50505050905090810190601f168015610d4e5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610d7057600080fd5b505af1158015610d84573d6000803e3d6000fd5b505050506040513d6020811015610d9a57600080fd5b5051610ddb576040805162461bcd60e51b815260206004820152601c6024820152600080516020612364833981519152604482015290519081900360640190fd5b610de582826119e2565b6008546040805163375586b960e21b81526001600160a01b038581166004830152600080356001600160e01b031916602484015260448301869052925193169263dd561ae49260648084019391929182900301818387803b158015610e4957600080fd5b505af1158015610e5d573d6000803e3d6000fd5b505050505050565b6000805160206123dc83398151915281565b600554610100900460ff1690565b6001600160a01b031660009081526020819052604090205490565b610ead60006106e86115d2565b610eec576040805162461bcd60e51b815260206004820152601c6024820152600080516020612256833981519152604482015290519081900360640190fd5b6001600160a01b038116610f315760405162461bcd60e51b81526004018080602001828103825260268152602001806122a56026913960400191505060405180910390fd5b6040516001600160a01b038216907fe64975f0d5e26b3ab3f2d69b4046ab237b0ad4339bf4eeae37efcf71cd27547d90600090a2600880546001600160a01b0319166001600160a01b0392909216919091179055565b610fa16000805160206123dc8339815191526106e86115d2565b610feb576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a6110046115d2565b306000356001600160e01b03191661101a611751565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561109457818101518382015260200161107c565b50505050905090810190601f1680156110c15780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b1580156110e357600080fd5b505af11580156110f7573d6000803e3d6000fd5b505050506040513d602081101561110d57600080fd5b505161114e576040805162461bcd60e51b815260206004820152601c6024820152600080516020612364833981519152604482015290519081900360640190fd5b610de58282611ad2565b61116560006106e86115d2565b6111a4576040805162461bcd60e51b815260206004820152601c6024820152600080516020612256833981519152604482015290519081900360640190fd5b610b84611bce565b60008281526006602052604081206111c49083611c56565b9392505050565b60008281526006602052604081206111c49083611c62565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107c45780601f10610799576101008083540402835291602001916107c4565b61125160006106e86115d2565b611290576040805162461bcd60e51b815260206004820152601c6024820152600080516020612256833981519152604482015290519081900360640190fd5b61073581611c77565b6008546001600160a01b031681565b600081565b60006107e26112ba6115d2565b84610b2b8560405180606001604052806025815260200161246660259139600160006112e46115d2565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611d23565b6007546000906001600160a01b0316635c50893a6113316115d2565b306000356001600160e01b031916611347611751565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156113c15781810151838201526020016113a9565b50505050905090810190601f1680156113ee5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561141057600080fd5b505af1158015611424573d6000803e3d6000fd5b505050506040513d602081101561143a57600080fd5b505161147b576040805162461bcd60e51b815260206004820152601c6024820152600080516020612364833981519152604482015290519081900360640190fd5b6114858383611dba565b506008546040805163375586b960e21b8152336004820152600080356001600160e01b03191660248301526044820186905291516001600160a01b039093169263dd561ae49260648084019391929182900301818387803b1580156114e957600080fd5b505af11580156114fd573d6000803e3d6000fd5b5060019695505050505050565b6107356000805160206123dc833981519152826109fd565b60008181526006602052604081206107e690611dce565b600082815260066020526040902060020154611557906106e86115d2565b610ac45760405162461bcd60e51b81526004018080602001828103825260308152602001806123846030913960400191505060405180910390fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60006111c4836001600160a01b038416611dd9565b3390565b6001600160a01b03811661161b5760405162461bcd60e51b815260040180806020018281038252602f815260200180612335602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f0b13ebfb339521b6e5b463c48cb139349ce9ec66833ea58f7c7101847c1fa61c90600090a250565b6001600160a01b0383166116aa5760405162461bcd60e51b81526004018080602001828103825260248152602001806124426024913960400191505060405180910390fd5b6001600160a01b0382166116ef5760405162461bcd60e51b81526004018080602001828103825260228152602001806122ed6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60606000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935050505090565b600061179d848484611e23565b611808846117a96115d2565b610b2b856040518060600160405280602881526020016123b4602891396001600160a01b038a166000908152600160205260408120906117e76115d2565b6001600160a01b031681526020810191909152604001600020549190611d23565b5060019392505050565b600082815260066020526040902061182a90826115bd565b15610a60576118376115d2565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526006602052604090206118939082611f7e565b15610a60576118a06115d2565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000828201838110156111c4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600554610100900460ff16611991576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b6005805461ff00191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6119c56115d2565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b038216611a3d576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611a4960008383611f93565b600254611a5690826118e4565b6002556001600160a01b038216600090815260208190526040902054611a7c90826118e4565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038216611b175760405162461bcd60e51b81526004018080602001828103825260218152602001806123fc6021913960400191505060405180910390fd5b611b2382600083611f93565b611b60816040518060600160405280602281526020016122cb602291396001600160a01b0385166000908152602081905260409020549190611d23565b6001600160a01b038316600090815260208190526040902055600254611b869082611fe7565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b600554610100900460ff1615611c1e576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b6005805461ff0019166101001790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586119c56115d2565b60006111c48383612029565b60006111c4836001600160a01b03841661208d565b7faba1c4b56d2769d396c1f56941f54e3ac6346070669c5cce324ab8411e271d67816040518080602001828103825283818151815260200191508051906020019080838360005b83811015611cd6578181015183820152602001611cbe565b50505050905090810190601f168015611d035780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051610a6090600990602084019061216f565b60008184841115611db25760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611d77578181015183820152602001611d5f565b50505050905090810190601f168015611da45780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60006107e2611dc76115d2565b8484611e23565b60006107e6826120a5565b6000611de5838361208d565b611e1b575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556107e6565b5060006107e6565b6001600160a01b038316611e685760405162461bcd60e51b815260040180806020018281038252602581526020018061241d6025913960400191505060405180910390fd5b6001600160a01b038216611ead5760405162461bcd60e51b81526004018080602001828103825260238152602001806122336023913960400191505060405180910390fd5b611eb8838383611f93565b611ef58160405180606001604052806026815260200161230f602691396001600160a01b0386166000908152602081905260409020549190611d23565b6001600160a01b038085166000908152602081905260408082209390935590841681522054611f2490826118e4565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60006111c4836001600160a01b0384166120a9565b611f9e838383611fe2565b611fa6610e77565b15611fe25760405162461bcd60e51b815260040180806020018281038252602a8152602001806124ba602a913960400191505060405180910390fd5b505050565b60006111c483836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611d23565b8154600090821061206b5760405162461bcd60e51b81526004018080602001828103825260228152602001806122116022913960400191505060405180910390fd5b82600001828154811061207a57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b6000818152600183016020526040812054801561216557835460001980830191908101906000908790839081106120dc57fe5b90600052602060002001549050808760000184815481106120f957fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061212957fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506107e6565b60009150506107e6565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826121a557600085556121eb565b82601f106121be57805160ff19168380011785556121eb565b828001600101855582156121eb579182015b828111156121eb5782518255916020019190600101906121d0565b506121f79291506121fb565b5090565b5b808211156121f757600081556001016121fc56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f20616464726573736d75737420686176652064656661756c742061646d696e20726f6c6500000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e746f7065726174696f6e73526567697374727920697320746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373417574686f72697a61626c653a206e6f7420617574686f72697a656400000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63659f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a645524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a26469706673582212202cb96880f27d02e4fabe9d870bc4181f022d7526b3954330730db1bb371634a064736f6c634300070400336f7065726174696f6e73526567697374727920697320746865207a65726f2061646472657373417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373617574686f72697a6174696f6e20697320746865207a65726f2061646472657373";
