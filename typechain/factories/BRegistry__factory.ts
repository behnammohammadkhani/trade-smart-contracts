/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BRegistry } from "../BRegistry";

export class BRegistry__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_bfactory: string, overrides?: Overrides): Promise<BRegistry> {
    return super.deploy(_bfactory, overrides || {}) as Promise<BRegistry>;
  }
  getDeployTransaction(
    _bfactory: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_bfactory, overrides || {});
  }
  attach(address: string): BRegistry {
    return super.attach(address) as BRegistry;
  }
  connect(signer: Signer): BRegistry__factory {
    return super.connect(signer) as BRegistry__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BRegistry {
    return new Contract(address, _abi, signerOrProvider) as BRegistry;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_bfactory",
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
        name: "token1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "oldIndices",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "newIndices",
        type: "bytes32",
      },
    ],
    name: "IndicesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token2",
        type: "address",
      },
    ],
    name: "PoolTokenPairAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
    ],
    name: "_getEffectiveLiquidityForPoolsPurge",
    outputs: [
      {
        internalType: "uint256[]",
        name: "effectiveLiquidity",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
    ],
    name: "addPoolPair",
    outputs: [
      {
        internalType: "uint256",
        name: "listed",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "token2",
        type: "address",
      },
    ],
    name: "addPools",
    outputs: [
      {
        internalType: "uint256[]",
        name: "listed",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bfactory",
    outputs: [
      {
        internalType: "contract IBFactory",
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
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "destToken",
        type: "address",
      },
    ],
    name: "getBestPools",
    outputs: [
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "destToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getBestPoolsWithLimit",
    outputs: [
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "destToken",
        type: "address",
      },
    ],
    name: "getPairInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "weight1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weight2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
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
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "destToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "getPoolsWithLimit",
    outputs: [
      {
        internalType: "address[]",
        name: "result",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "lengthLimit",
        type: "uint256",
      },
    ],
    name: "sortPools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "lengthLimit",
        type: "uint256",
      },
    ],
    name: "sortPoolsWithPurge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516121cb3803806121cb8339818101604052602081101561003357600080fd5b5051600280546001600160a01b0319166001600160a01b03909216919091179055612168806100636000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063b108cd3711610066578063b108cd3714610354578063b176e29514610390578063bfdbfc43146103b4578063e7156fa3146103ea578063f5406970146104185761009e565b80632013c706146100a3578063500b6c71146101ad5780637a846457146101f757806388376fbe14610267578063a2754996146102e6575b600080fd5b61015d600480360360608110156100b957600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b8111156100ec57600080fd5b8201836020820111156100fe57600080fd5b803590602001918460208302840111600160201b8311171561011f57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955061046e945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610199578181015183820152602001610181565b505050509050019250505060405180910390f35b6101e5600480360360608110156101c357600080fd5b506001600160a01b038135811691602081013582169160409091013516610a18565b60408051918252519081900360200190f35b6102656004803603604081101561020d57600080fd5b810190602081018135600160201b81111561022757600080fd5b82018360208201111561023957600080fd5b803590602001918460208302840111600160201b8311171561025a57600080fd5b919350915035610f86565b005b61015d6004803603606081101561027d57600080fd5b810190602081018135600160201b81111561029757600080fd5b8201836020820111156102a957600080fd5b803590602001918460208302840111600160201b831117156102ca57600080fd5b91935091506001600160a01b0381358116916020013516611253565b610265600480360360408110156102fc57600080fd5b810190602081018135600160201b81111561031657600080fd5b82018360208201111561032857600080fd5b803590602001918460208302840111600160201b8311171561034957600080fd5b9193509150356112f2565b61015d6004803603608081101561036a57600080fd5b506001600160a01b03813581169160208101359091169060408101359060600135611549565b61039861163c565b604080516001600160a01b039092168252519081900360200190f35b61015d600480360360608110156103ca57600080fd5b506001600160a01b0381358116916020810135909116906040013561164b565b61015d6004803603604081101561040057600080fd5b506001600160a01b0381358116916020013516611783565b6104506004803603606081101561042e57600080fd5b506001600160a01b03813581169160208101358216916040909101351661179a565b60408051938452602084019290925282820152519081900360600190f35b606060008061047d868661182c565b905060005b8451811015610832576104936120ea565b600160008784815181106104a357fe5b6020908102919091018101516001600160a01b03908116835282820193909352604091820160009081208782528252829020825160808101845281546001600160501b038082168352600160501b8204811694830194909452600160a01b900490921692820192909252600190910154606082015291508781169089161015610742578051602082015161054e916001600160501b03908116916105499183911661188e565b6118e8565b6001600088858151811061055e57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060008581526020019081526020016000206001018190555061068c8683815181106105ad57fe5b60200260200101516001600160a01b031663f8b2cb4f896040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561060157600080fd5b505afa158015610615573d6000803e3d6000fd5b505050506040513d602081101561062b57600080fd5b505187516001906000908a908790811061064157fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000868152602001908152602001600020600101546119fb90919063ffffffff16565b6001600088858151811061069c57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060008581526020019081526020016000206001018190555061073b600160008885815181106106ef57fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000858152602001908152602001600020600101548561188e90919063ffffffff16565b9350610829565b60208101518151610764916001600160501b039081169161054991168261188e565b6001600088858151811061077457fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000858152602001908152602001600020600101819055506107c38683815181106105ad57fe5b600160008885815181106107d357fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600085815260200190815260200160002060010181905550610826600160008885815181106106ef57fe5b93505b50600101610482565b5060006108478367016345785d8a0000611a54565b905060005b600083815260208190526040902061086390611b16565b81101561091b57600083815260208190526040812060019081018054859391908590811061088d57fe5b60009182526020808320909101546001600160a01b031683528281019390935260409182018120878252909252902060010154101561091357600083815260208190526040902060010180546109119190839081106108e857fe5b6000918252602080832090910154868352908290526040909120906001600160a01b0316611b1d565b505b60010161084c565b50600082815260208190526040902061093390611b16565b67ffffffffffffffff8111801561094957600080fd5b50604051908082528060200260200182016040528015610973578160200160208202803683370190505b50935060005b600083815260208190526040902061099090611b16565b811015610a0d57600083815260208190526040812060019081018054919291849081106109b957fe5b60009182526020808320909101546001600160a01b03168352828101939093526040918201812086825290925290206001015485518690839081106109fa57fe5b6020908102919091010152600101610979565b505050509392505050565b6002546040805163615db6e160e11b81526001600160a01b0386811660048301529151600093929092169163c2bb6dc291602480820192602092909190829003018186803b158015610a6957600080fd5b505afa158015610a7d573d6000803e3d6000fd5b505050506040513d6020811015610a9357600080fd5b5051610ad6576040805162461bcd60e51b815260206004820152600d60248201526c11549497d393d517d09413d3d3609a1b604482015290519081900360640190fd5b6000846001600160a01b031663d4cadf686040518163ffffffff1660e01b815260040160206040518083038186803b158015610b1157600080fd5b505afa158015610b25573d6000803e3d6000fd5b505050506040513d6020811015610b3b57600080fd5b50519050666a94d74f430000811115610b8e576040805162461bcd60e51b815260206004820152601060248201526f08aa4a4be8c8a8abea89e9ebe90928e960831b604482015290519081900360640190fd5b6000610b9a858561182c565b6000818152602081905260409020909150610bb59087611c30565b50836001600160a01b0316856001600160a01b03161015610d82576040518060800160405280876001600160a01b031663948d8ce6886040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610c2857600080fd5b505afa158015610c3c573d6000803e3d6000fd5b505050506040513d6020811015610c5257600080fd5b50516001600160501b0316815260408051634a46c67360e11b81526001600160a01b0388811660048301529151602093840193928b169263948d8ce69260248082019391829003018186803b158015610caa57600080fd5b505afa158015610cbe573d6000803e3d6000fd5b505050506040513d6020811015610cd457600080fd5b50516001600160501b039081168252848116602083810191909152600060409384018190526001600160a01b038b16815260018083528482208783528352908490208551815493870151958701518516600160a01b0269ffffffffffffffffffff60a01b19968616600160501b0269ffffffffffffffffffff60501b199290961669ffffffffffffffffffff1990951694909417169390931793909316178155606090920151910155610f30565b6040518060800160405280876001600160a01b031663948d8ce6876040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610dda57600080fd5b505afa158015610dee573d6000803e3d6000fd5b505050506040513d6020811015610e0457600080fd5b50516001600160501b0316815260408051634a46c67360e11b81526001600160a01b0389811660048301529151602093840193928b169263948d8ce69260248082019391829003018186803b158015610e5c57600080fd5b505afa158015610e70573d6000803e3d6000fd5b505050506040513d6020811015610e8657600080fd5b50516001600160501b039081168252848116602083810191909152600060409384018190526001600160a01b038b16815260018083528482208783528352908490208551815493870151958701518516600160a01b0269ffffffffffffffffffff60a01b19968616600160501b0269ffffffffffffffffffff60501b199290961669ffffffffffffffffffff19909516949094171693909317939093161781556060909201519101555b836001600160a01b0316856001600160a01b0316876001600160a01b03167f181090c3a4bc51a62093032ebf96fd26ff1f27c2145aa9a28c8a5b9f627bcdd460405160405180910390a450506001019392505050565b60005b8281101561124d57600181015b83811015611244576000610fe0868685818110610faf57fe5b905060200201356001600160a01b0316878785818110610fcb57fe5b905060200201356001600160a01b031661182c565b90506060611032878786818110610ff357fe5b905060200201356001600160a01b031688888681811061100f57fe5b905060200201356001600160a01b0316600061102d6101008a611c89565b611549565b9050606061107788888781811061104557fe5b905060200201356001600160a01b031689898781811061106157fe5b905060200201356001600160a01b031684611c9f565b9050600061108482611f1a565b6000858152602081905260409020600201549091508114611234578888868181106110ab57fe5b905060200201356001600160a01b03166001600160a01b03168989888181106110d057fe5b905060200201356001600160a01b03166001600160a01b03161061110f578888878181106110fa57fe5b905060200201356001600160a01b031661112c565b88888681811061111b57fe5b905060200201356001600160a01b03165b6001600160a01b031689898781811061114157fe5b905060200201356001600160a01b03166001600160a01b03168a8a8981811061116657fe5b905060200201356001600160a01b03166001600160a01b0316106111a55789898781811061119057fe5b905060200201356001600160a01b03166111c2565b8989888181106111b157fe5b905060200201356001600160a01b03165b6001600160a01b03167fa91f9532dc66c94302dbfd7be21a31cdee3b1c97e8b3064aab212b8e64e936c56000808881526020019081526020016000206002015484604051808381526020018281526020019250505060405180910390a360008481526020819052604090206002018190555b505060019092019150610f969050565b50600101610f89565b50505050565b60608367ffffffffffffffff8111801561126c57600080fd5b50604051908082528060200260200182016040528015611296578160200160208202803683370190505b50905060005b848110156112e9576112ca8686838181106112b357fe5b905060200201356001600160a01b03168585610a18565b8282815181106112d657fe5b602090810291909101015260010161129c565b50949350505050565b60005b8281101561124d57600181015b8381101561154057600061131b868685818110610faf57fe5b9050606061132e878786818110610ff357fe5b9050606061137388888781811061134157fe5b905060200201356001600160a01b031689898781811061135d57fe5b905060200201356001600160a01b03168461046e565b9050600061138082611f1a565b6000858152602081905260409020600201549091508114611530578888868181106113a757fe5b905060200201356001600160a01b03166001600160a01b03168989888181106113cc57fe5b905060200201356001600160a01b03166001600160a01b03161061140b578888878181106113f657fe5b905060200201356001600160a01b0316611428565b88888681811061141757fe5b905060200201356001600160a01b03165b6001600160a01b031689898781811061143d57fe5b905060200201356001600160a01b03166001600160a01b03168a8a8981811061146257fe5b905060200201356001600160a01b03166001600160a01b0316106114a15789898781811061148c57fe5b905060200201356001600160a01b03166114be565b8989888181106114ad57fe5b905060200201356001600160a01b03165b6001600160a01b03167fa91f9532dc66c94302dbfd7be21a31cdee3b1c97e8b3064aab212b8e64e936c56000808881526020019081526020016000206002015484604051808381526020018281526020019250505060405180910390a360008481526020819052604090206002018190555b5050600190920191506113029050565b506001016112f5565b60606000611557868661182c565b60008181526020819052604090206001015490915061157a908490869003611c89565b67ffffffffffffffff8111801561159057600080fd5b506040519080825280602002602001820160405280156115ba578160200160208202803683370190505b50915060005b825181101561163257600082815260208190526040902060010180548683019081106115e857fe5b9060005260206000200160009054906101000a90046001600160a01b031683828151811061161257fe5b6001600160a01b03909216602092830291909101909101526001016115c0565b5050949350505050565b6002546001600160a01b031681565b60606000611659858561182c565b6000818152602081905260408120600201549192505b600082826020811061167d57fe5b1a60f81b6001600160f81b0319161180156116a1575061169e856020611c89565b81105b156116ae5760010161166f565b8067ffffffffffffffff811180156116c557600080fd5b506040519080825280602002602001820160405280156116ef578160200160208202803683370190505b50935060005b81811015610a0d576000611717600185846020811061171057fe5b1a90611ff3565b60008681526020819052604090206001018054919250908290811061173857fe5b9060005260206000200160009054906101000a90046001600160a01b031686838151811061176257fe5b6001600160a01b0390921660209283029190910190910152506001016116f5565b60606117918383602061164b565b90505b92915050565b6000806000806117aa868661182c565b90506117b46120ea565b506001600160a01b03969096166000908152600160208181526040808420998452988152918890208851608081018a5281546001600160501b03808216808452600160501b83048216968401879052600160a01b909204169a82018b9052919092015460609092019190915297909695509350505050565b6000816001600160a01b0316836001600160a01b03161061184d578261184f565b815b6001600160801b03166080836001600160a01b0316856001600160a01b031610611879578361187b565b845b6001600160801b0316901b179392505050565b600082820183811015611791576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60008161192b576040805162461bcd60e51b815260206004820152600c60248201526b4552525f4449565f5a45524f60a01b604482015290519081900360640190fd5b670de0b6b3a764000083028315806119535750670de0b6b3a764000084828161195057fe5b04145b611997576040805162461bcd60e51b815260206004820152601060248201526f11549497d1125597d25395115493905360821b604482015290519081900360640190fd5b600283048101818110156119e5576040805162461bcd60e51b815260206004820152601060248201526f11549497d1125597d25395115493905360821b604482015290519081900360640190fd5b60008482816119f057fe5b049695505050505050565b600082611a0a57506000611794565b82820282848281611a1757fe5b04146117915760405162461bcd60e51b81526004018080602001828103825260218152602001806121126021913960400191505060405180910390fd5b6000828202831580611a6e575082848281611a6b57fe5b04145b611ab2576040805162461bcd60e51b815260206004820152601060248201526f4552525f4d554c5f4f564552464c4f5760801b604482015290519081900360640190fd5b6706f05b59d3b20000810181811015611b05576040805162461bcd60e51b815260206004820152601060248201526f4552525f4d554c5f4f564552464c4f5760801b604482015290519081900360640190fd5b6000670de0b6b3a7640000826119f0565b6001015490565b6000611b298383612035565b15611c28576001600160a01b03821660009081526020849052604090205460018401546000199182019101808214611bd4576000856001018281548110611b6c57fe5b6000918252602090912001546001870180546001600160a01b039092169250829185908110611b9757fe5b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905592909116815290869052604090206001830190555b6001600160a01b03841660009081526020869052604081205560018501805480611bfa57fe5b600082815260209020810160001990810180546001600160a01b031916905501905550600191506117949050565b506000611794565b6000611c3c8383612035565b611c2857506001828101805480830182556000828152602080822090920180546001600160a01b0319166001600160a01b0387169081179091559254928152908590526040902055611794565b6000818310611c985781611791565b5090919050565b6060815167ffffffffffffffff81118015611cb957600080fd5b50604051908082528060200260200182016040528015611ce3578160200160208202803683370190505b50905060005b8251811015611f12576000611cfe868661182c565b9050611d086120ea565b60016000868581518110611d1857fe5b6020908102919091018101516001600160a01b03908116835282820193909352604091820160009081208682528252829020825160808101845281546001600160501b038082168352600160501b8204811694830194909452600160a01b900490921692820192909252600190910154606082015291508681169088161015611ea65780516020820151611dbe916001600160501b03908116916105499183911661188e565b848481518110611dca57fe5b602002602001018181525050611e89858481518110611de557fe5b60200260200101516001600160a01b031663f8b2cb4f886040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015611e3957600080fd5b505afa158015611e4d573d6000803e3d6000fd5b505050506040513d6020811015611e6357600080fd5b50518551869086908110611e7357fe5b60200260200101516119fb90919063ffffffff16565b848481518110611e9557fe5b602002602001018181525050611f08565b60208101518151611ec8916001600160501b039081169161054991168261188e565b848481518110611ed457fe5b602002602001018181525050611eef858481518110611de557fe5b848481518110611efb57fe5b6020026020010181815250505b5050600101611ce9565b509392505050565b600080600019815b611f2e85516020611c89565b811015611fea576000805b8651811015611fb857868281518110611f4e57fe5b6020026020010151878281518110611f6257fe5b6020026020010151118015611f89575083878281518110611f7f57fe5b6020026020010151105b80611fa7575083878381518110611f9c57fe5b602002602001015110155b15611fb0578091505b600101611f39565b50858181518110611fc557fe5b602090810291909101015160019182016008840260f8031b9490941793925001611f22565b50909392505050565b600061179183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250612053565b6001600160a01b031660009081526020919091526040902054151590565b600081848411156120e25760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156120a757818101518382015260200161208f565b50505050905090810190601f1680156120d45780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6040805160808101825260008082526020820181905291810182905260608101919091529056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a2646970667358221220eff218b8c7aee10fb700f1952faf0828acd7c332422671fa24c7c879f2b7ff1064736f6c63430007040033";
