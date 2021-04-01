/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { OperationsRegistry } from "../OperationsRegistry";

export class OperationsRegistry__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): Promise<OperationsRegistry> {
    return super.deploy(
      _eurPriceFeed,
      overrides || {}
    ) as Promise<OperationsRegistry>;
  }
  getDeployTransaction(
    _eurPriceFeed: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_eurPriceFeed, overrides || {});
  }
  attach(address: string): OperationsRegistry {
    return super.attach(address) as OperationsRegistry;
  }
  connect(signer: Signer): OperationsRegistry__factory {
    return super.connect(signer) as OperationsRegistry__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OperationsRegistry {
    return new Contract(address, _abi, signerOrProvider) as OperationsRegistry;
  }
}

const _abi = [
  {
    inputs: [
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
        name: "asset",
        type: "address",
      },
    ],
    name: "AssetAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "AssetDisallowed",
    type: "event",
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
    name: "EurPriceFeedSet",
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
    inputs: [],
    name: "ASSETS_MANAGER_ROLE",
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
    name: "FEED_MANAGER_ROLE",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_operation",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "allowAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowedAssets",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "disallowAsset",
    outputs: [],
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
        name: "_account",
        type: "address",
      },
    ],
    name: "setAssetsManager",
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
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "setFeedManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    name: "tradingBalanceByOperation",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200115138038062001151833981810160405260208110156200003757600080fd5b50516001600160a01b038116620000805760405162461bcd60e51b81526004018080602001828103825260228152602001806200112f6022913960400191505060405180910390fd5b6040516001600160a01b038216907f1870035ee2b4467ef5006d1f683f416847a3836a4a02ed0a665f3f0d058bc7ec90600090a2600180546001600160a01b0319166001600160a01b038316179055620000dc600033620000e3565b50620001f7565b620000ef8282620000f3565b5050565b6000828152602081815260409091206200011891839062000aea6200016c821b17901c565b15620000ef57620001286200018c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000183836001600160a01b03841662000190565b90505b92915050565b3390565b60006200019e8383620001df565b620001d65750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000186565b50600062000186565b60009081526001919091016020526040902054151590565b610f2880620002076000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063a217fddf116100ad578063d15a9e3811610071578063d15a9e381461034f578063d547741f14610375578063dd561ae4146103a1578063e7592c60146103dd578063fd29a155146103e557610121565b8063a217fddf146102a8578063a4c1cccb146102b0578063b7c5ba6e146102d6578063bfac80851461030c578063ca15c8731461033257610121565b80639010d07c116100f45780639010d07c146101d557806391d148541461021457806398e39360146102545780639b00f17f1461025c578063a013b1e71461028257610121565b80632298d84914610126578063248a9ca31461014e5780632f2ff15d1461017d57806336568abe146101a9575b600080fd5b61014c6004803603602081101561013c57600080fd5b50356001600160a01b03166103ed565b005b61016b6004803603602081101561016457600080fd5b5035610509565b60408051918252519081900360200190f35b61014c6004803603604081101561019357600080fd5b50803590602001356001600160a01b031661051e565b61014c600480360360408110156101bf57600080fd5b50803590602001356001600160a01b0316610585565b6101f8600480360360408110156101eb57600080fd5b50803590602001356105e6565b604080516001600160a01b039092168252519081900360200190f35b6102406004803603604081101561022a57600080fd5b50803590602001356001600160a01b0316610607565b604080519115158252519081900360200190f35b61016b61061f565b61014c6004803603602081101561027257600080fd5b50356001600160a01b0316610643565b61014c6004803603602081101561029857600080fd5b50356001600160a01b031661075b565b61016b610875565b610240600480360360208110156102c657600080fd5b50356001600160a01b031661087a565b61016b600480360360408110156102ec57600080fd5b5080356001600160a01b031690602001356001600160e01b03191661088f565b61014c6004803603602081101561032257600080fd5b50356001600160a01b03166108ac565b61016b6004803603602081101561034857600080fd5b50356108c7565b61014c6004803603602081101561036557600080fd5b50356001600160a01b03166108de565b61014c6004803603604081101561038b57600080fd5b50803590602001356001600160a01b0316610908565b61014c600480360360608110156103b757600080fd5b506001600160a01b03813516906001600160e01b03196020820135169060400135610961565b6101f8610ac9565b61016b610ad8565b61040c600080516020610e23833981519152610407610aff565b610607565b61045d576040805162461bcd60e51b815260206004820152601c60248201527f6d7573742068617665206173736574206d616e6167657220726f6c6500000000604482015290519081900360640190fd5b6001600160a01b0381166104b4576040805162461bcd60e51b8152602060048201526019602482015278617373657420697320746865207a65726f206164647265737360381b604482015290519081900360640190fd5b6040516001600160a01b038216907f64f770173a842a91a8c4549d8c5f35cfeaf6a5eb4c115fe4e71bf43c7ac6f6f190600090a26001600160a01b03166000908152600260205260409020805460ff19169055565b60009081526020819052604090206002015490565b60008281526020819052604090206002015461053c90610407610aff565b6105775760405162461bcd60e51b815260040180806020018281038252602f815260200180610e43602f913960400191505060405180910390fd5b6105818282610b03565b5050565b61058d610aff565b6001600160a01b0316816001600160a01b0316146105dc5760405162461bcd60e51b815260040180806020018281038252602f815260200180610ec4602f913960400191505060405180910390fd5b6105818282610b6c565b60008281526020819052604081206105fe9083610bd5565b90505b92915050565b60008281526020819052604081206105fe9083610be1565b7fddbe48f52bb812894c8051224ff4457244fc2b78c8caa3e39179c65d4b6de41281565b61066f7fddbe48f52bb812894c8051224ff4457244fc2b78c8caa3e39179c65d4b6de412610407610aff565b6106c0576040805162461bcd60e51b815260206004820152601b60248201527f6d75737420686176652066656564206d616e6167657220726f6c650000000000604482015290519081900360640190fd5b6001600160a01b0381166107055760405162461bcd60e51b8152600401808060200182810382526022815260200180610ea26022913960400191505060405180910390fd5b6040516001600160a01b038216907f1870035ee2b4467ef5006d1f683f416847a3836a4a02ed0a665f3f0d058bc7ec90600090a2600180546001600160a01b0319166001600160a01b0392909216919091179055565b610775600080516020610e23833981519152610407610aff565b6107c6576040805162461bcd60e51b815260206004820152601c60248201527f6d7573742068617665206173736574206d616e6167657220726f6c6500000000604482015290519081900360640190fd5b6001600160a01b03811661081d576040805162461bcd60e51b8152602060048201526019602482015278617373657420697320746865207a65726f206164647265737360381b604482015290519081900360640190fd5b6040516001600160a01b038216907f0e057436ecd2dd0d29eb1335ca540924d1457bbe2b040289a04d7731b8c93f3690600090a26001600160a01b03166000908152600260205260409020805460ff19166001179055565b600081565b60026020526000908152604090205460ff1681565b600360209081526000928352604080842090915290825290205481565b6108c4600080516020610e238339815191528261051e565b50565b600081815260208190526040812061060190610bf6565b6108c47fddbe48f52bb812894c8051224ff4457244fc2b78c8caa3e39179c65d4b6de4128261051e565b60008281526020819052604090206002015461092690610407610aff565b6105dc5760405162461bcd60e51b8152600401808060200182810382526030815260200180610e726030913960400191505060405180910390fd5b6002600061096d610aff565b6001600160a01b0316815260208101919091526040016000205460ff166109d2576040805162461bcd60e51b8152602060048201526014602482015273185cdcd95d081a5cc81b9bdd08185b1b1bddd95960621b604482015290519081900360640190fd5b6001600160a01b0380841660009081526003602090815260408083206001600160e01b0319871684529091529020546001549091610a9091166329550f97610a18610aff565b856040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b158015610a5d57600080fd5b505afa158015610a71573d6000803e3d6000fd5b505050506040513d6020811015610a8757600080fd5b50518290610c01565b6001600160a01b0390941660009081526003602090815260408083206001600160e01b0319909616835294905292909220929092555050565b6001546001600160a01b031681565b600080516020610e2383398151915281565b60006105fe836001600160a01b038416610c5b565b3390565b6000828152602081905260409020610b1b9082610aea565b1561058157610b28610aff565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610b849082610ca5565b1561058157610b91610aff565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006105fe8383610cba565b60006105fe836001600160a01b038416610d1e565b600061060182610d36565b6000828201838110156105fe576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000610c678383610d1e565b610c9d57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610601565b506000610601565b60006105fe836001600160a01b038416610d3a565b81546000908210610cfc5760405162461bcd60e51b8152600401808060200182810382526022815260200180610e016022913960400191505060405180910390fd5b826000018281548110610d0b57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b60008181526001830160205260408120548015610df65783546000198083019190810190600090879083908110610d6d57fe5b9060005260206000200154905080876000018481548110610d8a57fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080610dba57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610601565b600091505061060156fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734f4f5524afb308b5b7d93e9db2970fe05210199d5c49009f4e0debab7fc41d0e416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65657572207072696365206665656420697320746865207a65726f2061646472657373416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a264697066735822122098e397afde84e91956af28f3d037d1683b82658807f7569a9d6e66e8f1b6aee264736f6c63430007040033657572207072696365206665656420697320746865207a65726f2061646472657373";
