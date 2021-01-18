import { ethers } from 'hardhat';
// import { Signer } from 'ethers';
import { expect } from 'chai';

describe('PermissioningItems', function () {
  it('Should jsut return the new deployment, and correct URI settings and TIER constants', async function () {
    const PermissioningItems = await ethers.getContractFactory('PermissioningItems');
    const permissioningItems = await PermissioningItems.deploy();

    await permissioningItems.deployed();
    expect(await permissioningItems.uri(1)).to.equal('no metadata here');
    expect(await permissioningItems.TIER1()).to.equal('1');
    expect(await permissioningItems.TIER2()).to.equal('2');
  });
});
