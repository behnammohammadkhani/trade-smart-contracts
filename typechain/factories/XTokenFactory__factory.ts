/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { XTokenFactory } from "../XTokenFactory";

export class XTokenFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _xTokenWrapper: string,
    _operationsRegistry: string,
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<XTokenFactory> {
    return super.deploy(
      _xTokenWrapper,
      _operationsRegistry,
      _eurPriceFeed,
      overrides || {}
    ) as Promise<XTokenFactory>;
  }
  getDeployTransaction(
    _xTokenWrapper: string,
    _operationsRegistry: string,
    _eurPriceFeed: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _xTokenWrapper,
      _operationsRegistry,
      _eurPriceFeed,
      overrides || {}
    );
  }
  attach(address: string): XTokenFactory {
    return super.attach(address) as XTokenFactory;
  }
  connect(signer: Signer): XTokenFactory__factory {
    return super.connect(signer) as XTokenFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XTokenFactory {
    return new Contract(address, _abi, signerOrProvider) as XTokenFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_xTokenWrapper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_operationsRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_eurPriceFeed",
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
        name: "xToken",
        type: "address",
      },
    ],
    name: "XTokenDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newXTokenWrapper",
        type: "address",
      },
    ],
    name: "XTokenWrapperSetted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
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
        name: "assetFeed_",
        type: "address",
      },
    ],
    name: "deployXToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
        name: "_xTokenWrapper",
        type: "address",
      },
    ],
    name: "setXTokenWrapper",
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
  {
    inputs: [],
    name: "xTokenWrapper",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405162003e9638038062003e968339818101604052606081101561003557600080fd5b508051602082015160409092015190919060006100506100bd565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506100a3836100c1565b6100ac8261015d565b6100b5816101f9565b505050610295565b3390565b6001600160a01b0381166101075760405162461bcd60e51b815260040180806020018281038252602281526020018062003e266022913960400191505060405180910390fd5b6040516001600160a01b038216907f8116c854b06ef90c9d7aecf790f190e0a092e749cd31fceed9961a2c520d9e3090600090a2600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381166101a35760405162461bcd60e51b815260040180806020018281038252602c81526020018062003e6a602c913960400191505060405180910390fd5b6040516001600160a01b038216907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a2600280546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811661023f5760405162461bcd60e51b815260040180806020018281038252602281526020018062003e486022913960400191505060405180910390fd5b6040516001600160a01b038216907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a2600380546001600160a01b0319166001600160a01b0392909216919091179055565b613b8180620002a56000396000f3fe60806040523480156200001157600080fd5b5060043610620000ac5760003560e01c80639b00f17f116200006f5780639b00f17f146200031b5780639c0086731462000344578063a3c1e136146200034e578063e7592c601462000377578063f2fde38b146200038157620000ac565b806351fc218b14620000b1578063715018a614620000d7578063728daa5614620000e3578063787e0ab714620001205780638da5cb5b1462000311575b600080fd5b620000bb620003aa565b604080516001600160a01b039092168252519081900360200190f35b620000e1620003b9565b005b6200010c60048036036020811015620000fb57600080fd5b50356001600160a01b03166200045f565b604080519115158252519081900360200190f35b620000bb600480360360e08110156200013857600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156200016457600080fd5b8201836020820111156200017757600080fd5b803590602001918460018302840111640100000000831117156200019a57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050640100000000811115620001ee57600080fd5b8201836020820111156200020157600080fd5b803590602001918460018302840111640100000000831117156200022457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929560ff8535169590949093506040810192506020013590506401000000008111156200028357600080fd5b8201836020820111156200029657600080fd5b80359060200191846001830284011164010000000083111715620002b957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b038335811694506020909301359092169150620004d09050565b620000bb620009cc565b6200010c600480360360208110156200033357600080fd5b50356001600160a01b0316620009db565b620000bb62000a44565b6200010c600480360360208110156200036657600080fd5b50356001600160a01b031662000a53565b620000bb62000abc565b620000e1600480360360208110156200039957600080fd5b50356001600160a01b031662000acb565b6001546001600160a01b031681565b620003c362000bc9565b6000546001600160a01b0390811691161462000415576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60006200046b62000bc9565b6000546001600160a01b03908116911614620004bd576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b620004c88262000bcd565b506001919050565b6000620004dc62000bc9565b6000546001600160a01b039081169116146200052e576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b60008787878787600260009054906101000a90046001600160a01b0316604051620005599062000da4565b8080602001806020018760ff16815260200180602001866001600160a01b03168152602001856001600160a01b0316815260200184810384528a818151815260200191508051906020019080838360005b83811015620005c4578181015183820152602001620005aa565b50505050905090810190601f168015620005f25780820380516001836020036101000a031916815260200191505b5084810383528951815289516020918201918b019080838360005b83811015620006275781810151838201526020016200060d565b50505050905090810190601f168015620006555780820380516001836020036101000a031916815260200191505b50848103825287518152875160209182019189019080838360005b838110156200068a57818101518382015260200162000670565b50505050905090810190601f168015620006b85780820380516001836020036101000a031916815260200191505b509950505050505050505050604051809103906000f080158015620006e1573d6000803e3d6000fd5b506001546040805163c2167d9360e01b81526001600160a01b03928316600482015290519293509083169163c2167d939160248082019260009290919082900301818387803b1580156200073457600080fd5b505af115801562000749573d6000803e3d6000fd5b50505050806001600160a01b0316632f2ff15d826001600160a01b031663a217fddf6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200079657600080fd5b505afa158015620007ab573d6000803e3d6000fd5b505050506040513d6020811015620007c257600080fd5b5051620007ce620009cc565b6040518363ffffffff1660e01b815260040180838152602001826001600160a01b0316815260200192505050600060405180830381600087803b1580156200081557600080fd5b505af11580156200082a573d6000803e3d6000fd5b505060015460408051634739f7e560e01b81526001600160a01b038e8116600483015286811660248301529151919092169350634739f7e59250604480830192600092919082900301818387803b1580156200088557600080fd5b505af11580156200089a573d6000803e3d6000fd5b50506002546040805163a013b1e760e01b81526001600160a01b038681166004830152915191909216935063a013b1e7925060248083019260209291908290030181600087803b158015620008ee57600080fd5b505af115801562000903573d6000803e3d6000fd5b505050506040513d60208110156200091a57600080fd5b50506003546040805163fd6fa52360e01b81526001600160a01b03848116600483015286811660248301529151919092169163fd6fa52391604480830192600092919082900301818387803b1580156200097357600080fd5b505af115801562000988573d6000803e3d6000fd5b50506040516001600160a01b03841692507f03b072abfe00ea20e83a84fdcf6d7cc2f1705b5830527ad279285180b898901a9150600090a298975050505050505050565b6000546001600160a01b031690565b6000620009e762000bc9565b6000546001600160a01b0390811691161462000a39576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b620004c88262000c6a565b6002546001600160a01b031681565b600062000a5f62000bc9565b6000546001600160a01b0390811691161462000ab1576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b620004c88262000d07565b6003546001600160a01b031681565b62000ad562000bc9565b6000546001600160a01b0390811691161462000b27576040805162461bcd60e51b8152602060048201819052602482015260008051602062003b2c833981519152604482015290519081900360640190fd5b6001600160a01b03811662000b6e5760405162461bcd60e51b815260040180806020018281038252602681526020018062003ab86026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6001600160a01b03811662000c145760405162461bcd60e51b815260040180806020018281038252602c81526020018062003b00602c913960400191505060405180910390fd5b6040516001600160a01b038216907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a2600280546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811662000cb15760405162461bcd60e51b815260040180806020018281038252602281526020018062003ade6022913960400191505060405180910390fd5b6040516001600160a01b038216907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a2600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811662000d4e5760405162461bcd60e51b815260040180806020018281038252602281526020018062003a966022913960400191505060405180910390fd5b6040516001600160a01b038216907f8116c854b06ef90c9d7aecf790f190e0a092e749cd31fceed9961a2c520d9e3090600090a2600180546001600160a01b0319166001600160a01b0392909216919091179055565b612ce38062000db38339019056fe60806040523480156200001157600080fd5b5060405162002ce338038062002ce3833981810160405260c08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604081815260208301519201805192949193919284640100000000821115620001c157600080fd5b908301906020820185811115620001d757600080fd5b8251640100000000811182820188101715620001f257600080fd5b82525081516020918201929091019080838360005b838110156200022157818101518382015260200162000207565b50505050905090810190601f1680156200024f5780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015188519294509250879187916200027c9160039185019062000645565b5080516200029290600490602084019062000645565b50506005805461ff001960ff199091166012171690555060ff8416620002ef576040805162461bcd60e51b815260206004820152600d60248201526c0646563696d616c73206973203609c1b604482015290519081900360640190fd5b6001600160a01b038216620003365760405162461bcd60e51b815260040180806020018281038252602181526020018062002cc26021913960400191505060405180910390fd5b6001600160a01b0381166200037d5760405162461bcd60e51b815260040180806020018281038252602681526020018062002c6d6026913960400191505060405180910390fd5b6200038884620003d7565b62000395600033620003ed565b620003a083620003fd565b620003ab82620004ae565b600880546001600160a01b0319166001600160a01b039290921691909117905550620006f19350505050565b6005805460ff191660ff92909216919091179055565b620003f982826200053f565b5050565b7f3300e9603e9fa499a45b30c1623801188345d913e84acf7f4c7383d36208baf4816040518080602001828103825283818151815260200191508051906020019080838360005b838110156200045e57818101518382015260200162000444565b50505050905090810190601f1680156200048c5780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051620003f990600990602084019062000645565b6001600160a01b038116620004f55760405162461bcd60e51b815260040180806020018281038252602f81526020018062002c93602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f41e7dcfdf7480ba435eb5598d22d93feb42a49a5efa3cd3a74bd67830df10adb90600090a250565b60008281526006602090815260409091206200056691839062001610620005ba821b17901c565b15620003f95762000576620005da565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620005d1836001600160a01b038416620005de565b90505b92915050565b3390565b6000620005ec83836200062d565b6200062457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620005d4565b506000620005d4565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200067d5760008555620006c8565b82601f106200069857805160ff1916838001178555620006c8565b82800160010185558215620006c8579182015b82811115620006c8578251825591602001919060010190620006ab565b50620006d6929150620006da565b5090565b5b80821115620006d65760008155600101620006db565b61256c80620007016000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80635c975abb1161011a57806398d9423e116100ad578063a9059cbb1161007c578063a9059cbb14610642578063c2167d931461066e578063ca15c87314610694578063d547741f146106b1578063dd62ed3e146106dd576101fb565b806398d9423e146105605780639c00867314610606578063a217fddf1461060e578063a457c2d714610616576101fb565b80638456cb59116100e95780638456cb59146105015780639010d07c1461050957806391d148541461052c57806395d89b4114610558576101fb565b80635c975abb1461048157806370a0823114610489578063728daa56146104af57806379cc6790146104d5576101fb565b8063313ce567116101925780633f4ba83a116101615780633f4ba83a1461043d5780633fc7293a1461044557806340c10f191461044d57806341ce724814610479576101fb565b8063313ce567146103a357806336568abe146103c15780633817c86c146103ed5780633950935114610411576101fb565b806318160ddd116101ce57806318160ddd1461030a57806323b872dd14610324578063248a9ca31461035a5780632f2ff15d14610377576101fb565b8063025c126e1461020057806306fdde0314610228578063095ea7b3146102a557806316967a10146102e5575b600080fd5b6102266004803603602081101561021657600080fd5b50356001600160a01b031661070b565b005b610230610768565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561026a578181015183820152602001610252565b50505050905090810190601f1680156102975780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102d1600480360360408110156102bb57600080fd5b506001600160a01b0381351690602001356107fe565b604080519115158252519081900360200190f35b6102ed61081c565b604080516001600160e01b03199092168252519081900360200190f35b610312610840565b60408051918252519081900360200190f35b6102d16004803603606081101561033a57600080fd5b506001600160a01b03813581169160208101359091169060400135610846565b6103126004803603602081101561037057600080fd5b5035610a3c565b6102266004803603604081101561038d57600080fd5b50803590602001356001600160a01b0316610a51565b6103ab610ab8565b6040805160ff9092168252519081900360200190f35b610226600480360360408110156103d757600080fd5b50803590602001356001600160a01b0316610ac1565b6103f5610b22565b604080516001600160a01b039092168252519081900360200190f35b6102d16004803603604081101561042757600080fd5b506001600160a01b038135169060200135610b31565b610226610b84565b610230610bda565b6102266004803603604081101561046357600080fd5b506001600160a01b038135169060200135610c68565b610312610eb8565b6102d1610eca565b6103126004803603602081101561049f57600080fd5b50356001600160a01b0316610ed8565b610226600480360360208110156104c557600080fd5b50356001600160a01b0316610ef3565b610226600480360360408110156104eb57600080fd5b506001600160a01b038135169060200135610fda565b6102266111ab565b6103f56004803603604081101561051f57600080fd5b50803590602001356111ff565b6102d16004803603604081101561054257600080fd5b50803590602001356001600160a01b031661121e565b610230611236565b6102266004803603602081101561057657600080fd5b81019060208101813564010000000081111561059157600080fd5b8201836020820111156105a357600080fd5b803590602001918460018302840111640100000000831117156105c557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611297945050505050565b6103f56112ec565b6103126112fb565b6102d16004803603604081101561062c57600080fd5b506001600160a01b038135169060200135611300565b6102d16004803603604081101561065857600080fd5b506001600160a01b038135169060200135611368565b6102266004803603602081101561068457600080fd5b50356001600160a01b031661155d565b610312600480360360208110156106aa57600080fd5b5035611575565b610226600480360360408110156106c757600080fd5b50803590602001356001600160a01b031661158c565b610312600480360360408110156106f357600080fd5b506001600160a01b03813581169160200135166115e5565b61071d6000610718611625565b61121e565b61075c576040805162461bcd60e51b815260206004820152601c60248201526000805160206122a9833981519152604482015290519081900360640190fd5b61076581611629565b50565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107f45780601f106107c9576101008083540402835291602001916107f4565b820191906000526020600020905b8154815290600101906020018083116107d757829003601f168201915b5050505050905090565b600061081261080b611625565b84846116b8565b5060015b92915050565b7fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b81565b60025490565b6007546000906001600160a01b0316635c50893a610862611625565b306000356001600160e01b0319166108786117a4565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156108f25781810151838201526020016108da565b50505050905090810190601f16801561091f5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561094157600080fd5b505af1158015610955573d6000803e3d6000fd5b505050506040513d602081101561096b57600080fd5b50516109ac576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b7833981519152604482015290519081900360640190fd5b6109b78484846117e3565b506008546040805163375586b960e21b81526001600160a01b03878116600483015263a9059cbb60e01b6024830152604482018690529151919092169163dd561ae491606480830192600092919082900301818387803b158015610a1a57600080fd5b505af1158015610a2e573d6000803e3d6000fd5b506001979650505050505050565b60009081526006602052604090206002015490565b600082815260066020526040902060020154610a6f90610718611625565b610aaa5760405162461bcd60e51b815260040180806020018281038252602f8152602001806122c9602f913960400191505060405180910390fd5b610ab48282611865565b5050565b60055460ff1690565b610ac9611625565b6001600160a01b0316816001600160a01b031614610b185760405162461bcd60e51b815260040180806020018281038252602f8152602001806124de602f913960400191505060405180910390fd5b610ab482826118ce565b6007546001600160a01b031681565b6000610812610b3e611625565b84610b7f8560016000610b4f611625565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490611937565b6116b8565b610b916000610718611625565b610bd0576040805162461bcd60e51b815260206004820152601c60248201526000805160206122a9833981519152604482015290519081900360640190fd5b610bd8611991565b565b6009805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610c605780601f10610c3557610100808354040283529160200191610c60565b820191906000526020600020905b815481529060010190602001808311610c4357829003601f168201915b505050505081565b610c8260008051602061242f833981519152610718611625565b610ccc576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a610ce5611625565b306000356001600160e01b031916610cfb6117a4565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610d75578181015183820152602001610d5d565b50505050905090810190601f168015610da25780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610dc457600080fd5b505af1158015610dd8573d6000803e3d6000fd5b505050506040513d6020811015610dee57600080fd5b5051610e2f576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b7833981519152604482015290519081900360640190fd5b610e398282611a35565b6008546040805163375586b960e21b8152326004820152600080356001600160e01b03191660248301526044820185905291516001600160a01b039093169263dd561ae49260648084019391929182900301818387803b158015610e9c57600080fd5b505af1158015610eb0573d6000803e3d6000fd5b505050505050565b60008051602061242f83398151915281565b600554610100900460ff1690565b6001600160a01b031660009081526020819052604090205490565b610f006000610718611625565b610f3f576040805162461bcd60e51b815260206004820152601c60248201526000805160206122a9833981519152604482015290519081900360640190fd5b6001600160a01b038116610f845760405162461bcd60e51b81526004018080602001828103825260268152602001806122f86026913960400191505060405180910390fd5b6040516001600160a01b038216907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a2600880546001600160a01b0319166001600160a01b0392909216919091179055565b610ff460008051602061242f833981519152610718611625565b61103e576040805162461bcd60e51b81526020600482015260166024820152756d7573742068617665207772617070657220726f6c6560501b604482015290519081900360640190fd5b6007546001600160a01b0316635c50893a611057611625565b306000356001600160e01b03191661106d6117a4565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156110e75781810151838201526020016110cf565b50505050905090810190601f1680156111145780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561113657600080fd5b505af115801561114a573d6000803e3d6000fd5b505050506040513d602081101561116057600080fd5b50516111a1576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b7833981519152604482015290519081900360640190fd5b610e398282611b25565b6111b86000610718611625565b6111f7576040805162461bcd60e51b815260206004820152601c60248201526000805160206122a9833981519152604482015290519081900360640190fd5b610bd8611c21565b60008281526006602052604081206112179083611ca9565b9392505050565b60008281526006602052604081206112179083611cb5565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107f45780601f106107c9576101008083540402835291602001916107f4565b6112a46000610718611625565b6112e3576040805162461bcd60e51b815260206004820152601c60248201526000805160206122a9833981519152604482015290519081900360640190fd5b61076581611cca565b6008546001600160a01b031681565b600081565b600061081261130d611625565b84610b7f856040518060600160405280602581526020016124b96025913960016000611337611625565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611d76565b6007546000906001600160a01b0316635c50893a611384611625565b306000356001600160e01b03191661139a6117a4565b6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001836001600160e01b031916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156114145781810151838201526020016113fc565b50505050905090810190601f1680156114415780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561146357600080fd5b505af1158015611477573d6000803e3d6000fd5b505050506040513d602081101561148d57600080fd5b50516114ce576040805162461bcd60e51b815260206004820152601c60248201526000805160206123b7833981519152604482015290519081900360640190fd5b6114d88383611e0d565b506008546040805163375586b960e21b8152326004820152600080356001600160e01b03191660248301526044820186905291516001600160a01b039093169263dd561ae49260648084019391929182900301818387803b15801561153c57600080fd5b505af1158015611550573d6000803e3d6000fd5b5060019695505050505050565b61076560008051602061242f83398151915282610a51565b600081815260066020526040812061081690611e21565b6000828152600660205260409020600201546115aa90610718611625565b610b185760405162461bcd60e51b81526004018080602001828103825260308152602001806123d76030913960400191505060405180910390fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6000611217836001600160a01b038416611e2c565b3390565b6001600160a01b03811661166e5760405162461bcd60e51b815260040180806020018281038252602f815260200180612388602f913960400191505060405180910390fd5b600780546001600160a01b0319166001600160a01b0383169081179091556040517f41e7dcfdf7480ba435eb5598d22d93feb42a49a5efa3cd3a74bd67830df10adb90600090a250565b6001600160a01b0383166116fd5760405162461bcd60e51b81526004018080602001828103825260248152602001806124956024913960400191505060405180910390fd5b6001600160a01b0382166117425760405162461bcd60e51b81526004018080602001828103825260228152602001806123406022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60606000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092935050505090565b60006117f0848484611e76565b61185b846117fc611625565b610b7f85604051806060016040528060288152602001612407602891396001600160a01b038a1660009081526001602052604081209061183a611625565b6001600160a01b031681526020810191909152604001600020549190611d76565b5060019392505050565b600082815260066020526040902061187d9082611610565b15610ab45761188a611625565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526006602052604090206118e69082611fd1565b15610ab4576118f3611625565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b600082820183811015611217576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600554610100900460ff166119e4576040805162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015290519081900360640190fd5b6005805461ff00191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611a18611625565b604080516001600160a01b039092168252519081900360200190a1565b6001600160a01b038216611a90576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611a9c60008383611fe6565b600254611aa99082611937565b6002556001600160a01b038216600090815260208190526040902054611acf9082611937565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038216611b6a5760405162461bcd60e51b815260040180806020018281038252602181526020018061244f6021913960400191505060405180910390fd5b611b7682600083611fe6565b611bb38160405180606001604052806022815260200161231e602291396001600160a01b0385166000908152602081905260409020549190611d76565b6001600160a01b038316600090815260208190526040902055600254611bd9908261203a565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b600554610100900460ff1615611c71576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b6005805461ff0019166101001790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611a18611625565b6000611217838361207c565b6000611217836001600160a01b0384166120e0565b7f3300e9603e9fa499a45b30c1623801188345d913e84acf7f4c7383d36208baf4816040518080602001828103825283818151815260200191508051906020019080838360005b83811015611d29578181015183820152602001611d11565b50505050905090810190601f168015611d565780820380516001836020036101000a031916815260200191505b509250505060405180910390a18051610ab49060099060208401906121c2565b60008184841115611e055760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611dca578181015183820152602001611db2565b50505050905090810190601f168015611df75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000610812611e1a611625565b8484611e76565b6000610816826120f8565b6000611e3883836120e0565b611e6e57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610816565b506000610816565b6001600160a01b038316611ebb5760405162461bcd60e51b81526004018080602001828103825260258152602001806124706025913960400191505060405180910390fd5b6001600160a01b038216611f005760405162461bcd60e51b81526004018080602001828103825260238152602001806122866023913960400191505060405180910390fd5b611f0b838383611fe6565b611f4881604051806060016040528060268152602001612362602691396001600160a01b0386166000908152602081905260409020549190611d76565b6001600160a01b038085166000908152602081905260408082209390935590841681522054611f779082611937565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000611217836001600160a01b0384166120fc565b611ff1838383612035565b611ff9610eca565b156120355760405162461bcd60e51b815260040180806020018281038252602a81526020018061250d602a913960400191505060405180910390fd5b505050565b600061121783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611d76565b815460009082106120be5760405162461bcd60e51b81526004018080602001828103825260228152602001806122646022913960400191505060405180910390fd5b8260000182815481106120cd57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b600081815260018301602052604081205480156121b8578354600019808301919081019060009087908390811061212f57fe5b906000526020600020015490508087600001848154811061214c57fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061217c57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610816565b6000915050610816565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826121f8576000855561223e565b82601f1061221157805160ff191683800117855561223e565b8280016001018555821561223e579182015b8281111561223e578251825591602001919060010190612223565b5061224a92915061224e565b5090565b5b8082111561224a576000815560010161224f56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f20616464726573736d75737420686176652064656661756c742061646d696e20726f6c6500000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e746f7065726174696f6e73526567697374727920697320746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373417574686f72697a61626c653a206e6f7420617574686f72697a656400000000416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63659f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a645524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c6645524332305061757361626c653a20746f6b656e207472616e73666572207768696c6520706175736564a26469706673582212202680155c23dab9aa04f893bfc4adbf914635f09644e45cb1d7cf68eff784ba6464736f6c634300070400336f7065726174696f6e73526567697374727920697320746865207a65726f2061646472657373417574686f72697a61626c653a20617574686f72697a6174696f6e20697320746865207a65726f2061646472657373617574686f72697a6174696f6e20697320746865207a65726f206164647265737378546f6b656e207772617070657220697320746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373657572207072696365206665656420697320746865207a65726f20616464726573736f7065726174696f6e73207265676973747279206665656420697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a26469706673582212201dcd930d0e191b14bf0cf435e46efba2602b84e29d9df816bd6b7e62abf4632b64736f6c6343000704003378546f6b656e207772617070657220697320746865207a65726f2061646472657373657572207072696365206665656420697320746865207a65726f20616464726573736f7065726174696f6e73207265676973747279206665656420697320746865207a65726f2061646472657373";