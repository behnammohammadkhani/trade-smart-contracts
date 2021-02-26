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
    name: "REJECTED_ID",
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
      {
        internalType: "bool",
        name: "_paused",
        type: "bool",
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
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506119ee806100206000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80639b00f17f116100de578063cf91d79a11610097578063e7592c6011610071578063e7592c6014610382578063ee98faf11461038a578063eea39f7914610392578063f2fde38b146103d657610173565b8063cf91d79a14610355578063d379a0d91461035d578063d9d7b4721461037a57610173565b80639b00f17f146103075780639c0086731461032d578063ab8c71c014610335578063c6b6c17a1461033d578063c774012114610345578063cbbc66ef1461034d57610173565b80635c975abb116101305780635c975abb1461029d578063632d877c146102a5578063715018a6146102ad578063728daa56146102b55780638456cb59146102db5780638da5cb5b146102e357610173565b806316967a10146101785780632d703a091461019d5780633cd0ad0b146101b75780633f4ba83a146101bf578063456d28d9146101c95780635c50893a14610203575b600080fd5b6101806103fc565b604080516001600160e01b03199092168252519081900360200190f35b6101a5610420565b60408051918252519081900360200190f35b6101a5610425565b6101c761042b565b005b6101ef600480360360208110156101df57600080fd5b50356001600160a01b0316610517565b604080519115158252519081900360200190f35b6101ef6004803603608081101561021957600080fd5b6001600160a01b0382358116926020810135909116916001600160e01b0319604083013516919081019060808101606082013564010000000081111561025e57600080fd5b82018360208201111561027057600080fd5b8035906020019184600183028401116401000000008311171561029257600080fd5b509092509050610625565b6101ef6107e5565b6101806107ee565b6101c7610812565b6101ef600480360360208110156102cb57600080fd5b50356001600160a01b03166108b4565b6101c76109ac565b6102eb610a7b565b604080516001600160a01b039092168252519081900360200190f35b6101ef6004803603602081101561031d57600080fd5b50356001600160a01b0316610a8a565b6102eb610b82565b6102eb610b91565b6101a5610ba0565b610180610ba5565b6101a5610bc9565b610180610bce565b6101ef6004803603602081101561037357600080fd5b5035610bf2565b6101a5610ccf565b6102eb610cd4565b610180610ce3565b6101c7600480360360a08110156103a857600080fd5b506001600160a01b038135811691602081013582169160408201351690606081013590608001351515610d07565b6101c7600480360360208110156103ec57600080fd5b50356001600160a01b0316611006565b7fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b81565b600281565b60685481565b6104336110ff565b6033546001600160a01b03908116911614610483576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b60695460ff166104c7576040805162461bcd60e51b815260206004820152600a6024820152691b9bdd081c185d5cd95960b21b604482015290519081900360640190fd5b6069805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6104fa6110ff565b604080516001600160a01b039092168252519081900360200190a1565b60006105216110ff565b6033546001600160a01b03908116911614610571576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b6001600160a01b0382166105cc576040805162461bcd60e51b815260206004820152601f60248201527f7065726d697373696f6e7320697320746865207a65726f206164647265737300604482015290519081900360640190fd5b6040516001600160a01b038316907fbff2119d06e0f2b11a0132f0264e61554a930f0113f77cc9fbf9bba23baca86390600090a250606580546001600160a01b0383166001600160a01b03199091161790556001919050565b60695460009060ff161561063b575060006107dc565b6001600160e01b0319841663a9059cbb60e01b148061066a57506001600160e01b031984166323b872dd60e01b145b8061068557506001600160e01b031984166340c10f1960e01b145b806106a057506001600160e01b0319841663079cc67960e41b145b156107d857858460006001600160e01b0319821663a9059cbb60e01b14156106e85760006106d1866004818a6118d4565b60408110156106df57600080fd5b50602001359150505b6001600160e01b031987166340c10f1960e01b148061071757506001600160e01b0319871663079cc67960e41b145b156107515760008061072c876004818b6118d4565b604081101561073a57600080fd5b506001600160a01b03813516955060200135925050505b6001600160e01b031987166323b872dd60e01b14156107c25760008061077a876004818b6118d4565b606081101561078857600080fd5b506001600160a01b0381351695507fa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b945060400135925050505b6107ce83898484611103565b93505050506107dc565b5060005b95945050505050565b60695460ff1681565b7f23b872dd7302113369cda2901243429419bec145408fa8b352b3dd92b66c680b81565b61081a6110ff565b6033546001600160a01b0390811691161461086a576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b60006108be6110ff565b6033546001600160a01b0390811691161461090e576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b6001600160a01b0382166109535760405162461bcd60e51b81526004018080602001828103825260268152602001806119936026913960400191505060405180910390fd5b6040516001600160a01b038316907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a250606780546001600160a01b0383166001600160a01b03199091161790556001919050565b6109b46110ff565b6033546001600160a01b03908116911614610a04576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b60695460ff1615610a45576040805162461bcd60e51b81526020600482015260066024820152651c185d5cd95960d21b604482015290519081900360640190fd5b6069805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586104fa6110ff565b6033546001600160a01b031690565b6000610a946110ff565b6033546001600160a01b03908116911614610ae4576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b6001600160a01b038216610b295760405162461bcd60e51b81526004018080602001828103825260228152602001806119236022913960400191505060405180910390fd5b6040516001600160a01b038316907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a250606680546001600160a01b0383166001600160a01b03199091161790556001919050565b6067546001600160a01b031681565b6065546001600160a01b031681565b600181565b7f79cc679044ee9a2021f0a26c0fdec02ac39179cd005bb971a471b7f9f17c576c81565b600381565b7f40c10f19c047ae7dfa66d6312b683d2ea3dfbcb4159e96b967c5f4b0a86f284281565b6000610bfc6110ff565b6033546001600160a01b03908116911614610c4c576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b81610c93576040805162461bcd60e51b8152602060048201526012602482015271074726164696e67206c696d697420697320360741b604482015290519081900360640190fd5b6040805183815290517f8170ba631b67fd88957dab2403b6fbb84c89a338bdfda451038014f2f72f01c79181900360200190a150606855600190565b600081565b6066546001600160a01b031681565b7f095ea7b334ae44009aa867bfb386f5c3b4b443ac6f0ee573fa91c4608fbadfba81565b600054610100900460ff1680610d205750610d20611622565b80610d2e575060005460ff16155b610d695760405162461bcd60e51b815260040180806020018281038252602e815260200180611945602e913960400191505060405180910390fd5b600054610100900460ff16158015610d94576000805460ff1961ff0019909116610100171660011790555b6001600160a01b038616610def576040805162461bcd60e51b815260206004820152601f60248201527f7065726d697373696f6e7320697320746865207a65726f206164647265737300604482015290519081900360640190fd5b6001600160a01b038516610e345760405162461bcd60e51b81526004018080602001828103825260228152602001806119236022913960400191505060405180910390fd5b6001600160a01b038416610e795760405162461bcd60e51b81526004018080602001828103825260268152602001806119936026913960400191505060405180910390fd5b82610ec0576040805162461bcd60e51b8152602060048201526012602482015271074726164696e67206c696d697420697320360741b604482015290519081900360640190fd5b606580546001600160a01b03199081166001600160a01b03898116919091179092556066805482168884161790556067805490911691861691909117905560688390556069805460ff1916831515179055610f19611628565b6065546040516001600160a01b03909116907fbff2119d06e0f2b11a0132f0264e61554a930f0113f77cc9fbf9bba23baca86390600090a26040516001600160a01b038616907f336e2f7fc520f6a7f2dac013282afb0ed3ba6d85e10cbce0de46ccc4af95b56b90600090a26040516001600160a01b038516907fc51d89660930dc25e6e979da94ba13765606a557502232b4e6ea0fd9157c943a90600090a26040805184815290517f8170ba631b67fd88957dab2403b6fbb84c89a338bdfda451038014f2f72f01c79181900360200190a18015610ffe576000805461ff00191690555b505050505050565b61100e6110ff565b6033546001600160a01b0390811691161461105e576040805162461bcd60e51b81526020600482018190526024820152600080516020611973833981519152604482015290519081900360640190fd5b6001600160a01b0381166110a35760405162461bcd60e51b81526004018080602001828103825260268152602001806118fd6026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b60408051600480825260a082019092526000916060919060208201608080368337019050509050858160008151811061113857fe5b60200260200101906001600160a01b031690816001600160a01b031681525050858160018151811061116657fe5b60200260200101906001600160a01b031690816001600160a01b031681525050858160028151811061119457fe5b60200260200101906001600160a01b031690816001600160a01b03168152505085816003815181106111c257fe5b6001600160a01b039290921660209283029190910182015260408051600480825260a08201909252606092909190820160808036833701905050905060018160008151811061120d57fe5b60200260200101818152505060028160018151811061122857fe5b60200260200101818152505060008160028151811061124357fe5b60200260200101818152505060038160038151811061125e57fe5b602090810291909101810191909152606554604080516313849cfd60e21b8152600481019182528551604482015285516060946001600160a01b0390941693634e1273f4938893889391928392602483019260640191878101910280838360005b838110156112d75781810151838201526020016112bf565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156113165781810151838201526020016112fe565b5050505090500194505050505060006040518083038186803b15801561133b57600080fd5b505afa15801561134f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052602081101561137857600080fd5b810190808051604051939291908464010000000082111561139857600080fd5b9083019060208201858111156113ad57600080fd5b82518660208202830111640100000000821117156113ca57600080fd5b82525081516020918201928201910280838360005b838110156113f75781810151838201526020016113df565b50505050905001604052505050905060008160028151811061141557fe5b6020026020010151111561142f576000935050505061161a565b60008160038151811061143e57fe5b6020026020010151111561147d576001600160e01b0319861663079cc67960e41b1415611471576001935050505061161a565b6000935050505061161a565b60008160018151811061148c57fe5b602002602001015111156114a6576001935050505061161a565b60675460408051635be2dd3760e11b81526001600160a01b038b811660048301526001600160e01b03198a1660248301529151600093929092169163b7c5ba6e91604480820192602092909190829003018186803b15801561150757600080fd5b505afa15801561151b573d6000803e3d6000fd5b505050506040513d602081101561153157600080fd5b5051606654604080516329550f9760e01b81526001600160a01b038c81166004830152602482018b9052915193945060009391909216916329550f97916044808301926020929190829003018186803b15801561158d57600080fd5b505afa1580156115a1573d6000803e3d6000fd5b505050506040513d60208110156115b757600080fd5b50519050806115ce5760009550505050505061161a565b6000836000815181106115dd57fe5b60200260200101511180156115fd57506068546115fa83836116da565b11155b156116105760019550505050505061161a565b6000955050505050505b949350505050565b303b1590565b600054610100900460ff16806116415750611641611622565b8061164f575060005460ff16155b61168a5760405162461bcd60e51b815260040180806020018281038252602e815260200180611945602e913960400191505060405180910390fd5b600054610100900460ff161580156116b5576000805460ff1961ff0019909116610100171660011790555b6116bd61173b565b6116c56117db565b80156116d7576000805461ff00191690555b50565b600082820183811015611734576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b600054610100900460ff16806117545750611754611622565b80611762575060005460ff16155b61179d5760405162461bcd60e51b815260040180806020018281038252602e815260200180611945602e913960400191505060405180910390fd5b600054610100900460ff161580156116c5576000805460ff1961ff00199091166101001716600117905580156116d7576000805461ff001916905550565b600054610100900460ff16806117f457506117f4611622565b80611802575060005460ff16155b61183d5760405162461bcd60e51b815260040180806020018281038252602e815260200180611945602e913960400191505060405180910390fd5b600054610100900460ff16158015611868576000805460ff1961ff0019909116610100171660011790555b60006118726110ff565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35080156116d7576000805461ff001916905550565b600080858511156118e3578182fd5b838611156118ef578182fd5b505082019391909203915056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373657572207072696365206665656420697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a65644f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726f7065726174696f6e20726567697374727920697320746865207a65726f2061646472657373a2646970667358221220d4b3c4e13fd2596014b114a2ae2f04b74f4b38d01ed829ca078ff109a702eb3164736f6c63430007040033";