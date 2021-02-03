import { ethers } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { PermissionItems } from '../typechain';
import Reverter from './utils/reverter';

let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;
let karpincho: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let vegetaAddress: string;
let karpinchoAddress: string;

let permissionItemsContract: PermissionItems;
let permissionItemsContractKakaroto: PermissionItems;
let permissionItemsContractVegeta: PermissionItems;
let permissionItemsContractKarpincho: PermissionItems;

let PermissionItemsFactory: ContractFactory;

let MINTER_ROLE: string;
let BURNER_ROLE: string;
let DEFAULT_ADMIN_ROLE: string;

describe('OperationsRegistry', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto, vegeta, karpincho] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress, vegetaAddress, karpinchoAddress] = await Promise.all([
      deployer.getAddress(),
      kakaroto.getAddress(),
      vegeta.getAddress(),
      karpincho.getAddress(),
    ]);

    PermissionItemsFactory = await ethers.getContractFactory('PermissionItems');

    await reverter.snapshot();
  });

  describe('deployment', () => {
    it('should deploy and set deployer as DEFAULT_ADMIN_ROLE', async () => {
      permissionItemsContract = (await PermissionItemsFactory.deploy()) as PermissionItems;
      await permissionItemsContract.deployed();

      DEFAULT_ADMIN_ROLE = await permissionItemsContract.DEFAULT_ADMIN_ROLE();
      expect(await permissionItemsContract.hasRole(DEFAULT_ADMIN_ROLE, deployerAddress)).to.equal(true);
    });
  });

  describe('#setAdmin - #revokeAdmin', () => {
    before(async () => {
      await permissionItemsContract.setAdmin(kakarotoAddress);

      permissionItemsContractKakaroto = permissionItemsContract.connect(kakaroto);
      permissionItemsContractVegeta = permissionItemsContract.connect(vegeta);

      MINTER_ROLE = await permissionItemsContract.MINTER_ROLE();
      BURNER_ROLE = await permissionItemsContract.BURNER_ROLE();

      await reverter.snapshot();
    });

    it('should not allow to call setAdmin to a non role admin', async () => {
      await expect(permissionItemsContractKakaroto.setAdmin(vegetaAddress)).to.be.revertedWith(
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('should allow to call setAdmin to a role admin', async () => {
      await permissionItemsContract.setAdmin(vegetaAddress);

      expect(await permissionItemsContract.hasRole(MINTER_ROLE, vegetaAddress)).to.equal(true);
      expect(await permissionItemsContract.hasRole(BURNER_ROLE, vegetaAddress)).to.equal(true);
    });

    it('should not allow to call revokeAdmin to a non role admin', async () => {
      await expect(permissionItemsContractKakaroto.revokeAdmin(vegetaAddress)).to.be.revertedWith(
        'AccessControl: sender must be an admin to revoke',
      );
    });

    it('should allow to call revokeAdmin to a role admin', async () => {
      await permissionItemsContract.revokeAdmin(vegetaAddress);

      expect(await permissionItemsContract.hasRole(MINTER_ROLE, vegetaAddress)).to.equal(false);
      expect(await permissionItemsContract.hasRole(BURNER_ROLE, vegetaAddress)).to.equal(false);
    });
  });

  describe('mint', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to call mint to a non MINTER', async () => {
      await expect(permissionItemsContractVegeta.mint(karpinchoAddress, 1, 1, '0x')).to.be.revertedWith(
        'PermissionItems: must have minter role to mint',
      );
    });

    it('MINTER should be able to mint', async () => {
      await permissionItemsContractKakaroto.mint(karpinchoAddress, 1, 1, '0x');
      expect(await permissionItemsContract.balanceOf(karpinchoAddress, 1)).to.equal('1');
    });

    it('should not allow to call mintBatch to a non MINTER', async () => {
      await expect(permissionItemsContractVegeta.mintBatch(karpinchoAddress, [1, 2], [1, 1], '0x')).to.be.revertedWith(
        'PermissionItems: must have minter role to mint',
      );
    });

    it('MINTER should be able to mintBatch', async () => {
      await permissionItemsContractKakaroto.mintBatch(karpinchoAddress, [1, 2], [1, 1], '0x');

      const balances = await permissionItemsContract.balanceOfBatch([karpinchoAddress, karpinchoAddress], [1, 2]);
      expect(balances[0]).to.equal('1');
      expect(balances[1]).to.equal('1');
    });
  });

  describe('burn', () => {
    before(async () => {
      await reverter.revert();

      await permissionItemsContractKakaroto.mintBatch(karpinchoAddress, [1, 2], [1, 1], '0x');

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not allow to call burn to a non BURNER', async () => {
      await expect(permissionItemsContractVegeta.burn(karpinchoAddress, 1, 1)).to.be.revertedWith(
        'PermissionItems: must have burner role to burn',
      );
    });

    it('BURNER should be able to burn', async () => {
      await permissionItemsContractKakaroto.burn(karpinchoAddress, 1, 1);
      expect(await permissionItemsContract.balanceOf(karpinchoAddress, 1)).to.equal('0');
    });

    it('should not allow to call burnBatch to a non BURNER', async () => {
      await expect(permissionItemsContractVegeta.burnBatch(karpinchoAddress, [1, 2], [1, 1])).to.be.revertedWith(
        'PermissionItems: must have burner role to burn',
      );
    });

    it('BURNER should be able to burnBatch', async () => {
      await permissionItemsContractKakaroto.burnBatch(karpinchoAddress, [1, 2], [1, 1]);

      const balances = await permissionItemsContract.balanceOfBatch([karpinchoAddress, karpinchoAddress], [1, 2]);
      expect(balances[0]).to.equal('0');
      expect(balances[1]).to.equal('0');
    });
  });

  describe('non-transferables tokens', () => {
    before(async () => {
      await reverter.revert();
      permissionItemsContractKarpincho = permissionItemsContract.connect(karpincho);
    });

    it('should not allow to call safeTransferFrom', async () => {
      const balance = await permissionItemsContract.balanceOf(karpinchoAddress, 1);
      expect(balance).to.equal('1');

      await expect(
        permissionItemsContractKarpincho.safeTransferFrom(karpinchoAddress, vegetaAddress, 1, 1, '0x'),
      ).to.be.revertedWith('disabled');

      const balanceAfter = await permissionItemsContract.balanceOf(karpinchoAddress, 1);
      expect(balanceAfter).to.equal('1');
    });

    it('should not allow to call safeBatchTransferFrom', async () => {
      const balances = await permissionItemsContract.balanceOfBatch([karpinchoAddress, karpinchoAddress], [1, 2]);
      expect(balances[0]).to.equal('1');
      expect(balances[1]).to.equal('1');

      await expect(
        permissionItemsContractKarpincho.safeBatchTransferFrom(karpinchoAddress, vegetaAddress, [1, 2], [1, 1], '0x'),
      ).to.be.revertedWith('disabled');

      const balancesAfter = await permissionItemsContract.balanceOfBatch([karpinchoAddress, karpinchoAddress], [1, 2]);
      expect(balancesAfter[0]).to.equal('1');
      expect(balancesAfter[1]).to.equal('1');
    });
  });
});
