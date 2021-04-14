/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { AuthorizableUpgradeable } from "../AuthorizableUpgradeable";

export class AuthorizableUpgradeable__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AuthorizableUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AuthorizableUpgradeable;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAuthorization",
        type: "address",
      },
    ],
    name: "AuthorizationSet",
    type: "event",
  },
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
