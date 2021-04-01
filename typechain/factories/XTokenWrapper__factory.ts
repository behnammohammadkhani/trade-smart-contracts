/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { XTokenWrapper } from "../XTokenWrapper";

export class XTokenWrapper__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<XTokenWrapper> {
    return super.deploy(overrides || {}) as Promise<XTokenWrapper>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): XTokenWrapper {
    return super.attach(address) as XTokenWrapper;
  }
  connect(signer: Signer): XTokenWrapper__factory {
    return super.connect(signer) as XTokenWrapper__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XTokenWrapper {
    return new Contract(address, _abi, signerOrProvider) as XTokenWrapper;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "xToken",
        type: "address",
      },
    ],
    name: "RegisterToken",
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
    name: "ETH_TOKEN_ADDRESS",
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
    name: "REGISTRY_MANAGER_ROLE",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_xToken",
        type: "address",
      },
    ],
    name: "registerToken",
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
        name: "_registryManager",
        type: "address",
      },
    ],
    name: "setRegistryManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        name: "",
        type: "address",
      },
    ],
    name: "tokenToXToken",
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
        name: "_xToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "unwrap",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "wrap",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
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
    name: "xTokenToToken",
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
  "0x60806040523480156200001157600080fd5b50620000246301ffc9a760e01b62000049565b62000036630271189760e51b62000049565b62000043600033620000d1565b620001e5565b6001600160e01b03198082161415620000a9576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152600160208190526040909120805460ff19169091179055565b620000dd8282620000e1565b5050565b6000828152602081815260409091206200010691839062000f076200015a821b17901c565b15620000dd57620001166200017a565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000171836001600160a01b0384166200017e565b90505b92915050565b3390565b60006200018c8383620001cd565b620001c45750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000174565b50600062000174565b60009081526001919091016020526040902054151590565b61169f80620001f56000396000f3fe6080604052600436106101145760003560e01c80639010d07c116100a0578063bf376c7a11610064578063bf376c7a1461059a578063ca15c873146105c6578063d547741f146105f0578063e1d5769514610629578063f23a6e611461065c57610114565b80639010d07c1461031c57806391d148541461034c578063a217fddf14610385578063bc197c811461039a578063bd8fde1c1461058557610114565b806327009c75116100e757806327009c75146102035780632f2ff15d1461023657806336568abe1461026f57806339f47693146102a85780634739f7e5146102e157610114565b806301ffc9a71461011957806302aab086146101615780631878d1f114610196578063248a9ca3146101c7575b600080fd5b34801561012557600080fd5b5061014d6004803603602081101561013c57600080fd5b50356001600160e01b031916610732565b604080519115158252519081900360200190f35b34801561016d57600080fd5b506101946004803603602081101561018457600080fd5b50356001600160a01b0316610751565b005b3480156101a257600080fd5b506101ab61077e565b604080516001600160a01b039092168252519081900360200190f35b3480156101d357600080fd5b506101f1600480360360208110156101ea57600080fd5b5035610796565b60408051918252519081900360200190f35b34801561020f57600080fd5b506101ab6004803603602081101561022657600080fd5b50356001600160a01b03166107ab565b34801561024257600080fd5b506101946004803603604081101561025957600080fd5b50803590602001356001600160a01b03166107c6565b34801561027b57600080fd5b506101946004803603604081101561029257600080fd5b50803590602001356001600160a01b0316610832565b3480156102b457600080fd5b5061014d600480360360408110156102cb57600080fd5b506001600160a01b038135169060200135610893565b3480156102ed57600080fd5b506101946004803603604081101561030457600080fd5b506001600160a01b0381358116916020013516610a9e565b34801561032857600080fd5b506101ab6004803603604081101561033f57600080fd5b5080359060200135610c59565b34801561035857600080fd5b5061014d6004803603604081101561036f57600080fd5b50803590602001356001600160a01b0316610c78565b34801561039157600080fd5b506101f1610c90565b3480156103a657600080fd5b50610568600480360360a08110156103bd57600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b8111156103f057600080fd5b82018360208201111561040257600080fd5b803590602001918460208302840111600160201b8311171561042357600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561047257600080fd5b82018360208201111561048457600080fd5b803590602001918460208302840111600160201b831117156104a557600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156104f457600080fd5b82018360208201111561050657600080fd5b803590602001918460018302840111600160201b8311171561052757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610c95945050505050565b604080516001600160e01b03199092168252519081900360200190f35b34801561059157600080fd5b506101f1610ca6565b61014d600480360360408110156105b057600080fd5b506001600160a01b038135169060200135610cca565b3480156105d257600080fd5b506101f1600480360360208110156105e957600080fd5b5035610e6b565b3480156105fc57600080fd5b506101946004803603604081101561061357600080fd5b50803590602001356001600160a01b0316610e82565b34801561063557600080fd5b506101ab6004803603602081101561064c57600080fd5b50356001600160a01b0316610edb565b34801561066857600080fd5b50610568600480360360a081101561067f57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b8111156106be57600080fd5b8201836020820111156106d057600080fd5b803590602001918460018302840111600160201b831117156106f157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ef6945050505050565b6001600160e01b03191660009081526001602052604090205460ff1690565b61077b7ff7a450ef335e1892cb42c8ca72e7242359d7711924b75db5717410da3f614aa3826107c6565b50565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee81565b60009081526020819052604090206002015490565b6002602052600090815260409020546001600160a01b031681565b6000828152602081905260409020600201546107e9906107e4610f1c565b610c78565b6108245760405162461bcd60e51b815260040180806020018281038252602f81526020018061158c602f913960400191505060405180910390fd5b61082e8282610f20565b5050565b61083a610f1c565b6001600160a01b0316816001600160a01b0316146108895760405162461bcd60e51b815260040180806020018281038252602f81526020018061163b602f913960400191505060405180910390fd5b61082e8282610f89565b6001600160a01b0380831660009081526003602052604081205490911680610902576040805162461bcd60e51b815260206004820152601860248201527f78546f6b656e206973206e6f7420726567697374657265640000000000000000604482015290519081900360640190fd5b600083116109415760405162461bcd60e51b815260040180806020018281038252602181526020018061156b6021913960400191505060405180910390fd5b836001600160a01b03166379cc6790610958610f1c565b856040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b15801561099f57600080fd5b505af11580156109b3573d6000803e3d6000fd5b505050506001600160a01b03811673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee146109fc576109f76109e6610f1c565b6001600160a01b0383169085610ff2565b610a92565b604051600090339085908381818185875af1925050503d8060008114610a3e576040519150601f19603f3d011682016040523d82523d6000602084013e610a43565b606091505b5050905080610a90576040805162461bcd60e51b81526020600482015260146024820152732330b4b632b2103a379039b2b7321022ba3432b960611b604482015290519081900360640190fd5b505b60019150505b92915050565b610aca7ff7a450ef335e1892cb42c8ca72e7242359d7711924b75db5717410da3f614aa36107e4610f1c565b610b1b576040805162461bcd60e51b815260206004820152601f60248201527f6d7573742068617665207265676973747279206d616e6167657220726f6c6500604482015290519081900360640190fd5b6001600160a01b038216610b76576040805162461bcd60e51b815260206004820152601960248201527f746f6b656e20697320746865207a65726f206164647265737300000000000000604482015290519081900360640190fd5b6001600160a01b038116610bd1576040805162461bcd60e51b815260206004820152601a60248201527f78546f6b656e20697320746865207a65726f2061646472657373000000000000604482015290519081900360640190fd5b806001600160a01b0316826001600160a01b03167f08bf8e971f6b1ed2fa302066ab8d507c0f1c764aaea9b04c10bce235dc84505760405160405180910390a36001600160a01b0391821660008181526002602090815260408083208054969095166001600160a01b0319968716811790955593825260039052919091208054909216179055565b6000828152602081905260408120610c719083611049565b9392505050565b6000828152602081905260408120610c719083611055565b600081565b63bc197c8160e01b95945050505050565b7ff7a450ef335e1892cb42c8ca72e7242359d7711924b75db5717410da3f614aa381565b6001600160a01b0380831660009081526002602052604081205490911680610d39576040805162461bcd60e51b815260206004820152601760248201527f746f6b656e206973206e6f742072656769737465726564000000000000000000604482015290519081900360640190fd5b6001600160a01b03841673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee14610d7a57610d7a610d68610f1c565b6001600160a01b03861690308661106a565b60006001600160a01b03851673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1415610da75734610da9565b835b905060008111610dea5760405162461bcd60e51b815260040180806020018281038252602181526020018061156b6021913960400191505060405180910390fd5b816001600160a01b03166340c10f19610e01610f1c565b836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b158015610e4857600080fd5b505af1158015610e5c573d6000803e3d6000fd5b50600198975050505050505050565b6000818152602081905260408120610a98906110ca565b600082815260208190526040902060020154610ea0906107e4610f1c565b6108895760405162461bcd60e51b81526004018080602001828103825260308152602001806115e16030913960400191505060405180910390fd5b6003602052600090815260409020546001600160a01b031681565b63f23a6e6160e01b95945050505050565b6000610c71836001600160a01b0384166110d5565b3390565b6000828152602081905260409020610f389082610f07565b1561082e57610f45610f1c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610fa1908261111f565b1561082e57610fae610f1c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052611044908490611134565b505050565b6000610c7183836111e5565b6000610c71836001600160a01b038416611249565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b1790526110c4908590611134565b50505050565b6000610a9882611261565b60006110e18383611249565b61111757508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610a98565b506000610a98565b6000610c71836001600160a01b038416611265565b6060611189826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661132b9092919063ffffffff16565b805190915015611044578080602001905160208110156111a857600080fd5b50516110445760405162461bcd60e51b815260040180806020018281038252602a815260200180611611602a913960400191505060405180910390fd5b815460009082106112275760405162461bcd60e51b81526004018080602001828103825260228152602001806115496022913960400191505060405180910390fd5b82600001828154811061123657fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b60008181526001830160205260408120548015611321578354600019808301919081019060009087908390811061129857fe5b90600052602060002001549050808760000184815481106112b557fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806112e557fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610a98565b6000915050610a98565b606061133a8484600085611342565b949350505050565b6060824710156113835760405162461bcd60e51b81526004018080602001828103825260268152602001806115bb6026913960400191505060405180910390fd5b61138c8561149e565b6113dd576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b6020831061141c5780518252601f1990920191602091820191016113fd565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461147e576040519150601f19603f3d011682016040523d82523d6000602084013e611483565b606091505b50915091506114938282866114a4565b979650505050505050565b3b151590565b606083156114b3575081610c71565b8251156114c35782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561150d5781810151838201526020016114f5565b50505050905090810190601f16801561153a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fdfe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473616d6f756e7420746f20777261702073686f756c6420626520706f736974697665416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b655361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a2646970667358221220ff43d0a28f0829671f53270cc75f944fe4d866a9134e57e482263af1cc40000064736f6c63430007040033";
