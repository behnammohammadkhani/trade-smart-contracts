import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { ProtocolFeeMock, BPoolMock, BPoolProxy, BRegistry } from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;

let kakarotoAddress: string;
let vegetaAddress: string;

let poolProxyContract: BPoolProxy;
let poolProxyContractKakaroto: BPoolProxy;
let bRegistryContract: BRegistry;
let protocolFeeContract: ProtocolFeeMock;
let bPool1: BPoolMock;
let bPool2: BPoolMock;
let bPool3: BPoolMock;

const ONE = ethers.constants.WeiPerEther;
const MIN_FEE = ONE.div(1e6); // 0.0001%
const MAX_FEE = ONE.div(2); // 50%

describe('ProtocolFee', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, vegeta] = await ethers.getSigners();
    [kakarotoAddress, vegetaAddress] = await Promise.all([kakaroto.getAddress(), vegeta.getAddress()]);
    // [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const BPoolProxyFactory = await ethers.getContractFactory('BPoolProxy');
    const BRegistryFactory = await ethers.getContractFactory('BRegistry');
    const ProtocolFeeFactory = await ethers.getContractFactory('ProtocolFeeMock');
    const BPoolMockFactory = await ethers.getContractFactory('BPoolMock');

    bRegistryContract = (await BRegistryFactory.deploy(ethers.constants.AddressZero)) as BRegistry;
    await bRegistryContract.deployed();

    protocolFeeContract = (await ProtocolFeeFactory.deploy(10)) as ProtocolFeeMock;
    await protocolFeeContract.deployed();

    poolProxyContract = (await BPoolProxyFactory.deploy(
      bRegistryContract.address,
      protocolFeeContract.address,
      kakarotoAddress,
    )) as BPoolProxy;
    await poolProxyContract.deployed();

    poolProxyContractKakaroto = poolProxyContract.connect(kakaroto);

    bPool1 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool1.deployed();
    bPool2 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool2.deployed();
    bPool3 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool3.deployed();

    await reverter.snapshot();
  });

  describe('#setRegistry', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setRegistry', async () => {
      await expect(poolProxyContractKakaroto.setRegistry(kakarotoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setRegistry with zero address', async () => {
      await expect(poolProxyContract.setRegistry(ethers.constants.AddressZero)).to.be.revertedWith(
        'registry is the zero address',
      );
    });

    it('owner shouldbe able to setRegistry non zero address', async () => {
      await poolProxyContract.setRegistry(kakarotoAddress);
      expect(await poolProxyContract.registry()).to.eq(kakarotoAddress);
    });
  });

  describe('#setProtocolFee', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setProtocolFee', async () => {
      await expect(poolProxyContractKakaroto.setProtocolFee(kakarotoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setProtocolFee with zero address', async () => {
      await expect(poolProxyContract.setProtocolFee(ethers.constants.AddressZero)).to.be.revertedWith(
        'protocolFee is the zero address',
      );
    });

    it('owner shouldbe able to setProtocolFee non zero address', async () => {
      await poolProxyContract.setProtocolFee(kakarotoAddress);
      expect(await poolProxyContract.protocolFee()).to.eq(kakarotoAddress);
    });
  });

  describe('#setFeeReceiver', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setFeeReceiver', async () => {
      await expect(poolProxyContractKakaroto.setFeeReceiver(vegetaAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setFeeReceiver with zero address', async () => {
      await expect(poolProxyContract.setFeeReceiver(ethers.constants.AddressZero)).to.be.revertedWith(
        'feeReceiver is the zero address',
      );
    });

    it('owner shouldbe able to setFeeReceiver non zero address', async () => {
      await poolProxyContract.setFeeReceiver(vegetaAddress);
      expect(await poolProxyContract.feeReceiver()).to.eq(vegetaAddress);
    });
  });
});
