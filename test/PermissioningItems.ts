import { ethers } from 'hardhat';
// import { Signer } from 'ethers';
import { expect } from 'chai';

describe('PermissioningItems', function () {
  it('Should just return the new deployment, and correct URI settings and TIER constants', async function () {
    const PermissionItems = await ethers.getContractFactory('PermissionItems');
    const permissionItems = await PermissionItems.deploy();

    await permissionItems.deployed();
    expect(await permissionItems.uri(1)).to.equal('');
    expect(await permissionItems.TIER1()).to.equal('1');
    expect(await permissionItems.TIER2()).to.equal('2');
    expect(await permissionItems.SUSPENDED()).to.equal('0');
  });
});
