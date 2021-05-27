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
  "0x608060405234801561001057600080fd5b50612604806100206000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806382e672d61161010f578063d547741f116100a2578063e73ccb3c11610071578063e73ccb3c146103e6578063f15e0b60146103f9578063fc8a53641461040c578063fd32b05914610414576101f0565b8063d547741f146103ad578063d88a8951146103c0578063d9d7b4721461036f578063df2f73a0146103d3576101f0565b8063c6b6c17a116100de578063c6b6c17a14610377578063ca15c8731461037f578063cbbc66ef14610392578063d4d4bcdb1461039a576101f0565b806382e672d6146103295780639010d07c1461033c57806391d148541461035c578063a217fddf1461036f576101f0565b80632f2ff15d1161018757806350622e9b1161015657806350622e9b146102dd57806362071a29146102f05780637cc1bb7f146103035780637d43a3b114610316576101f0565b80632f2ff15d1461029157806336568abe146102a4578063485cc955146102b757806348a46bd3146102ca576101f0565b8063248a9ca3116101c3578063248a9ca31461025b578063260afc1d1461026e57806329a363e9146102815780632d703a0914610289576101f0565b80630d80aa96146101f557806318dc8bed146102135780631f29d64e14610233578063232e0e9a14610248575b600080fd5b6101fd610427565b60405161020a9190611e31565b60405180910390f35b610226610221366004611b93565b61042c565b60405161020a9190611e26565b610246610241366004611d63565b6104dd565b005b610226610256366004611b93565b6105e7565b6101fd610269366004611cf0565b6105fa565b61024661027c366004611c1a565b61060f565b6101fd6107b5565b6101fd6107c7565b61024661029f366004611d08565b6107cc565b6102466102b2366004611d08565b61082f565b6102466102c5366004611bad565b610890565b6102266102d8366004611b93565b6109e5565b6102466102eb366004611bdf565b6109f2565b6102466102fe366004611d63565b610af7565b610246610311366004611c1a565b610bef565b610246610324366004611b93565b610d93565b610226610337366004611b93565b610dfd565b61034f61034a366004611d2a565b610e0a565b60405161020a9190611da8565b61022661036a366004611d08565b610e29565b6101fd610e41565b6101fd610e46565b6101fd61038d366004611cf0565b610e4b565b6101fd610e62565b6102466103a8366004611c1a565b610e67565b6102466103bb366004611d08565b61100b565b6102266103ce366004611b93565b611064565b6102466103e1366004611bdf565b611071565b6102466103f4366004611c1a565b611168565b610246610407366004611c1a565b6112fa565b61034f61148e565b610246610422366004611c1a565b61149d565b600481565b600061043a8161036a61163f565b61045f5760405162461bcd60e51b815260040161045690611ecc565b60405180910390fd5b6001600160a01b0382166104855760405162461bcd60e51b815260040161045690611f57565b6040516001600160a01b038316907fdcd171a114b3defbe6183db035bfa13bf4bc50a165623de6bebb68dcad82fa6490600090a250606580546001600160a01b0319166001600160a01b03831617905560015b919050565b6104f760008051602061252283398151915261036a61163f565b6105135760405162461bcd60e51b815260040161045690612190565b60005b81518110156105e25761053c82828151811061052e57fe5b602002602001015184611643565b6105585760405162461bcd60e51b815260040161045690612215565b60655482516001600160a01b039091169063f5298aca9084908490811061057b57fe5b60200260200101518560016040518463ffffffff1660e01b81526004016105a493929190611dd5565b600060405180830381600087803b1580156105be57600080fd5b505af11580156105d2573d6000803e3d6000fd5b5050600190920191506105169050565b505050565b60006105f4826000611643565b92915050565b60009081526033602052604090206002015490565b61062960008051602061252283398151915261036a61163f565b6106455760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b157610659611af0565b82828151811061066557fe5b6020026020010151905061067c81600001516105e7565b6106985760405162461bcd60e51b8152600401610456906122ef565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca916106ce91600090600190600401611dd5565b600060405180830381600087803b1580156106e857600080fd5b505af11580156106fc573d6000803e3d6000fd5b5050505060208101516001600160a01b0316156107a85761072081602001516105e7565b61073c5760405162461bcd60e51b815260040161045690612047565b6065546020820151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161077591600090600190600401611dd5565b600060405180830381600087803b15801561078f57600080fd5b505af11580156107a3573d6000803e3d6000fd5b505050505b50600101610648565b5050565b60008051602061252283398151915281565b600281565b6000828152603360205260409020600201546107ea9061036a61163f565b6108255760405162461bcd60e51b815260040180806020018281038252602f8152602001806124f3602f913960400191505060405180910390fd5b6107b182826116d0565b61083761163f565b6001600160a01b0316816001600160a01b0316146108865760405162461bcd60e51b815260040180806020018281038252602f8152602001806125a0602f913960400191505060405180910390fd5b6107b18282611739565b600054610100900460ff16806108a957506108a96117a2565b806108b7575060005460ff16155b6108f25760405162461bcd60e51b815260040180806020018281038252602e815260200180612572602e913960400191505060405180910390fd5b600054610100900460ff1615801561091d576000805460ff1961ff0019909116610100171660011790555b6001600160a01b0383166109435760405162461bcd60e51b815260040161045690611f57565b6001600160a01b0382166109695760405162461bcd60e51b815260040161045690612269565b606580546001600160a01b0319166001600160a01b03851617905561098c6117b3565b610997600083610825565b6065546040516001600160a01b03909116907fdcd171a114b3defbe6183db035bfa13bf4bc50a165623de6bebb68dcad82fa6490600090a280156105e2576000805461ff0019169055505050565b60006105f4826003611643565b610a0c60008051602061252283398151915261036a61163f565b610a285760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b157610a50828281518110610a4357fe5b6020026020010151611064565b15610a6d5760405162461bcd60e51b8152600401610456906123ea565b60655482516001600160a01b039091169063731133e990849084908110610a9057fe5b60200260200101516001806040518463ffffffff1660e01b8152600401610ab993929190611df6565b600060405180830381600087803b158015610ad357600080fd5b505af1158015610ae7573d6000803e3d6000fd5b505060019092019150610a2b9050565b610b1160008051602061252283398151915261036a61163f565b610b2d5760405162461bcd60e51b815260040161045690612190565b60005b81518110156105e257610b4882828151811061052e57fe5b15610b655760405162461bcd60e51b8152600401610456906121c5565b60655482516001600160a01b039091169063731133e990849084908110610b8857fe5b60200260200101518560016040518463ffffffff1660e01b8152600401610bb193929190611df6565b600060405180830381600087803b158015610bcb57600080fd5b505af1158015610bdf573d6000803e3d6000fd5b505060019092019150610b309050565b610c0960008051602061252283398151915261036a61163f565b610c255760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b157610c39611af0565b828281518110610c4557fe5b60200260200101519050610c5c81600001516105e7565b15610c795760405162461bcd60e51b8152600401610456906122a0565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e991610caf91600090600190600401611df6565b600060405180830381600087803b158015610cc957600080fd5b505af1158015610cdd573d6000803e3d6000fd5b5050505060208101516001600160a01b031615610d8a57610d0181602001516105e7565b15610d1e5760405162461bcd60e51b815260040161045690611e7f565b606554602082015160405163731133e960e01b81526001600160a01b039092169163731133e991610d5791600090600190600401611df6565b600060405180830381600087803b158015610d7157600080fd5b505af1158015610d85573d6000803e3d6000fd5b505050505b50600101610c28565b610da0600061036a61163f565b610dbc5760405162461bcd60e51b815260040161045690611ecc565b6001600160a01b038116610de25760405162461bcd60e51b815260040161045690611e3a565b610dfa600080516020612522833981519152826107cc565b50565b60006105f4826002611643565b6000828152603360205260408120610e229083611864565b9392505050565b6000828152603360205260408120610e229083611870565b600081565b600181565b60008181526033602052604081206105f490611885565b600381565b610e8160008051602061252283398151915261036a61163f565b610e9d5760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b157610eb1611af0565b828281518110610ebd57fe5b60200260200101519050610ed481600001516109e5565b15610ef15760405162461bcd60e51b815260040161045690612440565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e991610f2791600390600190600401611df6565b600060405180830381600087803b158015610f4157600080fd5b505af1158015610f55573d6000803e3d6000fd5b5050505060208101516001600160a01b03161561100257610f7981602001516109e5565b15610f965760405162461bcd60e51b815260040161045690612144565b606554602082015160405163731133e960e01b81526001600160a01b039092169163731133e991610fcf91600390600190600401611df6565b600060405180830381600087803b158015610fe957600080fd5b505af1158015610ffd573d6000803e3d6000fd5b505050505b50600101610ea0565b6000828152603360205260409020600201546110299061036a61163f565b6108865760405162461bcd60e51b81526004018080602001828103825260308152602001806125426030913960400191505060405180910390fd5b60006105f4826001611643565b61108b60008051602061252283398151915261036a61163f565b6110a75760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b1576110c2828281518110610a4357fe5b6110de5760405162461bcd60e51b815260040161045690611f9b565b60655482516001600160a01b039091169063f5298aca9084908490811061110157fe5b60200260200101516001806040518463ffffffff1660e01b815260040161112a93929190611dd5565b600060405180830381600087803b15801561114457600080fd5b505af1158015611158573d6000803e3d6000fd5b5050600190920191506110aa9050565b61118260008051602061252283398151915261036a61163f565b61119e5760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b1576111b2611af0565b8282815181106111be57fe5b602002602001015190506111d58160000151610dfd565b6111f15760405162461bcd60e51b81526004016104569061209a565b6111fe8160200151610dfd565b61121a5760405162461bcd60e51b8152600401610456906120f0565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161125091600290600190600401611dd5565b600060405180830381600087803b15801561126a57600080fd5b505af115801561127e573d6000803e3d6000fd5b50506065546020840151604051637a94c56560e11b81526001600160a01b03909216935063f5298aca92506112bb91600290600190600401611dd5565b600060405180830381600087803b1580156112d557600080fd5b505af11580156112e9573d6000803e3d6000fd5b5050600190930192506111a1915050565b61131460008051602061252283398151915261036a61163f565b6113305760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b157611344611af0565b82828151811061135057fe5b602002602001015190506113678160000151610dfd565b156113845760405162461bcd60e51b815260040161045690611ff1565b6113918160200151610dfd565b156113ae5760405162461bcd60e51b815260040161045690612396565b606554815160405163731133e960e01b81526001600160a01b039092169163731133e9916113e491600290600190600401611df6565b600060405180830381600087803b1580156113fe57600080fd5b505af1158015611412573d6000803e3d6000fd5b5050606554602084015160405163731133e960e01b81526001600160a01b03909216935063731133e9925061144f91600290600190600401611df6565b600060405180830381600087803b15801561146957600080fd5b505af115801561147d573d6000803e3d6000fd5b505060019093019250611333915050565b6065546001600160a01b031681565b6114b760008051602061252283398151915261036a61163f565b6114d35760405162461bcd60e51b815260040161045690612190565b60005b81518110156107b1576114e7611af0565b8282815181106114f357fe5b6020026020010151905061150a81600001516109e5565b6115265760405162461bcd60e51b815260040161045690611f03565b6065548151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161155c91600390600190600401611dd5565b600060405180830381600087803b15801561157657600080fd5b505af115801561158a573d6000803e3d6000fd5b5050505060208101516001600160a01b031615611636576115ae81602001516109e5565b6115ca5760405162461bcd60e51b815260040161045690612344565b6065546020820151604051637a94c56560e11b81526001600160a01b039092169163f5298aca9161160391600390600190600401611dd5565b600060405180830381600087803b15801561161d57600080fd5b505af1158015611631573d6000803e3d6000fd5b505050505b506001016114d6565b3390565b606554604051627eeac760e11b815260009182916001600160a01b039091169062fdd58e906116789087908790600401611dbc565b60206040518083038186803b15801561169057600080fd5b505afa1580156116a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c89190611d4b565b119392505050565b60008281526033602052604090206116e89082611890565b156107b1576116f561163f565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260336020526040902061175190826118a5565b156107b15761175e61163f565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006117ad306118ba565b15905090565b600054610100900460ff16806117cc57506117cc6117a2565b806117da575060005460ff16155b6118155760405162461bcd60e51b815260040180806020018281038252602e815260200180612572602e913960400191505060405180910390fd5b600054610100900460ff16158015611840576000805460ff1961ff0019909116610100171660011790555b6118486118c0565b6118506118c0565b8015610dfa576000805461ff001916905550565b6000610e228383611960565b6000610e22836001600160a01b0384166119c4565b60006105f4826119dc565b6000610e22836001600160a01b0384166119e0565b6000610e22836001600160a01b038416611a2a565b3b151590565b600054610100900460ff16806118d957506118d96117a2565b806118e7575060005460ff16155b6119225760405162461bcd60e51b815260040180806020018281038252602e815260200180612572602e913960400191505060405180910390fd5b600054610100900460ff16158015611850576000805460ff1961ff0019909116610100171660011790558015610dfa576000805461ff001916905550565b815460009082106119a25760405162461bcd60e51b81526004018080602001828103825260228152602001806124d16022913960400191505060405180910390fd5b8260000182815481106119b157fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b60006119ec83836119c4565b611a22575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105f4565b5060006105f4565b60008181526001830160205260408120548015611ae65783546000198083019190810190600090879083908110611a5d57fe5b9060005260206000200154905080876000018481548110611a7a57fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611aaa57fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506105f4565b60009150506105f4565b604080518082019091526000808252602082015290565b80356001600160a01b03811681146104d857600080fd5b600082601f830112611b2e578081fd5b8135611b41611b3c826124b2565b61248e565b818152915060208083019084810181840286018201871015611b6257600080fd5b60005b84811015611b8857611b7682611b07565b84529282019290820190600101611b65565b505050505092915050565b600060208284031215611ba4578081fd5b610e2282611b07565b60008060408385031215611bbf578081fd5b611bc883611b07565b9150611bd660208401611b07565b90509250929050565b600060208284031215611bf0578081fd5b813567ffffffffffffffff811115611c06578182fd5b611c1284828501611b1e565b949350505050565b60006020808385031215611c2c578182fd5b823567ffffffffffffffff80821115611c43578384fd5b818501915085601f830112611c56578384fd5b8135611c64611b3c826124b2565b818152848101908486016040808502870188018b1015611c82578889fd5b8896505b84871015611ce15780828c031215611c9c578889fd5b80518181018181108882111715611caf57fe5b8252611cba83611b07565b8152611cc7898401611b07565b818a01528452600196909601959287019290810190611c86565b50909998505050505050505050565b600060208284031215611d01578081fd5b5035919050565b60008060408385031215611d1a578182fd5b82359150611bd660208401611b07565b60008060408385031215611d3c578182fd5b50508035926020909101359150565b600060208284031215611d5c578081fd5b5051919050565b60008060408385031215611d75578182fd5b82359150602083013567ffffffffffffffff811115611d92578182fd5b611d9e85828601611b1e565b9150509250929050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b039390931683526020830191909152604082015260600190565b6001600160a01b039390931683526020830191909152604082015260806060820181905260009082015260a00190565b901515815260200190565b90815260200190565b60208082526025908201527f5f7065726d697373696f6e7341646d696e20697320746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602d908201527f5065726d697373696f6e4d616e616765723a2050726f787920697320616c726560408201526c18591e481cdd5cdc195b991959609a1b606082015260800190565b6020808252601c908201527f6d75737420686176652064656661756c742061646d696e20726f6c6500000000604082015260600190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2041646472657373206973206e6f6040820152731d0818dd5c9c995b9d1b1e481c995a9958dd195960621b606082015260800190565b60208082526024908201527f5f7065726d697373696f6e4974656d7320697320746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320646f65736e60408201527509dd081a185cc8151a595c880c48185cdcda59db995960521b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320616c726561604082015275191e481a185cc8151a595c880c88185cdcda59db995960521b606082015260800190565b60208082526033908201527f5065726d697373696f6e4d616e616765723a2050726f7879206973206e6f742060408201527218dd5c9c995b9d1b1e481cdd5cdc195b991959606a1b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320646f65736e60408201527509dd081a185cc8151a595c880c88185cdcda59db995960521b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2050726f787920646f65736e2774604082015273081a185cc8151a595c880c88185cdcda59db995960621b606082015260800190565b6020808252602c908201527f5065726d697373696f6e4d616e616765723a2050726f787920697320616c726560408201526b18591e481c995a9958dd195960a21b606082015260800190565b6020808252818101527f6d7573742068617665207065726d697373696f6e732061646d696e20726f6c65604082015260600190565b60208082526030908201527f5065726d697373696f6e4d616e616765723a204163636f756e7420697320617360408201526f7369676e65642077697468206974656d60801b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a204163636f756e74206973206e6f604082015273742061737369676e65642077697468206974656d60601b606082015260800190565b6020808252601a908201527f5f61646d696e20697320746865207a65726f2061646472657373000000000000604082015260600190565b6020808252602f908201527f5065726d697373696f6e4d616e616765723a204164647265737320697320616c60408201526e1c9958591e481cdd5cdc195b991959608a1b606082015260800190565b60208082526035908201527f5065726d697373696f6e4d616e616765723a2041646472657373206973206e6f6040820152741d0818dd5c9c995b9d1b1e481cdd5cdc195b991959605a1b606082015260800190565b60208082526032908201527f5065726d697373696f6e4d616e616765723a2050726f7879206973206e6f742060408201527118dd5c9c995b9d1b1e481c995a9958dd195960721b606082015260800190565b60208082526034908201527f5065726d697373696f6e4d616e616765723a2050726f787920616c7265616479604082015273081a185cc8151a595c880c88185cdcda59db995960621b606082015260800190565b60208082526036908201527f5065726d697373696f6e4d616e616765723a204164647265737320616c726561604082015275191e481a185cc8151a595c880c48185cdcda59db995960521b606082015260800190565b6020808252602e908201527f5065726d697373696f6e4d616e616765723a204164647265737320697320616c60408201526d1c9958591e481c995a9958dd195960921b606082015260800190565b60405181810167ffffffffffffffff811182821017156124aa57fe5b604052919050565b600067ffffffffffffffff8211156124c657fe5b506020908102019056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74f0303df69e2386d84f0d1b8823a00970e6506cfd9a69a69889045683cbd9e2a7416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a2646970667358221220ee12306effe5a54f2c234b357fd999c4bdfc076fe35ba3ced6e778fba45a975364736f6c63430007040033";
