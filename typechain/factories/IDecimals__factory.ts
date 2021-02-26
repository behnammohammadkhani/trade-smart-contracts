/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IDecimals } from "../IDecimals";

export class IDecimals__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDecimals {
    return new Contract(address, _abi, signerOrProvider) as IDecimals;
  }
}

const _abi = [
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
];