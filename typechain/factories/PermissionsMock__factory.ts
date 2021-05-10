/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PermissionsMock } from "../PermissionsMock";

export class PermissionsMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(uri_: string, overrides?: Overrides): Promise<PermissionsMock> {
    return super.deploy(uri_, overrides || {}) as Promise<PermissionsMock>;
  }
  getDeployTransaction(
    uri_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  attach(address: string): PermissionsMock {
    return super.attach(address) as PermissionsMock;
  }
  connect(signer: Signer): PermissionsMock__factory {
    return super.connect(signer) as PermissionsMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PermissionsMock {
    return new Contract(address, _abi, signerOrProvider) as PermissionsMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    name: "rejectUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
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
    name: "setAsPoolCreator",
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
    name: "setAsProtocolContract",
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
        name: "_user",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001c1e38038062001c1e833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052508291506200010290506301ffc9a760e01b62000139565b6200010d81620001be565b6200011f636cdb3d1360e11b62000139565b620001316303a24d0760e21b62000139565b505062000283565b6001600160e01b0319808216141562000199576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b8051620001d3906003906020840190620001d7565b5050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200020f57600085556200025a565b82601f106200022a57805160ff19168380011785556200025a565b828001600101855582156200025a579182015b828111156200025a5782518255916020019190600101906200023d565b50620002689291506200026c565b5090565b5b808211156200026857600081556001016200026d565b61198b80620002936000396000f3fe608060405234801561001057600080fd5b50600436106100e95760003560e01c80634e1273f41161008c578063cce2987711610066578063cce29877146105f5578063e985e9c51461061b578063f242432a14610649578063f71c0ffd14610712576100e9565b80634e1273f41461042e578063a22cb465146105a1578063b9d2491b146105cf576100e9565b80631e153acb116100c85780631e153acb146101f95780632eb2c2d6146102215780634a301b5d146103e25780634dc9288514610408576100e9565b8062fdd58e146100ee57806301ffc9a71461012c5780630e89341c14610167575b600080fd5b61011a6004803603604081101561010457600080fd5b506001600160a01b038135169060200135610738565b60408051918252519081900360200190f35b6101536004803603602081101561014257600080fd5b50356001600160e01b0319166107a7565b604080519115158252519081900360200190f35b6101846004803603602081101561017d57600080fd5b50356107c6565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101be5781810151838201526020016101a6565b50505050905090810190601f1680156101eb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61021f6004803603602081101561020f57600080fd5b50356001600160a01b031661085e565b005b61021f600480360360a081101561023757600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561026a57600080fd5b82018360208201111561027c57600080fd5b803590602001918460208302840111600160201b8311171561029d57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156102ec57600080fd5b8201836020820111156102fe57600080fd5b803590602001918460208302840111600160201b8311171561031f57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561036e57600080fd5b82018360208201111561038057600080fd5b803590602001918460018302840111600160201b831117156103a157600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061087e945050505050565b61021f600480360360208110156103f857600080fd5b50356001600160a01b0316610b7c565b61021f6004803603602081101561041e57600080fd5b50356001600160a01b0316610b98565b6105516004803603604081101561044457600080fd5b810190602081018135600160201b81111561045e57600080fd5b82018360208201111561047057600080fd5b803590602001918460208302840111600160201b8311171561049157600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156104e057600080fd5b8201836020820111156104f257600080fd5b803590602001918460208302840111600160201b8311171561051357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610bb5945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561058d578181015183820152602001610575565b505050509050019250505060405180910390f35b61021f600480360360408110156105b757600080fd5b506001600160a01b0381351690602001351515610d33565b61021f600480360360208110156105e557600080fd5b50356001600160a01b0316610e22565b61021f6004803603602081101561060b57600080fd5b50356001600160a01b0316610e3f565b6101536004803603604081101561063157600080fd5b506001600160a01b0381358116916020013516610e5c565b61021f600480360360a081101561065f57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561069e57600080fd5b8201836020820111156106b057600080fd5b803590602001918460018302840111600160201b831117156106d157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610e8a945050505050565b61021f6004803603602081101561072857600080fd5b50356001600160a01b0316611055565b60006001600160a01b03831661077f5760405162461bcd60e51b815260040180806020018281038252602b8152602001806117b5602b913960400191505060405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b6001600160e01b03191660009081526020819052604090205460ff1690565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108525780601f1061082757610100808354040283529160200191610852565b820191906000526020600020905b81548152906001019060200180831161083557829003601f168201915b50505050509050919050565b61087b81600060016040518060200160405280600081525061106e565b50565b81518351146108be5760405162461bcd60e51b815260040180806020018281038252602881526020018061190d6028913960400191505060405180910390fd5b6001600160a01b0384166109035760405162461bcd60e51b815260040180806020018281038252602581526020018061183a6025913960400191505060405180910390fd5b61090b611176565b6001600160a01b0316856001600160a01b03161480610936575061093685610931611176565b610e5c565b6109715760405162461bcd60e51b815260040180806020018281038252603281526020018061185f6032913960400191505060405180910390fd5b600061097b611176565b905061098b818787878787610b74565b60005b8451811015610a8c5760008582815181106109a557fe5b6020026020010151905060008583815181106109bd57fe5b60200260200101519050610a2a816040518060600160405280602a8152602001611891602a91396001600086815260200190815260200160002060008d6001600160a01b03166001600160a01b031681526020019081526020016000205461117b9092919063ffffffff16565b60008381526001602090815260408083206001600160a01b038e811685529252808320939093558a1681522054610a619082611212565b60009283526001602081815260408086206001600160a01b038d16875290915290932055500161098e565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610b12578181015183820152602001610afa565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610b51578181015183820152602001610b39565b5050505090500194505050505060405180910390a4610b74818787878787611273565b505050505050565b61087b816001806040518060200160405280600081525061106e565b61087b81600360016040518060200160405280600081525061106e565b60608151835114610bf75760405162461bcd60e51b81526004018080602001828103825260298152602001806118e46029913960400191505060405180910390fd5b6060835167ffffffffffffffff81118015610c1157600080fd5b50604051908082528060200260200182016040528015610c3b578160200160208202803683370190505b50905060005b8451811015610d2b5760006001600160a01b0316858281518110610c6157fe5b60200260200101516001600160a01b03161415610caf5760405162461bcd60e51b81526004018080602001828103825260318152602001806117e06031913960400191505060405180910390fd5b60016000858381518110610cbf57fe5b602002602001015181526020019081526020016000206000868381518110610ce357fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002054828281518110610d1857fe5b6020908102919091010152600101610c41565b509392505050565b816001600160a01b0316610d45611176565b6001600160a01b03161415610d8b5760405162461bcd60e51b81526004018080602001828103825260298152602001806118bb6029913960400191505060405180910390fd5b8060026000610d98611176565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610ddc611176565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b61087b81600560016040518060200160405280600081525061106e565b61087b81600460016040518060200160405280600081525061106e565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b6001600160a01b038416610ecf5760405162461bcd60e51b815260040180806020018281038252602581526020018061183a6025913960400191505060405180910390fd5b610ed7611176565b6001600160a01b0316856001600160a01b03161480610efd5750610efd85610931611176565b610f385760405162461bcd60e51b81526004018080602001828103825260298152602001806118116029913960400191505060405180910390fd5b6000610f42611176565b9050610f62818787610f53886114f2565b610f5c886114f2565b87610b74565b610fa9836040518060600160405280602a8152602001611891602a913960008781526001602090815260408083206001600160a01b038d168452909152902054919061117b565b60008581526001602090815260408083206001600160a01b038b81168552925280832093909355871681522054610fe09084611212565b60008581526001602090815260408083206001600160a01b03808b168086529184529382902094909455805188815291820187905280518a8416938616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a4610b74818787878787611536565b61087b8160026001604051806020016040528060008152505b6001600160a01b0384166110b35760405162461bcd60e51b81526004018080602001828103825260218152602001806119356021913960400191505060405180910390fd5b60006110bd611176565b90506110cf81600087610f53886114f2565b60008481526001602090815260408083206001600160a01b03891684529091529020546110fc9084611212565b60008581526001602090815260408083206001600160a01b03808b16808652918452828520959095558151898152928301889052815190948616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a461116f81600087878787611536565b5050505050565b335b90565b6000818484111561120a5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156111cf5781810151838201526020016111b7565b50505050905090810190601f1680156111fc5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008282018381101561126c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b611285846001600160a01b03166116a7565b15610b7457836001600160a01b031663bc197c8187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156113135781810151838201526020016112fb565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561135257818101518382015260200161133a565b50505050905001848103825285818151815260200191508051906020019080838360005b8381101561138e578181015183820152602001611376565b50505050905090810190601f1680156113bb5780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b1580156113e057600080fd5b505af192505050801561140557506040513d602081101561140057600080fd5b505160015b61149a576114116116b3565b8061141c5750611463565b60405162461bcd60e51b81526020600482018181528351602484015283518493919283926044019190850190808383600083156111cf5781810151838201526020016111b7565b60405162461bcd60e51b81526004018080602001828103825260348152602001806117596034913960400191505060405180910390fd5b6001600160e01b0319811663bc197c8160e01b146114e95760405162461bcd60e51b815260040180806020018281038252602881526020018061178d6028913960400191505060405180910390fd5b50505050505050565b60408051600180825281830190925260609182919060208083019080368337019050509050828160008151811061152557fe5b602090810291909101015292915050565b611548846001600160a01b03166116a7565b15610b7457836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156115d75781810151838201526020016115bf565b50505050905090810190601f1680156116045780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561162757600080fd5b505af192505050801561164c57506040513d602081101561164757600080fd5b505160015b611658576114116116b3565b6001600160e01b0319811663f23a6e6160e01b146114e95760405162461bcd60e51b815260040180806020018281038252602881526020018061178d6028913960400191505060405180910390fd5b3b151590565b60e01c90565b600060443d10156116c357611178565b600481823e6308c379a06116d782516116ad565b146116e157611178565b6040513d600319016004823e80513d67ffffffffffffffff81602484011181841117156117115750505050611178565b8284019250825191508082111561172b5750505050611178565b503d8301602082840101111561174357505050611178565b601f01601f191681016020016040529150509056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2062617463682062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e73666572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368455243313135353a206d696e7420746f20746865207a65726f2061646472657373a2646970667358221220b2913577ad26abfb3455e7e3eb3201a1dbd1f54545e6ce6ca875533155d9ea3064736f6c63430007040033";
