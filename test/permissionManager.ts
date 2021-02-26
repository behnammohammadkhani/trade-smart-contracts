import { ethers, upgrades } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { PermissionItems, PermissionManager } from '../typechain';
import Reverter from './utils/reverter';

let kakaroto: Signer;
let karpincho: Signer;

let kakarotoAddress: string;
let karpinchoAddress: string;

let permissionManagerContract: PermissionManager;
let permissionManagerContractKakaroto: PermissionManager;
let permissionItemsContract: PermissionItems;

let PermissionItemsFactory: ContractFactory;
let PermissionManagerFactory: ContractFactory;

const karpinchoProxyAddress: string = '0xe3d92305784cfE42433Dbc51CBFD61ee95565D09';
const kakarotoProxyAddress: string = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';

describe('PermissionManager', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, , karpincho] = await ethers.getSigners();
    [kakarotoAddress, karpinchoAddress] = await Promise.all([kakaroto.getAddress(), karpincho.getAddress()]);

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
      await expect(permissionManagerContractKakaroto.assingTier1([karpinchoProxyAddress])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call assingTier1', async () => {
      await permissionManagerContract.assingTier1([karpinchoProxyAddress]);

      expect(await permissionManagerContract.hasTier1(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call assingTier1 for the same proxy twice', async () => {
      await permissionManagerContract.assingTier1([karpinchoProxyAddress]);
      expect(await permissionManagerContract.hasTier1(karpinchoProxyAddress)).to.eq(true);

      await expect(permissionManagerContract.assingTier1([karpinchoProxyAddress])).to.be.revertedWith(
        'PermissionManager: Address already has Tier 1 assigned',
      );
    });
  });

  describe('#assingTier2', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call assingTier2', async () => {
      await expect(
        permissionManagerContractKakaroto.assingTier2([
          { user: karpinchoAddress, proxy: ethers.constants.AddressZero },
        ]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be not able to call assingTier2 with user address and proxy zero address', async () => {
      await expect(
        permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('ERC1155: balance query for the zero address');
    });

    it('owner should be able to call assingTier2 with user address and proxy', async () => {
      await permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);

      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(true);
      expect(await permissionManagerContract.hasTier2(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call assingTier2 for the same user twice', async () => {
      await permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Address already has Tier 2 assigned');
    });

    it('owner should not be able to call assingTier2 for the same proxy twice', async () => {
      await permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.assingTier2([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Proxy already has Tier 2 assigned');
    });
  });

  describe('#suspendUser', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call suspendUser', async () => {
      await expect(
        permissionManagerContractKakaroto.suspendUser([
          { user: karpinchoAddress, proxy: ethers.constants.AddressZero },
        ]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be able to call suspendUser', async () => {
      await permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);

      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);
    });

    it('owner should be able to call suspendUser for user and proxy', async () => {
      await permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);

      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);
      expect(await permissionManagerContract.isSuspended(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call suspendUser for the same user twice', async () => {
      await permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('PermissionManager: Address is already suspended');
    });

    it('owner should not be able to call suspendUser for the same proxy twice', async () => {
      await permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.suspendUser([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Proxy is already suspended');
    });
  });

  describe('#rejectUser', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call rejectUser', async () => {
      await expect(
        permissionManagerContractKakaroto.rejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be able to call rejectUser', async () => {
      await permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);

      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(true);
    });

    it('owner should be able to call rejectUser for user and proxy', async () => {
      await permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);

      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(true);
      expect(await permissionManagerContract.isRejected(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call rejectUser for the same user twice', async () => {
      await permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);
      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('PermissionManager: Address is already rejected');
    });

    it('owner should not be able to call rejectUser for the same proxy twice', async () => {
      await permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(true);

      await expect(
        permissionManagerContract.rejectUser([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Proxy is already rejected');
    });
  });

  describe('#revokeTier1', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.assingTier1([karpinchoProxyAddress]);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call revokeTier1', async () => {
      await expect(permissionManagerContractKakaroto.revokeTier1([karpinchoProxyAddress])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should be able to call revokeTier1 for proxy', async () => {
      await permissionManagerContract.revokeTier1([karpinchoProxyAddress]);

      expect(await permissionManagerContract.hasTier1(karpinchoProxyAddress)).to.eq(false);
    });

    it('owner should not be able to call revokeTier1 for the same proxy twice', async () => {
      await permissionManagerContract.revokeTier1([karpinchoProxyAddress]);
      expect(await permissionManagerContract.hasTier1(karpinchoProxyAddress)).to.eq(false);

      await expect(permissionManagerContract.revokeTier1([karpinchoProxyAddress])).to.be.revertedWith(
        "PermissionManager: Address doesn't has Tier 1 assigned",
      );
    });
  });

  describe('#revokeTier2', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.assingTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      await permissionManagerContract.assingTier2([{ user: kakarotoAddress, proxy: kakarotoProxyAddress }]);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call revokeTier2', async () => {
      await expect(
        permissionManagerContractKakaroto.revokeTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should not be able to call revokeTier2 user address and proxy zero address', async () => {
      await expect(
        permissionManagerContract.revokeTier2([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('ERC1155: balance query for the zero address');
    });

    it('owner should not be able to call revokeTier2 for the same user twice', async () => {
      await permissionManagerContract.revokeTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(false);

      await expect(
        permissionManagerContract.revokeTier2([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith("PermissionManager: Address doesn't has Tier 2 assigned");
    });

    it('owner should not be able to call revokeTier2 for the same proxy twice', async () => {
      await permissionManagerContract.revokeTier2([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.hasTier2(karpinchoAddress)).to.eq(false);
      expect(await permissionManagerContract.hasTier2(karpinchoProxyAddress)).to.eq(false);

      await expect(
        permissionManagerContract.revokeTier2([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith("PermissionManager: Proxy doesn't has Tier 2 assigned");
    });
  });

  describe('#unsuspendUser', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.suspendUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call unsuspendUser', async () => {
      await expect(
        permissionManagerContractKakaroto.unsuspendUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be able to call unsuspendUser for user', async () => {
      await permissionManagerContract.unsuspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);

      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(false);
      expect(await permissionManagerContract.isSuspended(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call unsuspendUser for the same user twice', async () => {
      await permissionManagerContract.unsuspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(false);

      await expect(
        permissionManagerContract.unsuspendUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('PermissionManager: Address is not currently suspended');
    });

    it('owner should not be able to call unsuspendUser for the same proxy twice', async () => {
      await permissionManagerContract.unsuspendUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.isSuspended(karpinchoAddress)).to.eq(false);
      expect(await permissionManagerContract.isSuspended(karpinchoProxyAddress)).to.eq(false);

      await permissionManagerContract.suspendUser([{ user: kakarotoAddress, proxy: ethers.constants.AddressZero }]);
      await expect(
        permissionManagerContract.unsuspendUser([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Proxy is not currently suspended');
    });
  });

  describe('#unrejectUser', () => {
    before('', async () => {
      await reverter.revert();

      await permissionManagerContract.rejectUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);

      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call unrejectUser', async () => {
      await expect(
        permissionManagerContractKakaroto.unrejectUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be able to call unrejectUser for user', async () => {
      await permissionManagerContract.unrejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);

      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(false);
      expect(await permissionManagerContract.isRejected(karpinchoProxyAddress)).to.eq(true);
    });

    it('owner should not be able to call unrejectUser for the same user twice', async () => {
      await permissionManagerContract.unrejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]);
      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(false);

      await expect(
        permissionManagerContract.unrejectUser([{ user: karpinchoAddress, proxy: ethers.constants.AddressZero }]),
      ).to.be.revertedWith('PermissionManager: Address is not currently rejected');
    });

    it('owner should not be able to call unrejectUser for the same proxy twice', async () => {
      await permissionManagerContract.unrejectUser([{ user: karpinchoAddress, proxy: karpinchoProxyAddress }]);
      expect(await permissionManagerContract.isRejected(karpinchoAddress)).to.eq(false);
      expect(await permissionManagerContract.isRejected(karpinchoProxyAddress)).to.eq(false);

      await permissionManagerContract.rejectUser([{ user: kakarotoAddress, proxy: ethers.constants.AddressZero }]);
      await expect(
        permissionManagerContract.unrejectUser([{ user: kakarotoAddress, proxy: karpinchoProxyAddress }]),
      ).to.be.revertedWith('PermissionManager: Proxy is not currently rejected');
    });
  });
});