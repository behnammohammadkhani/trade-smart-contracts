/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { Authorizable } from "../Authorizable";

export class Authorizable__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Authorizable {
    return new Contract(address, _abi, signerOrProvider) as Authorizable;
  }
}

const _abi = [
  {
    inputs: [],
    name: "authorization",
    outputs: [
      {
        internalType: "contract IAuthorization",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
