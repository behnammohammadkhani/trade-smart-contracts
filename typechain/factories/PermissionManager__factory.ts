/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PermissionManager } from "../PermissionManager";

export class PermissionManager__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<PermissionManager> {
    return super.deploy(overrides || {}) as Promise<PermissionManager>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PermissionManager {
    return super.attach(address) as PermissionManager;
  }
  connect(signer: Signer): PermissionManager__factory {
    return super.connect(signer) as PermissionManager__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PermissionManager {
    return new Contract(address, _abi, signerOrProvider) as PermissionManager;
  }
}

const _abi = [
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
    name: "PermissionItemsSet",
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
    name: "PERMISSIONS_ADMIN_ROLE",
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
    name: "PROTOCOL_CONTRACT",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
    ],
    name: "assignItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
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
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "hasTier1",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "hasTier2",
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
        name: "_permissionItems",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "isRejected",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "isSuspended",
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
    name: "permissionItems",
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
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
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
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
    ],
    name: "removeItem",
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
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
    ],
    name: "revokeTier1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
      },
    ],
    name: "revokeTier2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_permissionItems",
        type: "address",
      },
    ],
    name: "setPermissionItems",
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
        name: "_permissionsAdmin",
        type: "address",
      },
    ],
    name: "setPermissionsAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
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
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
      },
    ],
    name: "unrejectUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "address",
            name: "proxy",
            type: "address",
          },
        ],
        internalType: "struct PermissionManager.UserProxy[]",
        name: "_usersProxies",
        type: "tuple[]",
      },
    ],
    name: "unsuspendUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506125fc806100206000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806382e672d61161010f578063d547741f116100a2578063e73ccb3c11610071578063e73ccb3c146103e6578063f15e0b60146103f9578063fc8a53641461040c578063fd32b05914610414576101f0565b8063d547741f146103ad578063d88a8951146103c0578063d9d7b4721461036f578063df2f73a0146103d3576101f0565b8063c6b6c17a116100de578063c6b6c17a14610377578063ca15c8731461037f578063cbbc66ef14610392578063d4d4bcdb1461039a576101f0565b806382e672d6146103295780639010d07c1461033c57806391d148541461035c578063a217fddf1461036f576101f0565b80632f2ff15d1161018757806350622e9b1161015657806350622e9b146102dd57806362071a29146102f05780637cc1bb7f146103035780637d43a3b114610316576101f0565b80632f2ff15d1461029157806336568abe146102a4578063485cc955146102b757806348a46bd3146102ca576101f0565b8063248a9ca3116101c3578063248a9ca31461025b578063260afc1d1461026e57806329a363e9146102815780632d703a0914610289576101f0565b80630d80aa96146101f557806318dc8bed146102135780631f29d64e14610233578063232e0e9a14610248575b600080fd5b6101fd610427565b60405161020a9190611e29565b60405180910390f35b610226610221366004611b8b565b61042c565b60405161020a9190611e1e565b610246610241366004611d5b565b6104dd565b005b610226610256366004611b8b565b6105e7565b6101fd610269366004611ce8565b6105fa565b61024661027c366004611c12565b61060f565b6101fd6107b5565b6101fd6107c7565b61024661029f366004611d00565b6107cc565b6102466102b2366004611d00565b61082f565b6102466102c5366004611ba5565b610890565b6102266102d8366004611b8b565b6109e5565b6102466102eb366004611bd7565b6109f2565b6102466102fe366004611d5b565b610af7565b610246610311366004611c12565b610bef565b610246610324366004611b8b565b610d93565b610226610337366004611b8b565b610dfd565b61034f61034a366004611d22565b610e0a565b60405161020a9190611da0565b61022661036a366004611d00565b610e29565b6101fd610e41565b6101fd610e46565b6101fd61038d366004611ce8565b610e4b565b6101fd610e62565b6102466103a8366004611c12565b610e67565b6102466103bb366004611d00565b61100b565b6102266103ce366004611b8b565b611064565b6102466103e1366004611bd7565b611071565b6102466103f4366004611c12565b611168565b610246610407366004611c12565b6112fa565b61034f61148e565b610246610422366004611c12565b61149d565b600481565b600061043a8161036a61163f565b61045f5760405162461bcd60e51b815260040161045690611ec4565b60405180910390fd5b6001600160a01b0382166104855760405162461bcd60e51b815260040161045690611f4f565b6040516001600160a01b038316907fdcd171a114b3defbe6183db035bfa13bf4bc50a165623de6bebb68dcad82fa6490600090a250606580546001600160a01b0319166001600160a01b03831617905560015b919050565b6104f760008051602061251a83398151915261036a61163f565b6105135760405162461bcd60e51b815260040161045690612188565b60005b81518110156105e25761053c82828151811061052e57fe5b602002602001015184611643565b6105585760405162461bcd60e51b81526004016104569061220d565b60655482516001600160a01b039091169063f5298aca9084908490811061057b57fe5b60200260200101518560016040518463ffffffff1660e01b81526004016105a493929190611dcd565b600060405180830381600087803b1580156105be57600080fd5b505af11580156105d2573d6000803e3d6000fd5b5050600190920191506105169050565b505050565b60006105f4826000611643565b92915050565b60009081526033602052604090206002015490565b61062960008051602061251a83398151915261036a61163f565b6106455760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b157610659611ae8565b82828151811061066557fe5b6020026020010151905061067c81600001516105e7565b6106985760405162461bcd60e51b8152600401610456906122e7565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca916106ce91600090600190600401611dcd565b600060405180830381600087803b1580156106e857600080fd5b505af11580156106fc573d6000803e3d6000fd5b5050505060208101516001600160a01b0316156107a85761072081602001516105e7565b61073c5760405162461bcd60e51b81526004016104569061203f565b6065546020820151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161077591600090600190600401611dcd565b600060405180830381600087803b15801561078f57600080fd5b505af11580156107a3573d6000803e3d6000fd5b505050505b50600101610648565b5050565b60008051602061251a83398151915281565b600281565b6000828152603360205260409020600201546107ea9061036a61163f565b6108255760405162461bcd60e51b815260040180806020018281038252602f8152602001806124eb602f913960400191505060405180910390fd5b6107b182826116d9565b61083761163f565b6001600160a01b0316816001600160a01b0316146108865760405162461bcd60e51b815260040180806020018281038252602f815260200180612598602f913960400191505060405180910390fd5b6107b18282611742565b600054610100900460ff16806108a957506108a96117ab565b806108b7575060005460ff16155b6108f25760405162461bcd60e51b815260040180806020018281038252602e81526020018061256a602e913960400191505060405180910390fd5b600054610100900460ff1615801561091d576000805460ff1961ff0019909116610100171660011790555b6001600160a01b0383166109435760405162461bcd60e51b815260040161045690611f4f565b6001600160a01b0382166109695760405162461bcd60e51b815260040161045690612261565b606580546001600160a01b0319166001600160a01b03851617905561098c6117b1565b610997600083610825565b6065546040516001600160a01b03909116907fdcd171a114b3defbe6183db035bfa13bf4bc50a165623de6bebb68dcad82fa6490600090a280156105e2576000805461ff0019169055505050565b60006105f4826003611643565b610a0c60008051602061251a83398151915261036a61163f565b610a285760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b157610a50828281518110610a4357fe5b6020026020010151611064565b15610a6d5760405162461bcd60e51b8152600401610456906123e2565b60655482516001600160a01b039091169063731133e990849084908110610a9057fe5b60200260200101516001806040518463ffffffff1660e01b8152600401610ab993929190611dee565b600060405180830381600087803b158015610ad357600080fd5b505af1158015610ae7573d6000803e3d6000fd5b505060019092019150610a2b9050565b610b1160008051602061251a83398151915261036a61163f565b610b2d5760405162461bcd60e51b815260040161045690612188565b60005b81518110156105e257610b4882828151811061052e57fe5b15610b655760405162461bcd60e51b8152600401610456906121bd565b60655482516001600160a01b039091169063731133e990849084908110610b8857fe5b60200260200101518560016040518463ffffffff1660e01b8152600401610bb193929190611dee565b600060405180830381600087803b158015610bcb57600080fd5b505af1158015610bdf573d6000803e3d6000fd5b505060019092019150610b309050565b610c0960008051602061251a83398151915261036a61163f565b610c255760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b157610c39611ae8565b828281518110610c4557fe5b60200260200101519050610c5c81600001516105e7565b15610c795760405162461bcd60e51b815260040161045690612298565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e991610caf91600090600190600401611dee565b600060405180830381600087803b158015610cc957600080fd5b505af1158015610cdd573d6000803e3d6000fd5b5050505060208101516001600160a01b031615610d8a57610d0181602001516105e7565b15610d1e5760405162461bcd60e51b815260040161045690611e77565b606554602082015160405163731133e960e01b81526001600160a01b039092169163731133e991610d5791600090600190600401611dee565b600060405180830381600087803b158015610d7157600080fd5b505af1158015610d85573d6000803e3d6000fd5b505050505b50600101610c28565b610da0600061036a61163f565b610dbc5760405162461bcd60e51b815260040161045690611ec4565b6001600160a01b038116610de25760405162461bcd60e51b815260040161045690611e32565b610dfa60008051602061251a833981519152826107cc565b50565b60006105f4826002611643565b6000828152603360205260408120610e229083611862565b9392505050565b6000828152603360205260408120610e22908361186e565b600081565b600181565b60008181526033602052604081206105f490611883565b600381565b610e8160008051602061251a83398151915261036a61163f565b610e9d5760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b157610eb1611ae8565b828281518110610ebd57fe5b60200260200101519050610ed481600001516109e5565b15610ef15760405162461bcd60e51b815260040161045690612438565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e991610f2791600390600190600401611dee565b600060405180830381600087803b158015610f4157600080fd5b505af1158015610f55573d6000803e3d6000fd5b5050505060208101516001600160a01b03161561100257610f7981602001516109e5565b15610f965760405162461bcd60e51b81526004016104569061213c565b606554602082015160405163731133e960e01b81526001600160a01b039092169163731133e991610fcf91600390600190600401611dee565b600060405180830381600087803b158015610fe957600080fd5b505af1158015610ffd573d6000803e3d6000fd5b505050505b50600101610ea0565b6000828152603360205260409020600201546110299061036a61163f565b6108865760405162461bcd60e51b815260040180806020018281038252603081526020018061253a6030913960400191505060405180910390fd5b60006105f4826001611643565b61108b60008051602061251a83398151915261036a61163f565b6110a75760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b1576110c2828281518110610a4357fe5b6110de5760405162461bcd60e51b815260040161045690611f93565b60655482516001600160a01b039091169063f5298aca9084908490811061110157fe5b60200260200101516001806040518463ffffffff1660e01b815260040161112a93929190611dcd565b600060405180830381600087803b15801561114457600080fd5b505af1158015611158573d6000803e3d6000fd5b5050600190920191506110aa9050565b61118260008051602061251a83398151915261036a61163f565b61119e5760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b1576111b2611ae8565b8282815181106111be57fe5b602002602001015190506111d58160000151610dfd565b6111f15760405162461bcd60e51b815260040161045690612092565b6111fe8160200151610dfd565b61121a5760405162461bcd60e51b8152600401610456906120e8565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161125091600290600190600401611dcd565b600060405180830381600087803b15801561126a57600080fd5b505af115801561127e573d6000803e3d6000fd5b50506065546020840151604051637a94c56560e11b81526001600160a01b03909216935063f5298aca92506112bb91600290600190600401611dcd565b600060405180830381600087803b1580156112d557600080fd5b505af11580156112e9573d6000803e3d6000fd5b5050600190930192506111a1915050565b61131460008051602061251a83398151915261036a61163f565b6113305760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b157611344611ae8565b82828151811061135057fe5b602002602001015190506113678160000151610dfd565b156113845760405162461bcd60e51b815260040161045690611fe9565b6113918160200151610dfd565b156113ae5760405162461bcd60e51b81526004016104569061238e565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e9916113e491600290600190600401611dee565b600060405180830381600087803b1580156113fe57600080fd5b505af1158015611412573d6000803e3d6000fd5b5050606554602084015160405163731133e960e01b81526001600160a01b03909216935063731133e9925061144f91600290600190600401611dee565b600060405180830381600087803b15801561146957600080fd5b505af115801561147d573d6000803e3d6000fd5b505060019093019250611333915050565b6065546001600160a01b031681565b6114b760008051602061251a83398151915261036a61163f565b6114d35760405162461bcd60e51b815260040161045690612188565b60005b81518110156107b1576114e7611ae8565b8282815181106114f357fe5b6020026020010151905061150a81600001516109e5565b6115265760405162461bcd60e51b815260040161045690611efb565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161155c91600390600190600401611dcd565b600060405180830381600087803b15801561157657600080fd5b505af115801561158a573d6000803e3d6000fd5b5050505060208101516001600160a01b031615611636576115ae81602001516109e5565b6115ca5760405162461bcd60e51b81526004016104569061233c565b6065546020820151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161160391600390600190600401611dcd565b600060405180830381600087803b15801561161d57600080fd5b505af1158015611631573d6000803e3d6000fd5b505050505b506001016114d6565b3390565b606554604051627eeac760e11b81526000916001600160a01b03169062fdd58e906116749086908690600401611db4565b60206040518083038186803b15801561168c57600080fd5b505afa1580156116a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c49190611d43565b6116d0575060006105f4565b50600192915050565b60008281526033602052604090206116f1908261188e565b156107b1576116fe61163f565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260336020526040902061175a90826118a3565b156107b15761176761163f565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b303b1590565b600054610100900460ff16806117ca57506117ca6117ab565b806117d8575060005460ff16155b6118135760405162461bcd60e51b815260040180806020018281038252602e81526020018061256a602e913960400191505060405180910390fd5b600054610100900460ff1615801561183e576000805460ff1961ff0019909116610100171660011790555b6118466118b8565b61184e6118b8565b8015610dfa576000805461ff001916905550565b6000610e228383611958565b6000610e22836001600160a01b0384166119bc565b60006105f4826119d4565b6000610e22836001600160a01b0384166119d8565b6000610e22836001600160a01b038416611a22565b600054610100900460ff16806118d157506118d16117ab565b806118df575060005460ff16155b61191a5760405162461bcd60e51b815260040180806020018281038252602e81526020018061256a602e913960400191505060405180910390fd5b600054610100900460ff1615801561184e576000805460ff1961ff0019909116610100171660011790558015610dfa576000805461ff001916905550565b8154600090821061199a5760405162461bcd60e51b81526004018080602001828103825260228152602001806124c96022913960400191505060405180910390fd5b8260000182815481106119a957fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b60006119e483836119bc565b611a1a575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105f4565b5060006105f4565b60008181526001830160205260408120548015611ade5783546000198083019190810190600090879083908110611a5557fe5b9060005260206000200154905080876000018481548110611a7257fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611aa257fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506105f4565b60009150506105f4565b604080518082019091526000808252602082015290565b80356001600160a01b03811681146104d857600080fd5b600082601f830112611b26578081fd5b8135611b39611b34826124aa565b612486565b818152915060208083019084810181840286018201871015611b5a57600080fd5b60005b84811015611b8057611b6e82611aff565b84529282019290820190600101611b5d565b505050505092915050565b600060208284031215611b9c578081fd5b610e2282611aff565b60008060408385031215611bb7578081fd5b611bc083611aff565b9150611bce60208401611aff565b90509250929050565b600060208284031215611be8578081fd5b813567ffffffffffffffff811115611bfe578182fd5b611c0a84828501611b16565b949350505050565b60006020808385031215611c24578182fd5b823567ffffffffffffffff80821115611c3b578384fd5b818501915085601f830112611c4e578384fd5b8135611c5c611b34826124aa565b818152848101908486016040808502870188018b1015611c7a578889fd5b8896505b84871015611cd95780828c031215611c94578889fd5b80518181018181108882111715611ca757fe5b8252611cb283611aff565b8152611cbf898401611aff565b818a01528452600196909601959287019290810190611c7e565b50909998505050505050505050565b600060208284031215611cf9578081fd5b5035919050565b60008060408385031215611d12578182fd5b82359150611bce60208401611aff565b60008060408385031215611d34578182fd5b50508035926020909101359150565b600060208284031215611d54578081fd5b5051919050565b60008060408385031215611d6d578182fd5b82359150602083013567ffffffffffffffff811115611d8a578182fd5b611d9685828601611b16565b9150509250929050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b039390931683526020830191909152604082015260600190565b6001600160a01b039390931683526020830191909152604082015260806060820181905260009082015260a00190565b901515815260200190565b90815260200190565b60208082526025908201527f5f7065726d697373696f6e7341646d696e20697320746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602d908201527f5065726d697373696f6e4d616e616765723a2050726f787920697320616c726560408201526c18591e481cdd5cdc195b991959609a1b606082015260800190565b6020808252601c908201527f6d75737420686176652064656661756c742061646d696e20726f6c6500000000604082015260600190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2041646472657373206973206e6f6040820152731d0818dd5c9c995b9d1b1e481c995a9958dd195960621b606082015260800190565b60208082526024908201527f5f7065726d697373696f6e4974656d7320697320746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320646f65736e60408201527509dd081a185cc8151a595c880c48185cdcda59db995960521b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320616c726561604082015275191e481a185cc8151a595c880c88185cdcda59db995960521b606082015260800190565b60208082526033908201527f5065726d697373696f6e4d616e616765723a2050726f7879206973206e6f742060408201527218dd5c9c995b9d1b1e481cdd5cdc195b991959606a1b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320646f65736e60408201527509dd081a185cc8151a595c880c88185cdcda59db995960521b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2050726f787920646f65736e2774604082015273081a185cc8151a595c880c88185cdcda59db995960621b606082015260800190565b6020808252602c908201527f5065726d697373696f6e4d616e616765723a2050726f787920697320616c726560408201526b18591e481c995a9958dd195960a21b606082015260800190565b6020808252818101527f6d7573742068617665207065726d697373696f6e732061646d696e20726f6c65604082015260600190565b60208082526030908201527f5065726d697373696f6e4d616e616765723a204163636f756e7420697320617360408201526f7369676e65642077697468206974656d60801b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a204163636f756e74206973206e6f604082015273742061737369676e65642077697468206974656d60601b606082015260800190565b6020808252601a908201527f5f61646d696e20697320746865207a65726f2061646472657373000000000000604082015260600190565b6020808252602f908201527f5065726d697373696f6e4d616e616765723a204164647265737320697320616c60408201526e1c9958591e481cdd5cdc195b991959608a1b606082015260800190565b60208082526035908201527f5065726d697373696f6e4d616e616765723a2041646472657373206973206e6f6040820152741d0818dd5c9c995b9d1b1e481cdd5cdc195b991959605a1b606082015260800190565b60208082526032908201527f5065726d697373696f6e4d616e616765723a2050726f7879206973206e6f742060408201527118dd5c9c995b9d1b1e481c995a9958dd195960721b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2050726f787920616c7265616479604082015273081a185cc8151a595c880c88185cdcda59db995960621b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320616c726561604082015275191e481a185cc8151a595c880c48185cdcda59db995960521b606082015260800190565b6020808252602e908201527f5065726d697373696f6e4d616e616765723a204164647265737320697320616c60408201526d1c9958591e481c995a9958dd195960921b606082015260800190565b60405181810167ffffffffffffffff811182821017156124a257fe5b604052919050565b600067ffffffffffffffff8211156124be57fe5b506020908102019056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74f0303df69e2386d84f0d1b8823a00970e6506cfd9a69a69889045683cbd9e2a7416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a26469706673582212200d379fd1e415d338f42fc8f0c6488bd659755e85877ec5871796a6a503b4c55a64736f6c63430007040033";
