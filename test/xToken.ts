import { ethers } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { XToken, AuthorizationMock, OperationsRegistryMock } from '../typechain';
import Reverter from './utils/reverter';

let kakaroto: Signer;
let vegeta: Signer;

let kakarotoAddress: string;
let vegetaAddress: string;

let xTokenContract: XToken;
let xTokenContractVegeta: XToken;
let xTokenContractKakaroto: XToken;
let authorizationContract: AuthorizationMock;
let operationsRegistryContract: OperationsRegistryMock;

let xTokenFactory: ContractFactory;

describe('xToken', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, vegeta] = await ethers.getSigners();
    [kakarotoAddress, vegetaAddress] = await Promise.all([kakaroto.getAddress(), vegeta.getAddress()]);

    kakarotoAddress;

    xTokenFactory = await ethers.getContractFactory('xToken');
    const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
    const OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistryMock');

    authorizationContract = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
    await authorizationContract.deployed();

    operationsRegistryContract = (await OperationsRegistryFactory.deploy()) as OperationsRegistryMock;
    await authorizationContract.deployed();

    await reverter.snapshot();
  });

  describe('deploy', () => {
    it('should revert when decimals_ is zero', async () => {
      await expect(
        xTokenFactory.deploy(
          '',
          '',
          0,
          '',
          authorizationContract.address,
          operationsRegistryContract.address,
          vegetaAddress,
        ),
      ).to.be.revertedWith('decimals is 0');
    });

    it('should revert when authorization_ is zero address', async () => {
      await expect(
        xTokenFactory.deploy(
          '',
          '',
          1,
          '',
          ethers.constants.AddressZero,
          operationsRegistryContract.address,
          vegetaAddress,
        ),
      ).to.be.revertedWith('authorization is the zero address');
    });

    it('should revert when operationsRegistry_ is zero address', async () => {
      await expect(
        xTokenFactory.deploy('', '', 1, '', authorizationContract.address, ethers.constants.AddressZero, vegetaAddress),
      ).to.be.revertedWith('operationsRegistry is the zero address');
    });

    it('should revert when owner_ is zero address', async () => {
      await expect(
        xTokenFactory.deploy(
          '',
          '',
          1,
          '',
          authorizationContract.address,
          operationsRegistryContract.address,
          ethers.constants.AddressZero,
        ),
      ).to.be.revertedWith('owner is the zero address');
    });

    it('should deploy the xToken', async () => {
      xTokenContract = (await xTokenFactory.deploy(
        'xToken1',
        'XT1',
        1,
        'know your asset',
        authorizationContract.address,
        operationsRegistryContract.address,
        vegetaAddress,
      )) as XToken;

      expect(await xTokenContract.name()).to.eq('xToken1');
      expect(await xTokenContract.symbol()).to.eq('XT1');
      expect(await xTokenContract.decimals()).to.eq(1);
      expect(await xTokenContract.kya()).to.eq('know your asset');
      expect(await xTokenContract.authorization()).to.eq(authorizationContract.address);
      expect(await xTokenContract.operationsRegistry()).to.eq(operationsRegistryContract.address);
      expect(await xTokenContract.owner()).to.eq(vegetaAddress);

      await reverter.snapshot();

      xTokenContractVegeta = xTokenContract.connect(vegeta);
      xTokenContractKakaroto = xTokenContract.connect(kakaroto);
    });
  });

  describe('#pause, #unpause, #setAuthorization, #setOperationsRegistry, #setKya', () => {
    before(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to pause', async function () {
      await expect(xTokenContract.pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('non owner should not be able to unpause', async function () {
      await expect(xTokenContract.unpause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should be able to pause and unpause', async function () {
      expect(await xTokenContractVegeta.paused()).to.eq(false);

      await xTokenContractVegeta.pause();

      expect(await xTokenContractVegeta.paused()).to.eq(true);

      await xTokenContractVegeta.unpause();

      expect(await xTokenContractVegeta.paused()).to.eq(false);
    });

    it('non owner should not be able to call setAuthorization', async function () {
      await expect(xTokenContract.setAuthorization(authorizationContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to call setAuthorization with address zero', async function () {
      await expect(xTokenContractVegeta.setAuthorization(ethers.constants.AddressZero)).to.be.revertedWith(
        'Authorizable: authorization is the zero address',
      );
    });

    it('owner should be able to call setAuthorization', async function () {
      const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
      const authorizationContract2 = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
      await authorizationContract2.deployed();

      await xTokenContractVegeta.setAuthorization(authorizationContract2.address);

      const authorizationAddress = await xTokenContractVegeta.authorization();
      expect(authorizationAddress).to.equal(authorizationContract2.address);
    });

    it('non owner should not be able to call setOperationsRegistry', async function () {
      await expect(xTokenContract.setOperationsRegistry(authorizationContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to call setOperationsRegistry with address zero', async function () {
      await expect(xTokenContractVegeta.setOperationsRegistry(ethers.constants.AddressZero)).to.be.revertedWith(
        'operationsRegistry is the zero address',
      );
    });

    it('owner should be able to call setOperationsRegistry', async function () {
      const OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistryMock');
      const operationsRegistryContract2 = (await OperationsRegistryFactory.deploy()) as OperationsRegistryMock;
      await operationsRegistryContract2.deployed();

      await xTokenContractVegeta.setOperationsRegistry(operationsRegistryContract2.address);

      const operationsRegistryAddress = await xTokenContractVegeta.operationsRegistry();
      expect(operationsRegistryAddress).to.equal(operationsRegistryContract2.address);
    });

    it('non owner should not be able to call setOperationsRegistry', async function () {
      await expect(xTokenContract.setKya('a different kya')).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should not be able to call setOperationsRegistry', async function () {
      await xTokenContractVegeta.setKya('a different kya');

      const kya = await xTokenContractVegeta.kya();
      expect(kya).to.equal('a different kya');
    });
  });

  describe('#mint', () => {
    before(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call mint', async function () {
      await expect(xTokenContract.mint(kakarotoAddress, 1000)).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('owner should not be able to call mint if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenContractVegeta.mint(kakarotoAddress, 1000)).to.be.revertedWith('Authorizable: not authorized');
    });

    it('owner should be able to call mint if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      const mitnTx = xTokenContractVegeta.mint(kakarotoAddress, 1000);

      await expect(mitnTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractVegeta.interface.getSighash('mint'), 1000);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('1000');

      await reverter.snapshot();
    });
  });

  describe('#burFrom', () => {
    before(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to call burnFrom', async function () {
      await expect(xTokenContract.burnFrom(kakarotoAddress, 1000)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to call burnFrom if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenContractVegeta.burnFrom(kakarotoAddress, 1000)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('owner should be able to call burnFrom if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      const mitnTx = xTokenContractVegeta.burnFrom(kakarotoAddress, 10);

      await expect(mitnTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractVegeta.interface.getSighash('burnFrom'), 10);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('990');
    });
  });

  describe('#transfer', () => {
    before(async () => {
      await reverter.revert();
    });

    it('user should not be able to call transfer if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenContractKakaroto.transfer(vegetaAddress, 5)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('user should be able to call transfer if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      const mitnTx = xTokenContractKakaroto.transfer(vegetaAddress, 5);

      await expect(mitnTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('transfer'), 5);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('995');
      expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq('5');
    });
  });

  describe('#transferFrom', () => {
    before(async () => {
      await reverter.revert();
    });

    it('user should not be able to call transferFrom if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenContractVegeta.transferFrom(kakarotoAddress, vegetaAddress, 5)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('user should be able to call transferFrom if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      await xTokenContractKakaroto.approve(vegetaAddress, 5);
      const mitnTx = xTokenContractVegeta.transferFrom(kakarotoAddress, vegetaAddress, 5);

      await expect(mitnTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('transfer'), 5);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('995');
      expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq('5');
    });
  });

  describe('paused', () => {
    before(async () => {
      await xTokenContractVegeta.pause();
      await authorizationContract.setAuthorized(true);
    });

    it('owner should not be able to call mint if the token is paused', async function () {
      await expect(xTokenContractVegeta.mint(kakarotoAddress, 1000)).to.be.revertedWith(
        'ERC20Pausable: token transfer while paused',
      );
    });

    it('owner should not be able to call burnFrom if the token is paused', async function () {
      await expect(xTokenContractVegeta.burnFrom(kakarotoAddress, 1000)).to.be.revertedWith(
        'ERC20Pausable: token transfer while paused',
      );
    });

    it('user should not be able to call transfer if the token is paused', async function () {
      await expect(xTokenContractKakaroto.transfer(vegetaAddress, 5)).to.be.revertedWith(
        'ERC20Pausable: token transfer while paused',
      );
    });

    it('user should not be able to call transferFrom if the token is paused', async function () {
      await expect(xTokenContractVegeta.transferFrom(kakarotoAddress, vegetaAddress, 5)).to.be.revertedWith(
        'ERC20Pausable: token transfer while paused',
      );
    });
  });
});
