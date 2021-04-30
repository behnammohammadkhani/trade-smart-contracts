/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BPoolMock } from "../BPoolMock";

export class BPoolMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(tokens: string[], overrides?: Overrides): Promise<BPoolMock> {
    return super.deploy(tokens, overrides || {}) as Promise<BPoolMock>;
  }
  getDeployTransaction(
    tokens: string[],
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(tokens, overrides || {});
  }
  attach(address: string): BPoolMock {
    return super.attach(address) as BPoolMock;
  }
  connect(signer: Signer): BPoolMock__factory {
    return super.connect(signer) as BPoolMock__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BPoolMock {
    return new Contract(address, _abi, signerOrProvider) as BPoolMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
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
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_extactAmount",
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
    name: "_tokens",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        name: "account",
        type: "address",
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
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "calcInGivenOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
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
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "calcOutGivenIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        name: "poolAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "minAmountsOut",
        type: "uint256[]",
      },
    ],
    name: "exitPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPoolAmountIn",
        type: "uint256",
      },
    ],
    name: "exitswapExternAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "poolAmountIn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "poolAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
    ],
    name: "exitswapPoolAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
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
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
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
        name: "",
        type: "address",
      },
    ],
    name: "getDenormalizedWeight",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getSwapFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
        name: "poolAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "maxAmountsIn",
        type: "uint256[]",
      },
    ],
    name: "joinPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minPoolAmountOut",
        type: "uint256",
      },
    ],
    name: "joinswapExternAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "poolAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "poolAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxAmountIn",
        type: "uint256",
      },
    ],
    name: "joinswapPoolAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
  {
    inputs: [
      {
        internalType: "bool",
        name: "exact",
        type: "bool",
      },
    ],
    name: "setExtactAmount",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "swapExactAmountIn",
    outputs: [
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
    ],
    stateMutability: "pure",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "swapExactAmountOut",
    outputs: [
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
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
];

const _bytecode =
  "0x60806040526007805460ff191660011790553480156200001e57600080fd5b506040516200197c3803806200197c83398101604081905262000041916200020f565b6040518060400160405280601381526020017f42616c616e63657220506f6f6c20546f6b656e000000000000000000000000008152506040518060400160405280600381526020016210941560ea1b8152508160039080519060200190620000ab929190620000ee565b508051620000c1906004906020840190620000ee565b50506005805460ff19166012179055508051620000e690600690602084019062000183565b5050620002e5565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928262000126576000855562000171565b82601f106200014157805160ff191683800117855562000171565b8280016001018555821562000171579182015b828111156200017157825182559160200191906001019062000154565b506200017f929150620001db565b5090565b82805482825590600052602060002090810192821562000171579160200282015b828111156200017157825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190620001a4565b5b808211156200017f5760008155600101620001dc565b80516001600160a01b03811681146200020a57600080fd5b919050565b6000602080838503121562000222578182fd5b82516001600160401b038082111562000239578384fd5b818501915085601f8301126200024d578384fd5b8151818111156200025a57fe5b83810291506200026c848301620002c1565b8181528481019084860184860187018a101562000287578788fd5b8795505b83861015620002b4576200029f81620001f2565b8352600195909501949186019186016200028b565b5098975050505050505050565b6040518181016001600160401b0381118282101715620002dd57fe5b604052919050565b61168780620002f56000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c8063948d8ce6116100f9578063cc77828d11610097578063ed70554d11610071578063ed70554d1461038b578063f8b2cb4f146102ec578063f8d6aed414610340578063feb1053d146103ab576101c4565b8063cc77828d1461035b578063d4cadf6814610370578063dd62ed3e14610378576101c4565b8063a9059cbb116100d3578063a9059cbb1461031a578063b02f0b731461032d578063ba9530a614610340578063bd5e94a914610353576101c4565b8063948d8ce6146102ec57806395d89b41146102ff578063a457c2d714610307576101c4565b806346ab38f1116101665780636d06dfa0116101405780636d06dfa0146102a557806370a08231146102b85780637c5e9ea4146102cb5780638201aa3f146102cb576101c4565b806346ab38f11461026a5780634f69c0d41461027d5780635db3427714610292576101c4565b806318160ddd116101a257806318160ddd1461022757806323b872dd1461022f578063313ce567146102425780633950935114610257576101c4565b806302c96748146101c957806306fdde03146101f2578063095ea7b314610207575b600080fd5b6101dc6101d736600461129e565b6103be565b6040516101e991906114d7565b60405180910390f35b6101fa610475565b6040516101e99190611484565b61021a610215366004611228565b61050b565b6040516101e99190611479565b6101dc610528565b61021a61023d3660046111ed565b61052e565b61024a6105b5565b6040516101e991906114ee565b61021a610265366004611228565b6105be565b6101dc61027836600461129e565b61060c565b61029061028b366004611320565b6106bd565b005b6101dc6102a036600461129e565b6107c9565b6101dc6102b336600461129e565b61087b565b6101dc6102c63660046111a1565b61092e565b6102de6102d9366004611251565b61094d565b6040516101e99291906114e0565b6101dc6102fa3660046111a1565b610958565b6101fa61095e565b61021a610315366004611228565b6109bf565b61021a610328366004611228565b610a27565b61029061033b366004611320565b610a3b565b6101dc61034e366004611399565b610b40565b61021a610b49565b610363610b52565b6040516101e9919061142c565b6101dc610bb3565b6101dc6103863660046111bb565b610bb8565b61039e610399366004611308565b610be3565b6040516101e991906113db565b6102906103b93660046112d0565b610c0d565b60405163a9059cbb60e01b81526000906001600160a01b0385169063a9059cbb906103ef9033908790600401611413565b602060405180830381600087803b15801561040957600080fd5b505af115801561041d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044191906112ec565b5060075460ff166104555760018203610457565b815b9050610464333083610c20565b61046e3082610d7b565b9392505050565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105015780601f106104d657610100808354040283529160200191610501565b820191906000526020600020905b8154815290600101906020018083116104e457829003601f168201915b5050505050905090565b600061051f610518610e77565b8484610e7b565b50600192915050565b60025490565b600061053b848484610c20565b6105ab84610547610e77565b6105a68560405180606001604052806028815260200161159b602891396001600160a01b038a16600090815260016020526040812090610585610e77565b6001600160a01b031681526020810191909152604001600020549190610f67565b610e7b565b5060019392505050565b60055460ff1690565b600061051f6105cb610e77565b846105a685600160006105dc610e77565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610ffe565b60075460009060ff166106225781600101610624565b815b60405163a9059cbb60e01b81529091506001600160a01b0385169063a9059cbb906106559033908590600401611413565b602060405180830381600087803b15801561066f57600080fd5b505af1158015610683573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a791906112ec565b506106b3333085610c20565b61046e3084610d7b565b60005b6006548110156107ae5760075460009060ff166106f25760018484848181106106e557fe5b9050602002013503610706565b8383838181106106fe57fe5b905060200201355b90506006828154811061071557fe5b6000918252602090912001546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90610752903390309086906004016113ef565b602060405180830381600087803b15801561076c57600080fd5b505af1158015610780573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a491906112ec565b50506001016106c0565b506107b93084611058565b6107c4303385610c20565b505050565b6040516323b872dd60e01b81526000906001600160a01b038516906323b872dd906107fc903390309088906004016113ef565b602060405180830381600087803b15801561081657600080fd5b505af115801561082a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061084e91906112ec565b5060075460ff166108625781600101610864565b815b90506108703082611058565b61046e303383610c20565b60075460009060ff166108915760018203610893565b815b6040516323b872dd60e01b81529091506001600160a01b038516906323b872dd906108c6903390309086906004016113ef565b602060405180830381600087803b1580156108e057600080fd5b505af11580156108f4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091891906112ec565b506109233084611058565b61046e303385610c20565b6001600160a01b0381166000908152602081905260409020545b919050565b509360019350915050565b50600190565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105015780601f106104d657610100808354040283529160200191610501565b600061051f6109cc610e77565b846105a68560405180606001604052806025815260200161162d60259139600160006109f6610e77565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610f67565b600061051f610a34610e77565b8484610c20565b60005b600654811015610b2a5760075460009060ff16610a7057838383818110610a6157fe5b90506020020135600101610a84565b838383818110610a7c57fe5b905060200201355b905060068281548110610a9357fe5b60009182526020909120015460405163a9059cbb60e01b81526001600160a01b039091169063a9059cbb90610ace9033908590600401611413565b602060405180830381600087803b158015610ae857600080fd5b505af1158015610afc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2091906112ec565b5050600101610a3e565b50610b36333085610c20565b6107c43084610d7b565b50949350505050565b60075460ff1681565b6060600680548060200260200160405190810160405280929190818152602001828054801561050157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610b8c575050505050905090565b600190565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60068181548110610bf357600080fd5b6000918252602090912001546001600160a01b0316905081565b6007805460ff1916911515919091179055565b6001600160a01b038316610c655760405162461bcd60e51b81526004018080602001828103825260258152602001806115e46025913960400191505060405180910390fd5b6001600160a01b038216610caa5760405162461bcd60e51b815260040180806020018281038252602381526020018061150e6023913960400191505060405180910390fd5b610cb58383836107c4565b610cf281604051806060016040528060268152602001611575602691396001600160a01b0386166000908152602081905260409020549190610f67565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610d219082610ffe565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6001600160a01b038216610dc05760405162461bcd60e51b81526004018080602001828103825260218152602001806115c36021913960400191505060405180910390fd5b610dcc826000836107c4565b610e0981604051806060016040528060228152602001611531602291396001600160a01b0385166000908152602081905260409020549190610f67565b6001600160a01b038316600090815260208190526040902055600254610e2f9082611148565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b3390565b6001600160a01b038316610ec05760405162461bcd60e51b81526004018080602001828103825260248152602001806116096024913960400191505060405180910390fd5b6001600160a01b038216610f055760405162461bcd60e51b81526004018080602001828103825260228152602001806115536022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60008184841115610ff65760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610fbb578181015183820152602001610fa3565b50505050905090810190601f168015610fe85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008282018381101561046e576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b0382166110b3576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6110bf600083836107c4565b6002546110cc9082610ffe565b6002556001600160a01b0382166000908152602081905260409020546110f29082610ffe565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600061046e83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610f67565b80356001600160a01b038116811461094857600080fd5b6000602082840312156111b2578081fd5b61046e8261118a565b600080604083850312156111cd578081fd5b6111d68361118a565b91506111e46020840161118a565b90509250929050565b600080600060608486031215611201578081fd5b61120a8461118a565b92506112186020850161118a565b9150604084013590509250925092565b6000806040838503121561123a578182fd5b6112438361118a565b946020939093013593505050565b600080600080600060a08688031215611268578081fd5b6112718661118a565b9450602086013593506112866040870161118a565b94979396509394606081013594506080013592915050565b6000806000606084860312156112b2578283fd5b6112bb8461118a565b95602085013595506040909401359392505050565b6000602082840312156112e1578081fd5b813561046e816114fc565b6000602082840312156112fd578081fd5b815161046e816114fc565b600060208284031215611319578081fd5b5035919050565b600080600060408486031215611334578283fd5b83359250602084013567ffffffffffffffff80821115611352578384fd5b818601915086601f830112611365578384fd5b813581811115611373578485fd5b8760208083028501011115611386578485fd5b6020830194508093505050509250925092565b60008060008060008060c087890312156113b1578081fd5b505084359660208601359650604086013595606081013595506080810135945060a0013592509050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6020808252825182820181905260009190848201906040850190845b8181101561146d5783516001600160a01b031683529284019291840191600101611448565b50909695505050505050565b901515815260200190565b6000602080835283518082850152825b818110156114b057858101830151858201604001528201611494565b818111156114c15783604083870101525b50601f01601f1916929092016040019392505050565b90815260200190565b918252602082015260400190565b60ff91909116815260200190565b801515811461150a57600080fd5b5056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122070f5218e18a16e606013e2f3d59e869586eb29d09a7c45f09a6dd6a17d09ff0e64736f6c63430007040033";
