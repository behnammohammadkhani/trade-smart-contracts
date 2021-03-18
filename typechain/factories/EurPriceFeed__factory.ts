/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { EurPriceFeed } from "../EurPriceFeed";

export class EurPriceFeed__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _eurUsdFeed: string,
    _ethUsdFeed: string,
    _assets: string[],
    _feeds: string[],
    overrides?: Overrides
  ): Promise<EurPriceFeed> {
    return super.deploy(
      _eurUsdFeed,
      _ethUsdFeed,
      _assets,
      _feeds,
      overrides || {}
    ) as Promise<EurPriceFeed>;
  }
  getDeployTransaction(
    _eurUsdFeed: string,
    _ethUsdFeed: string,
    _assets: string[],
    _feeds: string[],
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _eurUsdFeed,
      _ethUsdFeed,
      _assets,
      _feeds,
      overrides || {}
    );
  }
  attach(address: string): EurPriceFeed {
    return super.attach(address) as EurPriceFeed;
  }
  connect(signer: Signer): EurPriceFeed__factory {
    return super.connect(signer) as EurPriceFeed__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EurPriceFeed {
    return new Contract(address, _abi, signerOrProvider) as EurPriceFeed;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_eurUsdFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ethUsdFeed",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_feeds",
        type: "address[]",
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
      {
        indexed: true,
        internalType: "address",
        name: "feed",
        type: "address",
      },
    ],
    name: "AssetEthFeedSetted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newEthUsdFeed",
        type: "address",
      },
    ],
    name: "EthUsdFeedSetted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newEurUsdFeed",
        type: "address",
      },
    ],
    name: "EurUsdFeedSetted",
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
    name: "FEEDS_MANAGER_ROLE",
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
        name: "",
        type: "address",
      },
    ],
    name: "assetEthFeed",
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
        name: "_asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "calculateAmount",
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
    name: "ethUsdFeed",
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
    name: "eurUsdFeed",
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
        name: "_asset",
        type: "address",
      },
    ],
    name: "getPrice",
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
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feed",
        type: "address",
      },
    ],
    name: "setAssetFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_feeds",
        type: "address[]",
      },
    ],
    name: "setAssetsFeeds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ethUsdFeed",
        type: "address",
      },
    ],
    name: "setEthUsdFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_eurUsdFeed",
        type: "address",
      },
    ],
    name: "setEurUsdFeed",
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
    name: "setFeedsManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001b3038038062001b30833981810160405260808110156200003757600080fd5b815160208301516040808501805191519395929483019291846401000000008211156200006357600080fd5b9083019060208201858111156200007957600080fd5b82518660208202830111640100000000821117156200009757600080fd5b82525081516020918201928201910280838360005b83811015620000c6578181015183820152602001620000ac565b5050505090500160405260200180516040519392919084640100000000821115620000f057600080fd5b9083019060208201858111156200010657600080fd5b82518660208202830111640100000000821117156200012457600080fd5b82525081516020918201928201910280838360005b838110156200015357818101518382015260200162000139565b5050505091909101604052505050506001600160a01b038416620001a95760405162461bcd60e51b815260040180806020018281038252602681526020018062001ae46026913960400191505060405180910390fd5b6001600160a01b038316620001f05760405162461bcd60e51b815260040180806020018281038252602681526020018062001b0a6026913960400191505060405180910390fd5b600280546001600160a01b0319166001600160a01b0386169081179091556040517f742b3776766d8f6d814e5363b7c38a17ccd9564730c02d114e87dddc6c1d2b1e90600090a2600380546001600160a01b0319166001600160a01b0385169081179091556040517f75da58c4a3315dac4ccd4a65866d6b27cfc75d895da90313d50362d3834e098c90600090a26200028b600033620002a1565b620002978282620002b1565b5050505062000572565b620002ad828262000348565b5050565b8051825114620002f35760405162461bcd60e51b815260040180806020018281038252602281526020018062001ac26022913960400191505060405180910390fd5b60005b825181101562000343576200033a8382815181106200031157fe5b60200260200101518383815181106200032657fe5b6020026020010151620003c160201b60201c565b600101620002f6565b505050565b6000828152602081815260409091206200036d91839062000a26620004e7821b17901c565b15620002ad576200037d62000507565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6001600160a01b0382166200041d576040805162461bcd60e51b815260206004820152601960248201527f617373657420697320746865207a65726f206164647265737300000000000000604482015290519081900360640190fd5b6001600160a01b03811662000479576040805162461bcd60e51b815260206004820152601e60248201527f6173736574206665656420697320746865207a65726f20616464726573730000604482015290519081900360640190fd5b806001600160a01b0316826001600160a01b03167f179d78272c9a9dcd71ffea82ab34eeec4404c0ce0fc30d79eb47fd78ebf57c4f60405160405180910390a36001600160a01b03918216600090815260016020526040902080546001600160a01b03191691909216179055565b6000620004fe836001600160a01b0384166200050b565b90505b92915050565b3390565b60006200051983836200055a565b620005515750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000501565b50600062000501565b60009081526001919091016020526040902054151590565b61154080620005826000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638009b7bd116100ad578063a217fddf11610071578063a217fddf14610330578063b13d794314610338578063ca15c8731461045f578063d547741f1461047c578063fd6fa523146104a857610121565b80638009b7bd146102975780638c664a081461029f5780639010d07c146102c557806391d14854146102e85780639321982b1461032857610121565b806336568abe116100f457806336568abe146101d557806341976e091461020157806355a7547514610227578063637e064d1461024d57806367629ec61461027157610121565b806304afa92c14610126578063248a9ca31461014e57806329550f971461017d5780632f2ff15d146101a9575b600080fd5b61014c6004803603602081101561013c57600080fd5b50356001600160a01b03166104d6565b005b61016b6004803603602081101561016457600080fd5b50356105cf565b60408051918252519081900360200190f35b61016b6004803603604081101561019357600080fd5b506001600160a01b0381351690602001356105e7565b61014c600480360360408110156101bf57600080fd5b50803590602001356001600160a01b0316610687565b61014c600480360360408110156101eb57600080fd5b50803590602001356001600160a01b03166106ee565b61016b6004803603602081101561021757600080fd5b50356001600160a01b031661074f565b61014c6004803603602081101561023d57600080fd5b50356001600160a01b031661075a565b61025561084e565b604080516001600160a01b039092168252519081900360200190f35b6102556004803603602081101561028757600080fd5b50356001600160a01b031661085d565b610255610878565b61014c600480360360208110156102b557600080fd5b50356001600160a01b0316610887565b610255600480360360408110156102db57600080fd5b50803590602001356108a2565b610314600480360360408110156102fe57600080fd5b50803590602001356001600160a01b03166108c1565b604080519115158252519081900360200190f35b61016b6108d9565b61016b6108eb565b61014c6004803603604081101561034e57600080fd5b81019060208101813564010000000081111561036957600080fd5b82018360208201111561037b57600080fd5b8035906020019184602083028401116401000000008311171561039d57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092959493602081019350359150506401000000008111156103ed57600080fd5b8201836020820111156103ff57600080fd5b8035906020019184602083028401116401000000008311171561042157600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506108f0945050505050565b61016b6004803603602081101561047557600080fd5b5035610953565b61014c6004803603604081101561049257600080fd5b50803590602001356001600160a01b031661096a565b61014c600480360360408110156104be57600080fd5b506001600160a01b03813581169160200135166109c3565b6104f56000805160206114768339815191526104f0610a3b565b6108c1565b610534576040805162461bcd60e51b815260206004820152601c60248201526000805160206114bc833981519152604482015290519081900360640190fd5b6001600160a01b0381166105795760405162461bcd60e51b81526004018080602001828103825260268152602001806114506026913960400191505060405180910390fd5b6040516001600160a01b038216907f742b3776766d8f6d814e5363b7c38a17ccd9564730c02d114e87dddc6c1d2b1e90600090a2600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000818152602081905260409020600201545b919050565b600080836001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561062357600080fd5b505afa158015610637573d6000803e3d6000fd5b505050506040513d602081101561064d57600080fd5b50519050600061065c85610a3f565b905061067c816106768660ff601287900316600a0a610dfe565b90610dfe565b925050505b92915050565b6000828152602081905260409020600201546106a5906104f0610a3b565b6106e05760405162461bcd60e51b815260040180806020018281038252602f8152602001806113ae602f913960400191505060405180910390fd5b6106ea8282610e57565b5050565b6106f6610a3b565b6001600160a01b0316816001600160a01b0316146107455760405162461bcd60e51b815260040180806020018281038252602f8152602001806114dc602f913960400191505060405180910390fd5b6106ea8282610ec0565b600061068182610a3f565b6107746000805160206114768339815191526104f0610a3b565b6107b3576040805162461bcd60e51b815260206004820152601c60248201526000805160206114bc833981519152604482015290519081900360640190fd5b6001600160a01b0381166107f85760405162461bcd60e51b81526004018080602001828103825260268152602001806114966026913960400191505060405180910390fd5b6040516001600160a01b038216907f75da58c4a3315dac4ccd4a65866d6b27cfc75d895da90313d50362d3834e098c90600090a2600380546001600160a01b0319166001600160a01b0392909216919091179055565b6002546001600160a01b031681565b6001602052600090815260409020546001600160a01b031681565b6003546001600160a01b031681565b61089f60008051602061147683398151915282610687565b50565b60008281526020819052604081206108ba9083610f29565b9392505050565b60008281526020819052604081206108ba9083610f35565b60008051602061147683398151915281565b600081565b61090a6000805160206114768339815191526104f0610a3b565b610949576040805162461bcd60e51b815260206004820152601c60248201526000805160206114bc833981519152604482015290519081900360640190fd5b6106ea8282610f4a565b600081815260208190526040812061068190610fd3565b600082815260208190526040902060020154610988906104f0610a3b565b6107455760405162461bcd60e51b81526004018080602001828103825260308152602001806113ff6030913960400191505060405180910390fd5b6109dd6000805160206114768339815191526104f0610a3b565b610a1c576040805162461bcd60e51b815260206004820152601c60248201526000805160206114bc833981519152604482015290519081900360640190fd5b6106ea8282610fde565b60006108ba836001600160a01b038416611102565b3390565b6001600160a01b03818116600090815260016020526040812054909116610a68575060006105e2565b6002546040805163313ce56760e01b815290516000926001600160a01b03169163313ce567916004808301926020929190829003018186803b158015610aad57600080fd5b505afa158015610ac1573d6000803e3d6000fd5b505050506040513d6020811015610ad757600080fd5b5051600254604080516350d25bcd60e01b8152905160ff90931693506000926001600160a01b03909216916350d25bcd91600480820192602092909190829003018186803b158015610b2857600080fd5b505afa158015610b3c573d6000803e3d6000fd5b505050506040513d6020811015610b5257600080fd5b50516003546040805163313ce56760e01b815290519293506000926001600160a01b039092169163313ce56791600480820192602092909190829003018186803b158015610b9f57600080fd5b505afa158015610bb3573d6000803e3d6000fd5b505050506040513d6020811015610bc957600080fd5b5051600354604080516350d25bcd60e01b8152905160ff90931693506000926001600160a01b03909216916350d25bcd91600480820192602092909190829003018186803b158015610c1a57600080fd5b505afa158015610c2e573d6000803e3d6000fd5b505050506040513d6020811015610c4457600080fd5b50516001600160a01b03808816600090815260016020908152604080832054815163313ce56760e01b815291519596509294929093169263313ce5679260048083019392829003018186803b158015610c9c57600080fd5b505afa158015610cb0573d6000803e3d6000fd5b505050506040513d6020811015610cc657600080fd5b50516001600160a01b0380891660009081526001602090815260408083205481516350d25bcd60e01b8152915160ff9096169650929492909316926350d25bcd9260048083019392829003018186803b158015610d2257600080fd5b505afa158015610d36573d6000803e3d6000fd5b505050506040513d6020811015610d4c57600080fd5b50519050600085131580610d61575060008313155b80610d6d575060008113155b15610d8157600096505050505050506105e2565b6000610da0670de0b6b3a7640000610676866012899003600a0a610dfe565b90506000610db58760128a9003600a0a610dfe565b90506000610dc3838361114c565b90506000610dee670de0b6b3a7640000610de8846106768960128c9003600a0a610dfe565b9061114c565b9c9b505050505050505050505050565b600082610e0d57506000610681565b82820282848281610e1a57fe5b04146108ba5760405162461bcd60e51b815260040180806020018281038252602181526020018061142f6021913960400191505060405180910390fd5b6000828152602081905260409020610e6f9082610a26565b156106ea57610e7c610a3b565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610ed8908261118e565b156106ea57610ee5610a3b565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006108ba83836111a3565b60006108ba836001600160a01b038416611207565b8051825114610f8a5760405162461bcd60e51b81526004018080602001828103825260228152602001806113dd6022913960400191505060405180910390fd5b60005b8251811015610fce57610fc6838281518110610fa557fe5b6020026020010151838381518110610fb957fe5b6020026020010151610fde565b600101610f8d565b505050565b60006106818261121f565b6001600160a01b038216611039576040805162461bcd60e51b815260206004820152601960248201527f617373657420697320746865207a65726f206164647265737300000000000000604482015290519081900360640190fd5b6001600160a01b038116611094576040805162461bcd60e51b815260206004820152601e60248201527f6173736574206665656420697320746865207a65726f20616464726573730000604482015290519081900360640190fd5b806001600160a01b0316826001600160a01b03167f179d78272c9a9dcd71ffea82ab34eeec4404c0ce0fc30d79eb47fd78ebf57c4f60405160405180910390a36001600160a01b03918216600090815260016020526040902080546001600160a01b03191691909216179055565b600061110e8383611207565b61114457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610681565b506000610681565b60006108ba83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611223565b60006108ba836001600160a01b0384166112c5565b815460009082106111e55760405162461bcd60e51b815260040180806020018281038252602281526020018061138c6022913960400191505060405180910390fd5b8260000182815481106111f457fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b600081836112af5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561127457818101518382015260200161125c565b50505050905090810190601f1680156112a15780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816112bb57fe5b0495945050505050565b6000818152600183016020526040812054801561138157835460001980830191908101906000908790839081106112f857fe5b906000526020600020015490508087600001848154811061131557fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061134557fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610681565b600091505061068156fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e7461737365747320616e64206665656473206c656e67746873206e6f74206d61746368416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f776575722f757364207072696365206665656420697320746865207a65726f2061646472657373bd2fd8fcc8d37fd1d30c6e2a60fc680ba9fee1414dd4cf5c8c9b97c24e57a2b36574682f757364207072696365206665656420697320746865207a65726f20616464726573736d7573742068617665206665656473206d616e6167657220726f6c6500000000416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a2646970667358221220eb9cb33709f8970be62502186206bc66316227bf13f026119436db3135b5586064736f6c6343000704003361737365747320616e64206665656473206c656e67746873206e6f74206d617463686575722f757364207072696365206665656420697320746865207a65726f20616464726573736574682f757364207072696365206665656420697320746865207a65726f2061646472657373";
