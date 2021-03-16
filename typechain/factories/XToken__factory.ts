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
    name: "AuthorizationSetted",
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
    name: "KyaSetted",
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
  "0x60806040523480156200001157600080fd5b5060405162002ce438038062002ce4833981810160405260c08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604081815260208301519201805192949193919284640100000000821115620001c157600080fd5b908301906020820185811115620001d757600080fd5b8251640100000000811182820188101715620001f257600080fd5b82525081516020918201929091019080838360005b838110156200022157818101518382015260200162000207565b50505050905090810190601f1680156200024f5780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015188519294509250879187916200027c9160039185019062000645565b5080516200029290600490602084019062000645565b50506005805461ff001960ff199091166012171690555060ff8416620002ef576040805162461bcd60e51b815260206004820152600d60248201526c0646563696d616c73206973203609c1b604482015290519081900360640190fd5b6001600160a01b038216620003365760405162461bcd60e51b815260040180806020018281038252602181526020018062002cc36021913960400191505060405180910390fd5b6001600160a01b0381166200037d5760405162461bcd60e51b815260040180806020018281038252602681526020018062002c6e6026913960400191505060405180910390fd5b6200038884620003d7565b62000395600033620003ed565b620003a083620003fd565b620003ab82620004ae565b600880546001600160a01b0319166001600160a01b039290921691909117905550620006f19350505050565b6005805460ff191660ff92909216919091179055565b620003f982826200053f565b5050565b7f3300e9603e9fa499a45b30c1623801188345d913e84acf7f4c7383d36208baf4816040518080602001828103825283818151815260200191508051906020019080838360005b838110156200045e57818101518382015260200162000444565b50505050905090810190601f1680156200048c5780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051620003f990600990602084019062000645565b6001600160a01b038116620004f55760405162461bcd60e51b815260040180806020018281038252602f81526020018062002c94602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f41e7dcfdf7480ba435eb5598d22d93feb42a49a5efa3cd3a74bd67830df10adb90600090a250565b60008281526006602090815260409091206200056691839062001611620005ba821b17901c565b15620003f95762000576620005da565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620005d1836001600160a01b038416620005de565b90505b92915050565b3390565b6000620005ec83836200062d565b6200062457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620005d4565b506000620005d4565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200067d5760008555620006c8565b82601f106200069857805160ff1916838001178555620006c8565b82800160010185558215620006c8579182015b82811115620006c8578251825591602001919060010190620006ab565b50620006d6929150620006da565b5090565b5b80821115620006d65760008155600101620006db565b61256d80620007016000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80635c975abb1161011a57806398d9423e116100ad578063a9059cbb1161007c578063a9059cbb14610642578063c2167d931461066e578063ca15c87314610694578063d547741f146106b1578063dd62ed3e146106dd576101fb565b806398d9423e146105605780639c00867314610606578063a217fddf1461060e578063a457c2d714610616576101fb565b80638456cb59116100e95780638456cb59146105015780639010d07c1461050957806391d148541461052c57806395d89b4114610558576101fb565b80635c975abb1461048157806370a0823114610489578063728daa56146104af57806379cc6790146104d5576101fb565b8063313ce567116101925780633f4ba83a116101615780633f4ba83a1461043d5780633fc7293a1461044557806340c10f191461044d57806341ce724814610479576101fb565b8063313ce567146103a357806336568abe146103c15780633817c86c146103ed5780633950935114610411576101fb565b806318160ddd116101ce57806318160ddd1461030a57806323b872dd14610324578063248a9ca31461035a5780632f2ff15d14610377576101fb565b8063025c126e1461020057806306fdde0314610228578063095ea7b3146102a557806316967a10146102e5575b600080fd5b6102266004803603602081101561021657600080fd5b50356001600160a01b031661070b565b005b610230610768565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561026a578181015183820152602001610252565b50505050905090810190601f1680156102975780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102d1600480360360408110156102bb57600080fd5b506001600160a01b0381351690602001356107fe565b604080519115158252519081900360200190f35b6102ed61081c565b604080516001600160e01b03199092168252519081900360200190f35b610312610840565b60408051918252519081900360200190f35b6102d16004803603606081101561033a57600080fd5b506001600160a01b03813581169160208101359091169060400135610846565b6103126004803603602081101561037057600080fd5b5035610a3c565b6102266004803603604081101561038d57600080fd5b50803590602001356001600160a01b0316610a51565b6103ab610ab8565b6040805160ff9092168252519081900360200190f35b610226600480360360408110156103d757600080fd5b50803590602001356001600160a01b0316610ac1565b6103f5610b22565b604080516001600160a01b039092168252519081900360200190f35b6102d16004803603604081101561042757600080fd5b506001600160a01b038135169060200135610b31565b610226610b84565b610230610bda565b6102266004803603604081101561046357600080fd5b506001600160a01b038135169060200135610c68565b610312610eb9565b6102d1610ecb565b6103126004803603602081101561049f57600080fd5b50356001600160a01b0316610ed9565b610226600480360360208110156104c557600080fd5b50356001600160a01b0316610ef4565b610226600480360360408110156104eb57600080fd5b506001600160a01b038135169060200135610fdb565b6102266111ac565b6103f56004803603604081101561051f57600080fd5b5080359060200135611200565b6102d16004803603604081101561054257600080fd5b50803590602001356001600160a01b031661121f565b610230611237565b6102266004803603602081101561057657600080fd5b81019060208101813564010000000081111561059157600080fd5b8201836020820111156105a357600080fd5b803590602001918460018302840111640100000000831117156105c557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611298945050505050565b6103f56112ed565b6103126112fc565b6102d16004803603604081101561062c57600080fd5b506001600160a01b038135169060200135611301565b6102d16004803603604081101561065857600080fd5b506001600160a01b038135169060200135611369565b6102266004803603602081101561068457600080fd5b50356001600160a01b031661155e565b610312600480360360208110156106aa57600080fd5b5035611576565b610226600480360360408110156106c757600080fd5b50803590602001356001600160a01b031661158d565b610312600480360360408110156106f357600080fd5b506001600160a01b03813581169160200135166115e6565b61071d6000610718611626565b61121f565b61075c576040805162461bcd60e51b815260206004820152601c60248201526000805160206122aa833981519152604482015290519081900360640190fd5b6107658161162a565b50565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107f45780601f106107c9576101008083540402835291602001916107f4565b820191906000526020600020905b8154815290600101906020018083116107d757829003601f168201915b5050505050905090565b600061081261080b611626565b84846116b9565b5060015b92915050565b7fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b81565b60025490565b6007546000906001600160a01b0316635c50893a610862611626565b306000356001600160e01b0319166108786117a5565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156108f25781810151838201526020016108da565b50505050905090810190601f16801561091f5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561094157600080fd5b505af1158015610955573d6000803e3d6000fd5b505050506040513d602081101561096b57600080fd5b50516109ac576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b8833981519152604482015290519081900360640190fd5b6109b78484846117e4565b506008546040805163375586b960e21b81526001600160a01b03878116600483015263a9059cbb60e01b6024830152604482018690529151919092169163dd561ae491606480830192600092919082900301818387803b158015610a1a57600080fd5b505af1158015610a2e573d6000803e3d6000fd5b506001979650505050505050565b60009081526006602052604090206002015490565b600082815260066020526040902060020154610a6f90610718611626565b610aaa5760405162461bcd60e51b815260040180806020018281038252602f8152602001806122ca602f913960400191505060405180910390fd5b610ab48282611866565b5050565b60055460ff1690565b610ac9611626565b6001600160a01b0316816001600160a01b031614610b185760405162461bcd60e51b815260040180806020018281038252602f8152602001806124df602f913960400191505060405180910390fd5b610ab482826118cf565b6007546001600160a01b031681565b6000610812610b3e611626565b84610b7f8560016000610b4f611626565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490611938565b6116b9565b610b916000610718611626565b610bd0576040805162461bcd60e51b815260206004820152601c60248201526000805160206122aa833981519152604482015290519081900360640190fd5b610bd8611992565b565b6009805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c605780601f10610c3557610100808354040283529160200191610c60565b820191906000526020600020905b815481529060010190602001808311610c4357829003601f168201915b505050505081565b610c82600080516020612430833981519152610718611626565b610ccc576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a610ce5611626565b306000356001600160e01b031916610cfb6117a5565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610d75578181015183820152602001610d5d565b50505050905090810190601f168015610da25780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610dc457600080fd5b505af1158015610dd8573d6000803e3d6000fd5b505050506040513d6020811015610dee57600080fd5b5051610e2f576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b8833981519152604482015290519081900360640190fd5b610e398282611a36565b6008546040805163375586b960e21b81526001600160a01b038581166004830152600080356001600160e01b031916602484015260448301869052925193169263dd561ae49260648084019391929182900301818387803b158015610e9d57600080fd5b505af1158015610eb1573d6000803e3d6000fd5b505050505050565b60008051602061243083398151915281565b600554610100900460ff1690565b6001600160a01b031660009081526020819052604090205490565b610f016000610718611626565b610f40576040805162461bcd60e51b815260206004820152601c60248201526000805160206122aa833981519152604482015290519081900360640190fd5b6001600160a01b038116610f855760405162461bcd60e51b81526004018080602001828103825260268152602001806122f96026913960400191505060405180910390fd5b6040516001600160a01b038216907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a2600880546001600160a01b0319166001600160a01b0392909216919091179055565b610ff5600080516020612430833981519152610718611626565b61103f576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a611058611626565b306000356001600160e01b03191661106e6117a5565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156110e85781810151838201526020016110d0565b50505050905090810190601f1680156111155780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561113757600080fd5b505af115801561114b573d6000803e3d6000fd5b505050506040513d602081101561116157600080fd5b50516111a2576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b8833981519152604482015290519081900360640190fd5b610e398282611b26565b6111b96000610718611626565b6111f8576040805162461bcd60e51b815260206004820152601c60248201526000805160206122aa833981519152604482015290519081900360640190fd5b610bd8611c22565b60008281526006602052604081206112189083611caa565b9392505050565b60008281526006602052604081206112189083611cb6565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107f45780601f106107c9576101008083540402835291602001916107f4565b6112a56000610718611626565b6112e4576040805162461bcd60e51b815260206004820152601c60248201526000805160206122aa833981519152604482015290519081900360640190fd5b61076581611ccb565b6008546001600160a01b031681565b600081565b600061081261130e611626565b84610b7f856040518060600160405280602581526020016124ba6025913960016000611338611626565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611d77565b6007546000906001600160a01b0316635c50893a611385611626565b306000356001600160e01b03191661139b6117a5565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156114155781810151838201526020016113fd565b50505050905090810190601f1680156114425780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561146457600080fd5b505af1158015611478573d6000803e3d6000fd5b505050506040513d602081101561148e57600080fd5b50516114cf576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b8833981519152604482015290519081900360640190fd5b6114d98383611e0e565b506008546040805163375586b960e21b8152326004820152600080356001600160e01b03191660248301526044820186905291516001600160a01b039093169263dd561ae49260648084019391929182900301818387803b15801561153d57600080fd5b505af1158015611551573d6000803e3d6000fd5b5060019695505050505050565b61076560008051602061243083398151915282610a51565b600081815260066020526040812061081690611e22565b6000828152600660205260409020600201546115ab90610718611626565b610b185760405162461bcd60e51b81526004018080602001828103825260308152602001806123d86030913960400191505060405180910390fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6000611218836001600160a01b038416611e2d565b3390565b6001600160a01b03811661166f5760405162461bcd60e51b815260040180806020018281038252602f815260200180612389602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f41e7dcfdf7480ba435eb5598d22d93feb42a49a5efa3cd3a74bd67830df10adb90600090a250565b6001600160a01b0383166116fe5760405162461bcd60e51b81526004018080602001828103825260248152602001806124966024913960400191505060405180910390fd5b6001600160a01b0382166117435760405162461bcd60e51b81526004018080602001828103825260228152602001806123416022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60606000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935050505090565b60006117f1848484611e77565b61185c846117fd611626565b610b7f85604051806060016040528060288152602001612408602891396001600160a01b038a1660009081526001602052604081209061183b611626565b6001600160a01b031681526020810191909152604001600020549190611d77565b5060019392505050565b600082815260066020526040902061187e9082611611565b15610ab45761188b611626565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526006602052604090206118e79082611fd2565b15610ab4576118f4611626565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015611218576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600554610100900460ff166119e5576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b6005805461ff00191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611a19611626565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b038216611a91576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611a9d60008383611fe7565b600254611aaa9082611938565b6002556001600160a01b038216600090815260208190526040902054611ad09082611938565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038216611b6b5760405162461bcd60e51b81526004018080602001828103825260218152602001806124506021913960400191505060405180910390fd5b611b7782600083611fe7565b611bb48160405180606001604052806022815260200161231f602291396001600160a01b0385166000908152602081905260409020549190611d77565b6001600160a01b038316600090815260208190526040902055600254611bda908261203b565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b600554610100900460ff1615611c72576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b6005805461ff0019166101001790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611a19611626565b6000611218838361207d565b6000611218836001600160a01b0384166120e1565b7f3300e9603e9fa499a45b30c1623801188345d913e84acf7f4c7383d36208baf4816040518080602001828103825283818151815260200191508051906020019080838360005b83811015611d2a578181015183820152602001611d12565b50505050905090810190601f168015611d575780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051610ab49060099060208401906121c3565b60008184841115611e065760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611dcb578181015183820152602001611db3565b50505050905090810190601f168015611df85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000610812611e1b611626565b8484611e77565b6000610816826120f9565b6000611e3983836120e1565b611e6f57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610816565b506000610816565b6001600160a01b038316611ebc5760405162461bcd60e51b81526004018080602001828103825260258152602001806124716025913960400191505060405180910390fd5b6001600160a01b038216611f015760405162461bcd60e51b81526004018080602001828103825260238152602001806122876023913960400191505060405180910390fd5b611f0c838383611fe7565b611f4981604051806060016040528060268152602001612363602691396001600160a01b0386166000908152602081905260409020549190611d77565b6001600160a01b038085166000908152602081905260408082209390935590841681522054611f789082611938565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000611218836001600160a01b0384166120fd565b611ff2838383612036565b611ffa610ecb565b156120365760405162461bcd60e51b815260040180806020018281038252602a81526020018061250e602a913960400191505060405180910390fd5b505050565b600061121883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611d77565b815460009082106120bf5760405162461bcd60e51b81526004018080602001828103825260228152602001806122656022913960400191505060405180910390fd5b8260000182815481106120ce57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b600081815260018301602052604081205480156121b9578354600019808301919081019060009087908390811061213057fe5b906000526020600020015490508087600001848154811061214d57fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061217d57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610816565b6000915050610816565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826121f9576000855561223f565b82601f1061221257805160ff191683800117855561223f565b8280016001018555821561223f579182015b8281111561223f578251825591602001919060010190612224565b5061224b92915061224f565b5090565b5b8082111561224b576000815560010161225056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f20616464726573736d75737420686176652064656661756c742061646d696e20726f6c6500000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e746f7065726174696f6e73526567697374727920697320746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373417574686f72697a61626c653a206e6f7420617574686f72697a656400000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63659f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a645524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a26469706673582212201b8c4851e16cbed75e4a90d9103bc9a2363186d9aca5d72d9e5da6190bdcf15164736f6c634300070400336f7065726174696f6e73526567697374727920697320746865207a65726f2061646472657373417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373617574686f72697a6174696f6e20697320746865207a65726f2061646472657373";
