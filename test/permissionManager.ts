// import { ethers } from 'hardhat';
// import { Signer, ContractFactory } from 'ethers';
// import { expect, assert } from 'chai';
// import { PermissionItems } from '../typechain';
// import Reverter from './utils/reverter';

// // let deployer: Signer;
// let kakaroto: Signer;
// let vegeta: Signer;
// let karpincho: Signer;

// // let deployerAddress: string;
// let kakarotoAddress: string;
// let vegetaAddress: string;
// let karpinchoAddress: string;

// let permissionItemsContract: PermissionItems;
// let permissionItemsContractKakaroto: PermissionItems;
// let permissionItemsContractVegeta: PermissionItems;
// let permissionItemsContractKarpincho: PermissionItems;

// let PermissionItemsFactory: ContractFactory;

// let MINTER_ROLE: string;
// let BURNER_ROLE: string;

// describe('OperationsRegistry', function () {
//   const reverter = new Reverter();

//   before(async () => {
//     [, kakaroto, vegeta, karpincho] = await ethers.getSigners();
//     [kakarotoAddress, vegetaAddress, karpinchoAddress] = await Promise.all([
//       kakaroto.getAddress(),
//       vegeta.getAddress(),
//       karpincho.getAddress(),
//     ]);

//     PermissionItemsFactory = await ethers.getContractFactory('PermissionItems');
//     permissionItemsContract = (await PermissionItemsFactory.deploy(kakarotoAddress)) as PermissionItems;
//     await permissionItemsContract.deployed();

//     await reverter.snapshot();
//   });
// });
