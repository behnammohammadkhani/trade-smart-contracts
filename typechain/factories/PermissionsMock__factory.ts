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
    name: "pauseUser",
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
  "0x60806040523480156200001157600080fd5b5060405162001b1838038062001b18833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052508291506200010290506301ffc9a760e01b62000139565b6200010d81620001be565b6200011f636cdb3d1360e11b62000139565b620001316303a24d0760e21b62000139565b505062000283565b6001600160e01b0319808216141562000199576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b8051620001d3906003906020840190620001d7565b5050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200020f57600085556200025a565b82601f106200022a57805160ff19168380011785556200025a565b828001600101855582156200025a579182015b828111156200025a5782518255916020019190600101906200023d565b50620002689291506200026c565b5090565b5b808211156200026857600081556001016200026d565b61188580620002936000396000f3fe608060405234801561001057600080fd5b50600436106100a85760003560e01c80634e1273f4116100715780634e1273f4146103a1578063a22cb46514610514578063bfcb907914610542578063e985e9c514610568578063f242432a14610596578063f71c0ffd1461065f576100a8565b8062fdd58e146100ad57806301ffc9a7146100eb5780630e89341c146101265780632eb2c2d6146101b85780634a301b5d1461037b575b600080fd5b6100d9600480360360408110156100c357600080fd5b506001600160a01b038135169060200135610685565b60408051918252519081900360200190f35b6101126004803603602081101561010157600080fd5b50356001600160e01b0319166106f4565b604080519115158252519081900360200190f35b6101436004803603602081101561013c57600080fd5b5035610713565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017d578181015183820152602001610165565b50505050905090810190601f1680156101aa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610379600480360360a08110156101ce57600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561020157600080fd5b82018360208201111561021357600080fd5b803590602001918460208302840111600160201b8311171561023457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561028357600080fd5b82018360208201111561029557600080fd5b803590602001918460208302840111600160201b831117156102b657600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561030557600080fd5b82018360208201111561031757600080fd5b803590602001918460018302840111600160201b8311171561033857600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506107ab945050505050565b005b6103796004803603602081101561039157600080fd5b50356001600160a01b0316610aa9565b6104c4600480360360408110156103b757600080fd5b810190602081018135600160201b8111156103d157600080fd5b8201836020820111156103e357600080fd5b803590602001918460208302840111600160201b8311171561040457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561045357600080fd5b82018360208201111561046557600080fd5b803590602001918460208302840111600160201b8311171561048657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610ac8945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156105005781810151838201526020016104e8565b505050509050019250505060405180910390f35b6103796004803603604081101561052a57600080fd5b506001600160a01b0381351690602001351515610c46565b6103796004803603602081101561055857600080fd5b50356001600160a01b0316610d35565b6101126004803603604081101561057e57600080fd5b506001600160a01b0381358116916020013516610d52565b610379600480360360a08110156105ac57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b8111156105eb57600080fd5b8201836020820111156105fd57600080fd5b803590602001918460018302840111600160201b8311171561061e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610d80945050505050565b6103796004803603602081101561067557600080fd5b50356001600160a01b0316610f4b565b60006001600160a01b0383166106cc5760405162461bcd60e51b815260040180806020018281038252602b8152602001806116af602b913960400191505060405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b6001600160e01b03191660009081526020819052604090205460ff1690565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561079f5780601f106107745761010080835404028352916020019161079f565b820191906000526020600020905b81548152906001019060200180831161078257829003601f168201915b50505050509050919050565b81518351146107eb5760405162461bcd60e51b81526004018080602001828103825260288152602001806118076028913960400191505060405180910390fd5b6001600160a01b0384166108305760405162461bcd60e51b81526004018080602001828103825260258152602001806117346025913960400191505060405180910390fd5b610838610f68565b6001600160a01b0316856001600160a01b0316148061086357506108638561085e610f68565b610d52565b61089e5760405162461bcd60e51b81526004018080602001828103825260328152602001806117596032913960400191505060405180910390fd5b60006108a8610f68565b90506108b8818787878787610aa1565b60005b84518110156109b95760008582815181106108d257fe5b6020026020010151905060008583815181106108ea57fe5b60200260200101519050610957816040518060600160405280602a815260200161178b602a91396001600086815260200190815260200160002060008d6001600160a01b03166001600160a01b0316815260200190815260200160002054610f6d9092919063ffffffff16565b60008381526001602090815260408083206001600160a01b038e811685529252808320939093558a168152205461098e9082611004565b60009283526001602081815260408086206001600160a01b038d1687529091529093205550016108bb565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610a3f578181015183820152602001610a27565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610a7e578181015183820152602001610a66565b5050505090500194505050505060405180910390a4610aa1818787878787611065565b505050505050565b610ac581600180604051806020016040528060008152506112e4565b50565b60608151835114610b0a5760405162461bcd60e51b81526004018080602001828103825260298152602001806117de6029913960400191505060405180910390fd5b6060835167ffffffffffffffff81118015610b2457600080fd5b50604051908082528060200260200182016040528015610b4e578160200160208202803683370190505b50905060005b8451811015610c3e5760006001600160a01b0316858281518110610b7457fe5b60200260200101516001600160a01b03161415610bc25760405162461bcd60e51b81526004018080602001828103825260318152602001806116da6031913960400191505060405180910390fd5b60016000858381518110610bd257fe5b602002602001015181526020019081526020016000206000868381518110610bf657fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002054828281518110610c2b57fe5b6020908102919091010152600101610b54565b509392505050565b816001600160a01b0316610c58610f68565b6001600160a01b03161415610c9e5760405162461bcd60e51b81526004018080602001828103825260298152602001806117b56029913960400191505060405180910390fd5b8060026000610cab610f68565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610cef610f68565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b610ac58160036001604051806020016040528060008152506112e4565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b6001600160a01b038416610dc55760405162461bcd60e51b81526004018080602001828103825260258152602001806117346025913960400191505060405180910390fd5b610dcd610f68565b6001600160a01b0316856001600160a01b03161480610df35750610df38561085e610f68565b610e2e5760405162461bcd60e51b815260040180806020018281038252602981526020018061170b6029913960400191505060405180910390fd5b6000610e38610f68565b9050610e58818787610e49886113ec565b610e52886113ec565b87610aa1565b610e9f836040518060600160405280602a815260200161178b602a913960008781526001602090815260408083206001600160a01b038d1684529091529020549190610f6d565b60008581526001602090815260408083206001600160a01b038b81168552925280832093909355871681522054610ed69084611004565b60008581526001602090815260408083206001600160a01b03808b168086529184529382902094909455805188815291820187905280518a8416938616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a4610aa1818787878787611430565b610ac58160026001604051806020016040528060008152506112e4565b335b90565b60008184841115610ffc5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610fc1578181015183820152602001610fa9565b50505050905090810190601f168015610fee5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008282018381101561105e576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b611077846001600160a01b03166115a1565b15610aa157836001600160a01b031663bc197c8187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156111055781810151838201526020016110ed565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561114457818101518382015260200161112c565b50505050905001848103825285818151815260200191508051906020019080838360005b83811015611180578181015183820152602001611168565b50505050905090810190601f1680156111ad5780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b1580156111d257600080fd5b505af19250505080156111f757506040513d60208110156111f257600080fd5b505160015b61128c576112036115ad565b8061120e5750611255565b60405162461bcd60e51b8152602060048201818152835160248401528351849391928392604401919085019080838360008315610fc1578181015183820152602001610fa9565b60405162461bcd60e51b81526004018080602001828103825260348152602001806116536034913960400191505060405180910390fd5b6001600160e01b0319811663bc197c8160e01b146112db5760405162461bcd60e51b81526004018080602001828103825260288152602001806116876028913960400191505060405180910390fd5b50505050505050565b6001600160a01b0384166113295760405162461bcd60e51b815260040180806020018281038252602181526020018061182f6021913960400191505060405180910390fd5b6000611333610f68565b905061134581600087610e49886113ec565b60008481526001602090815260408083206001600160a01b03891684529091529020546113729084611004565b60008581526001602090815260408083206001600160a01b03808b16808652918452828520959095558151898152928301889052815190948616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a46113e581600087878787611430565b5050505050565b60408051600180825281830190925260609182919060208083019080368337019050509050828160008151811061141f57fe5b602090810291909101015292915050565b611442846001600160a01b03166115a1565b15610aa157836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156114d15781810151838201526020016114b9565b50505050905090810190601f1680156114fe5780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561152157600080fd5b505af192505050801561154657506040513d602081101561154157600080fd5b505160015b611552576112036115ad565b6001600160e01b0319811663f23a6e6160e01b146112db5760405162461bcd60e51b81526004018080602001828103825260288152602001806116876028913960400191505060405180910390fd5b3b151590565b60e01c90565b600060443d10156115bd57610f6a565b600481823e6308c379a06115d182516115a7565b146115db57610f6a565b6040513d600319016004823e80513d67ffffffffffffffff816024840111818411171561160b5750505050610f6a565b828401925082519150808211156116255750505050610f6a565b503d8301602082840101111561163d57505050610f6a565b601f01601f191681016020016040529150509056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2062617463682062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e73666572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368455243313135353a206d696e7420746f20746865207a65726f2061646472657373a2646970667358221220913c7b355bd8c7d67a5af940e3dbf0b7dad50ea41f75f1be1fd832ea1cd7500664736f6c63430007040033";
