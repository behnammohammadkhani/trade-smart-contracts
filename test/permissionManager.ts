import { ethers, upgrades } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { PermissionItems, PermissionManager } from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;
// let vegeta: Signer;
let karpincho: Signer;

// let deployerAddress: string;
// let kakarotoAddress: string;
// let vegetaAddress: string;
let karpinchoAddress: string;

let permissionManagerContract: PermissionManager;
let permissionManagerContractKakaroto: PermissionManager;
let permissionItemsContract: PermissionItems;

let PermissionItemsFactory: ContractFactory;
let PermissionManagerFactory: ContractFactory;

let MINTER_ROLE: string;
let BURNER_ROLE: string;

describe('OperationsRegistry', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, , karpincho] = await ethers.getSigners();
    [karpinchoAddress] = await Promise.all([karpincho.getAddress()]);

    PermissionItemsFactory = await ethers.getContractFactory('PermissionItems');
    permissionItemsContract = (await PermissionItemsFactory.deploy()) as PermissionItems;
    await permissionItemsContract.deployed();

    PermissionManagerFactory = await ethers.getContractFactory('PermissionManager');

    await reverter.snapshot();
  });

  describe('initialization', () => {
    it('should not be able to inilize with permissionItems zero address', async () => {
      let reverted = false;
      try {
        permissionManagerContract = (await upgrades.deployProxy(PermissionManagerFactory, [
          ethers.constants.AddressZero,
        ])) as PermissionManager;
      } catch {
        reverted = true;
      }

      expect(reverted).to.eq(true);
    });

    it('should be able to inilize with permissionItems non zero address', async () => {
      let reverted = true;
      try {
        permissionManagerContract = (await upgrades.deployProxy(PermissionManagerFactory, [
          permissionItemsContract.address,
        ])) as PermissionManager;
        reverted = false;
      } catch {
        reverted = true;
      }

      expect(reverted).to.eq(false);
      await reverter.snapshot();
    });

    it('should set permissionItems upon initialization', async () => {
      const permissionItems = await permissionManagerContract.permissionItems();
      expect(permissionItems).to.eq(permissionItemsContract.address);
    });
  });

  describe('#setPermissionItems', () => {
    let permissionItems2Contract: PermissionItems;

    before('', async () => {
      permissionItems2Contract = (await PermissionItemsFactory.deploy()) as PermissionItems;
      await permissionItems2Contract.deployed();

      console.log('permissionItems2Contract', permissionItems2Contract.address);

      permissionManagerContractKakaroto = permissionManagerContract.connect(kakaroto);

      await reverter.snapshot();
    });
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call setPermissionItems', async () => {
      await expect(
        permissionManagerContractKakaroto.setPermissionItems(permissionItems2Contract.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should not be able to call setPermissionItems with zero address', async () => {
      await expect(permissionManagerContract.setPermissionItems(ethers.constants.AddressZero)).to.be.revertedWith(
        '_permissionItems is the zero address',
      );
    });

    it('owner should not be able to call setPermissionItems with non zero address', async () => {
      await permissionManagerContract.setPermissionItems(permissionItems2Contract.address);

      const permissionItems = await permissionManagerContract.permissionItems();
      expect(permissionItems).to.eq(permissionItems2Contract.address);
    });
  });

  describe('#assingTier1', () => {
    before('', async () => {
      await reverter.revert();

      await permissionItemsContract.setAdmin(permissionManagerContract.address);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call assingTier1', async () => {
      await expect(permissionManagerContractKakaroto.assingTier1(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call assingTier1', async () => {
      await permissionManagerContract.assingTier1(karpinchoAddress);

      expect(await permissionManagerContract.hasTier1(karpinchoAddress)).to.eq(true);
    });

    it('owner should not be able to call assingTier1 for the same user twice', async () => {
      await permissionManagerContract.assingTier1(karpinchoAddress);
      expect(await permissionManagerContract.hasTier1(karpinchoAddress)).to.eq(true);

      await expect(permissionManagerContract.assingTier1(karpinchoAddress)).to.be.revertedWith(
        'PermissionManager: User already has Tier 1 assigned',
      );
    });
  });

  describe('#assingTier2', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call assingTier2', async () => {
      await expect(permissionManagerContractKakaroto.assingTier2(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call assingTier2', async () => {
      await permissionManagerContract.assingTier2(karpinchoAddress);

      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(true);
    });

    it('owner should not be able to call assingTier2 for the same user twice', async () => {
      await permissionManagerContract.assingTier2(karpinchoAddress);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(true);

      await expect(permissionManagerContract.assingTier2(karpinchoAddress)).to.be.revertedWith(
        'PermissionManager: User already has Tier 2 assigned',
      );
    });
  });

  describe('#suspendUser', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call suspendUser', async () => {
      await expect(permissionManagerContractKakaroto.suspendUser(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call suspendUser', async () => {
      await permissionManagerContract.suspendUser(karpinchoAddress);

      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);
    });

    it('owner should not be able to call suspendUser for the same user twice', async () => {
      await permissionManagerContract.suspendUser(karpinchoAddress);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);

      await expect(permissionManagerContract.suspendUser(karpinchoAddress)).to.be.revertedWith(
        'PermissionManager: User is already suspended',
      );
    });
  });

  describe('#revokeTier1', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.assingTier1(karpinchoAddress);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call revokeTier1', async () => {
      await expect(permissionManagerContractKakaroto.revokeTier1(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call revokeTier1', async () => {
      await permissionManagerContract.revokeTier1(karpinchoAddress);

      expect(await permissionManagerContract.hasTier1(karpinchoAddress)).to.eq(false);
    });

    it('owner should not be able to call revokeTier1 for the same user twice', async () => {
      await permissionManagerContract.revokeTier1(karpinchoAddress);
      expect(await permissionManagerContract.hasTier1(karpinchoAddress)).to.eq(false);

      await expect(permissionManagerContract.revokeTier1(karpinchoAddress)).to.be.revertedWith(
        "PermissionManager: User doesn't has Tier 1 assigned",
      );
    });
  });

  describe('#revokeTier2', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.assingTier2(karpinchoAddress);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call revokeTier2', async () => {
      await expect(permissionManagerContractKakaroto.revokeTier2(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call revokeTier2', async () => {
      await permissionManagerContract.revokeTier2(karpinchoAddress);

      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(false);
    });

    it('owner should not be able to call revokeTier2 for the same user twice', async () => {
      await permissionManagerContract.revokeTier2(karpinchoAddress);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(false);

      await expect(permissionManagerContract.revokeTier2(karpinchoAddress)).to.be.revertedWith(
        "PermissionManager: User doesn't has Tier 2 assigned",
      );
    });
  });

  describe('#unsuspendUser', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.suspendUser(karpinchoAddress);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call unsuspendUser', async () => {
      await expect(permissionManagerContractKakaroto.unsuspendUser(karpinchoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call unsuspendUser', async () => {
      await permissionManagerContract.unsuspendUser(karpinchoAddress);

      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(false);
    });

    it('owner should not be able to call unsuspendUser for the same user twice', async () => {
      await permissionManagerContract.unsuspendUser(karpinchoAddress);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(false);

      await expect(permissionManagerContract.unsuspendUser(karpinchoAddress)).to.be.revertedWith(
        'PermissionManager: User is not currently suspended',
      );
    });
  });
});
