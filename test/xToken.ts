import { ethers } from 'hardhat';
import { Signer, ContractFactory } from 'ethers';
import { expect } from 'chai';
import { XToken, AuthorizationMock, OperationsRegistryMock, XTokenWrapperMock } from '../typechain';
import Reverter from './utils/reverter';
import CPK from 'contract-proxy-kit';

let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let vegetaAddress: string;

let xTokenContract: XToken;
let xTokenContractVegeta: XToken;
let xTokenContractKakaroto: XToken;
let authorizationContract: AuthorizationMock;
let operationsRegistryContract: OperationsRegistryMock;
let xTokenWrapperMockContract: XTokenWrapperMock;
let xTokenWrapperMockContractKakaroto: XTokenWrapperMock;

let xTokenFactory: ContractFactory;

let WRAPPER_ROLE: string;
let DEFAULT_ADMIN_ROLE: string;

describe('xToken', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto, vegeta] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress, vegetaAddress] = await Promise.all([
      deployer.getAddress(),
      kakaroto.getAddress(),
      vegeta.getAddress(),
    ]);

    kakarotoAddress;

    xTokenFactory = await ethers.getContractFactory('XToken');
    const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
    const OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistryMock');
    const XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapperMock');

    authorizationContract = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
    await authorizationContract.deployed();

    operationsRegistryContract = (await OperationsRegistryFactory.deploy()) as OperationsRegistryMock;
    await authorizationContract.deployed();

    xTokenWrapperMockContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapperMock;
    await xTokenWrapperMockContract.deployed();

    xTokenWrapperMockContractKakaroto = xTokenWrapperMockContract.connect(kakaroto);

    await reverter.snapshot();
  });

  describe('deploy', () => {
    it('should revert when decimals_ is zero', async () => {
      await expect(
        xTokenFactory.deploy('', '', 0, '', authorizationContract.address, operationsRegistryContract.address),
      ).to.be.revertedWith('decimals is 0');
    });

    it('should revert when authorization_ is zero address', async () => {
      await expect(
        xTokenFactory.deploy('', '', 1, '', ethers.constants.AddressZero, operationsRegistryContract.address),
      ).to.be.revertedWith('authorization is the zero address');
    });

    it('should revert when operationsRegistry_ is zero address', async () => {
      await expect(
        xTokenFactory.deploy('', '', 1, '', authorizationContract.address, ethers.constants.AddressZero),
      ).to.be.revertedWith('operationsRegistry is the zero address');
    });

    it('should deploy the xToken', async () => {
      xTokenContract = (await xTokenFactory.deploy(
        'xToken1',
        'XT1',
        1,
        'know your asset',
        authorizationContract.address,
        operationsRegistryContract.address,
      )) as XToken;

      expect(await xTokenContract.name()).to.eq('xToken1');
      expect(await xTokenContract.symbol()).to.eq('XT1');
      expect(await xTokenContract.decimals()).to.eq(1);
      expect(await xTokenContract.kya()).to.eq('know your asset');
      expect(await xTokenContract.authorization()).to.eq(authorizationContract.address);
      expect(await xTokenContract.operationsRegistry()).to.eq(operationsRegistryContract.address);

      DEFAULT_ADMIN_ROLE = await xTokenContract.DEFAULT_ADMIN_ROLE();
      WRAPPER_ROLE = await xTokenContract.WRAPPER_ROLE();
      expect(await xTokenContract.hasRole(DEFAULT_ADMIN_ROLE, deployerAddress)).to.equal(true);

      await reverter.snapshot();

      xTokenContractVegeta = xTokenContract.connect(vegeta);
      xTokenContractKakaroto = xTokenContract.connect(kakaroto);
    });
  });

  describe('#setWrapper, #pause, #unpause, #setAuthorization, #setOperationsRegistry, #setKya', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non admin should not be able to setWrapper', async function () {
      await expect(xTokenContractVegeta.setWrapper(xTokenWrapperMockContract.address)).to.be.revertedWith(
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('admin should be able to setWrapper', async function () {
      await xTokenContract.setWrapper(xTokenWrapperMockContract.address);
      expect(await xTokenContract.hasRole(WRAPPER_ROLE, xTokenWrapperMockContract.address)).to.equal(true);
    });

    it('non admin should not be able to pause', async function () {
      await expect(xTokenContractVegeta.pause()).to.be.revertedWith('must have default admin role');
    });

    it('non admin should not be able to unpause', async function () {
      await expect(xTokenContractVegeta.unpause()).to.be.revertedWith('must have default admin role');
    });

    it('admin should be able to pause and unpause', async function () {
      expect(await xTokenContract.paused()).to.eq(false);

      await xTokenContract.pause();

      expect(await xTokenContract.paused()).to.eq(true);

      await xTokenContract.unpause();

      expect(await xTokenContract.paused()).to.eq(false);
    });

    it('non admin should not be able to call setAuthorization', async function () {
      await expect(xTokenContractVegeta.setAuthorization(authorizationContract.address)).to.be.revertedWith(
        'must have default admin role',
      );
    });

    it('admin should not be able to call setAuthorization with address zero', async function () {
      await expect(xTokenContract.setAuthorization(ethers.constants.AddressZero)).to.be.revertedWith(
        'Authorizable: authorization is the zero address',
      );
    });

    it('admin should be able to call setAuthorization', async function () {
      const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
      const authorizationContract2 = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
      await authorizationContract2.deployed();

      await xTokenContract.setAuthorization(authorizationContract2.address);

      const authorizationAddress = await xTokenContract.authorization();
      expect(authorizationAddress).to.equal(authorizationContract2.address);
    });

    it('non admin should not be able to call setOperationsRegistry', async function () {
      await expect(xTokenContractVegeta.setOperationsRegistry(authorizationContract.address)).to.be.revertedWith(
        'must have default admin role',
      );
    });

    it('admin should not be able to call setOperationsRegistry with address zero', async function () {
      await expect(xTokenContract.setOperationsRegistry(ethers.constants.AddressZero)).to.be.revertedWith(
        'operationsRegistry is the zero address',
      );
    });

    it('admin should be able to call setOperationsRegistry', async function () {
      const OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistryMock');
      const operationsRegistryContract2 = (await OperationsRegistryFactory.deploy()) as OperationsRegistryMock;
      await operationsRegistryContract2.deployed();

      await xTokenContract.setOperationsRegistry(operationsRegistryContract2.address);

      const operationsRegistryAddress = await xTokenContract.operationsRegistry();
      expect(operationsRegistryAddress).to.equal(operationsRegistryContract2.address);
    });

    it('non admin should not be able to call setOperationsRegistry', async function () {
      await expect(xTokenContractVegeta.setKya('a different kya')).to.be.revertedWith('must have default admin role');
    });

    it('admin should not be able to call setOperationsRegistry', async function () {
      await xTokenContract.setKya('a different kya');

      const kya = await xTokenContract.kya();
      expect(kya).to.equal('a different kya');
    });
  });

  describe('#mint', () => {
    before(async () => {
      await xTokenContract.setWrapper(xTokenWrapperMockContract.address);
      await reverter.snapshot();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('non wrapper should not be able to call mint', async function () {
      await expect(xTokenContract.mint(kakarotoAddress, 1000)).to.be.revertedWith('must have wrapper role');
    });

    it('wrapper should not be able to call mint if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 1000)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('owner should be able to call mint if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      const wrapTx = xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 1000);

      await expect(wrapTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContract.interface.getSighash('mint'), 1000);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('1000');

      await reverter.snapshot();
    });
  });

  describe('#burFrom', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non wrapper should not be able to call burnFrom', async function () {
      await expect(xTokenContract.burnFrom(kakarotoAddress, 1000)).to.be.revertedWith('must have wrapper role');
    });

    it('wrapper should not be able to call burnFrom if the operation is not authorized', async function () {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 10)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('wrapper should be able to call burnFrom if the operation is authorized', async function () {
      await authorizationContract.setAuthorized(true);
      const unwrapTx = xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 10);

      await expect(unwrapTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractVegeta.interface.getSighash('burnFrom'), 10);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('990');
    });
  });

  describe('#transfer', () => {
    beforeEach(async () => {
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
      const transferTx = xTokenContractKakaroto.transfer(vegetaAddress, 5);

      await expect(transferTx)
        .to.emit(operationsRegistryContract, 'AddTrade')
        .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('transfer'), 5);
      expect(await xTokenContract.balanceOf(kakarotoAddress)).to.eq('995');
      expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq('5');
    });
  });

  describe('#transferFrom', () => {
    beforeEach(async () => {
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
      await xTokenContract.pause();
      await authorizationContract.setAuthorized(true);
    });

    it('wrapper should not be able to call mint if the token is paused', async function () {
      await expect(xTokenWrapperMockContractKakaroto.wrap(xTokenContract.address, 10)).to.be.revertedWith(
        'ERC20Pausable: token transfer while paused',
      );
    });

    it('ownerwrapper should not be able to call burnFrom if the token is paused', async function () {
      await expect(xTokenWrapperMockContractKakaroto.unwrap(xTokenContract.address, 10)).to.be.revertedWith(
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

  describe('interacting through CPK', () => {
    let cpkKakaroto: CPK;
    let cpkVegeta: CPK;

    before(async () => {
      await xTokenContract.unpause();
      await authorizationContract.setAuthorized(true);

      cpkKakaroto = await CPK.create({
        ethers: ethers as any,
        signer: kakaroto as any,
        networks: {
          31337: {
            masterCopyAddress: '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F',
            proxyFactoryAddress: '0x0fB4340432e56c014fa96286de17222822a9281b',
            multiSendAddress: '0x8D29bE29923b68abfDD21e541b9374737B49cdAD',
            fallbackHandlerAddress: '0x40A930851BD2e590Bd5A5C981b436de25742E980',
          },
        },
      });

      cpkVegeta = await CPK.create({
        ethers: ethers as any,
        signer: vegeta as any,
        networks: {
          31337: {
            masterCopyAddress: '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F',
            proxyFactoryAddress: '0x0fB4340432e56c014fa96286de17222822a9281b',
            multiSendAddress: '0x8D29bE29923b68abfDD21e541b9374737B49cdAD',
            fallbackHandlerAddress: '0x40A930851BD2e590Bd5A5C981b436de25742E980',
          },
        },
      });

      await reverter.snapshot();
    });

    describe('#mint', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('user should not be able to call mint directly through a CPK', async function () {
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('mint', [kakarotoAddress, '1000']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('user should not be able to execute mint through wrapper using CPK if the operation is not authorized', async function () {
        await authorizationContract.setAuthorized(false);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperMockContract.address,
            data: xTokenWrapperMockContract.interface.encodeFunctionData('wrap', [xTokenContract.address, '1000']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('user should be able to execute mint through wrapper using CPK if the operation is authorized', async function () {
        await authorizationContract.setAuthorized(true);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperMockContract.address,
            data: xTokenWrapperMockContract.interface.encodeFunctionData('wrap', [xTokenContract.address, '1000']),
          },
        ]);

        // operation amount is accumulated for the user (tx.origin)
        await expect(Promise.resolve(execTx.transactionResponse))
          .to.emit(operationsRegistryContract, 'AddTrade')
          .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('mint'), 1000);

        // tokens are assigned to the proxy
        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore.add('1000'));

        await reverter.snapshot();
      });
    });

    describe('#burnFrom', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('user should not be able to call burnFrom directly through a CPK', async function () {
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('burnFrom', [kakarotoAddress, '1000']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('should not be able to execute burnFrom through wrapper using CPK if the operation is not authorized', async function () {
        await authorizationContract.setAuthorized(false);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperMockContract.address,
            data: xTokenWrapperMockContract.interface.encodeFunctionData('unwrap', [xTokenContract.address, '1000']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('should be able to execute burFrom through wrapper using CPK if the operation is authorized', async function () {
        await authorizationContract.setAuthorized(true);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperMockContract.address,
            data: xTokenWrapperMockContract.interface.encodeFunctionData('unwrap', [xTokenContract.address, '1000']),
          },
        ]);

        // operation amount is accumulated for the user (tx.origin)
        await expect(Promise.resolve(execTx.transactionResponse))
          .to.emit(operationsRegistryContract, 'AddTrade')
          .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('burnFrom'), 1000);

        // tokens are assigned to the proxy
        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore.sub('1000'));
      });
    });

    describe('#transfer', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('should not be able to execute transfer through wrapper using CPK if the operation is not authorized', async function () {
        await authorizationContract.setAuthorized(false);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('transfer', [vegetaAddress, '5']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('should be able to execute transfer through wrapper using CPK if the operation is authorized', async function () {
        await authorizationContract.setAuthorized(true);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const balanceVegeteBefore = await xTokenContract.balanceOf(vegetaAddress);

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('transfer', [vegetaAddress, '5']),
          },
        ]);

        // operation amount is accumulated for the user (tx.origin)
        await expect(Promise.resolve(execTx.transactionResponse))
          .to.emit(operationsRegistryContract, 'AddTrade')
          .withArgs(kakarotoAddress, xTokenContractKakaroto.interface.getSighash('transfer'), 5);

        // tokens are transfered from the proxy
        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore.sub('5'));
        expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq(balanceVegeteBefore.add('5'));
      });
    });

    describe('#transferFrom', () => {
      before(async () => {
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('approve', [cpkVegeta.address, '5']),
          },
        ]);

        await expect(Promise.resolve(execTx.transactionResponse))
          .to.emit(xTokenContract, 'Approval')
          .withArgs(cpkKakaroto.address, cpkVegeta.address, 5);

        await execTx.transactionResponse?.wait();

        const execTx2 = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('approve', [vegetaAddress, '5']),
          },
        ]);

        await expect(Promise.resolve(execTx2.transactionResponse))
          .to.emit(xTokenContract, 'Approval')
          .withArgs(cpkKakaroto.address, vegetaAddress, 5);

        await execTx2.transactionResponse?.wait();

        await reverter.snapshot();
      });

      beforeEach(async () => {
        await reverter.revert();
      });

      it('should not be able to execute transferFrom through wrapper using CPK if the operation is not authorized', async function () {
        await authorizationContract.setAuthorized(false);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const execTx = await cpkVegeta.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('transferFrom', [
              cpkKakaroto.address,
              vegetaAddress,
              '5',
            ]),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore);
      });

      it('should be able to execute transferFrom through wrapper using CPK when the transferFrom sender is a CPK and if the operation is authorized', async function () {
        await authorizationContract.setAuthorized(true);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const balanceVegeteBefore = await xTokenContract.balanceOf(vegetaAddress);

        const execTx = await cpkVegeta.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenContract.address,
            data: xTokenContract.interface.encodeFunctionData('transferFrom', [
              cpkKakaroto.address,
              vegetaAddress,
              '5',
            ]),
          },
        ]);

        // operation amount is accumulated for the user, in this case the transferFrom sender CPK owner, because tx.origin is Vegeta's CPK
        await expect(Promise.resolve(execTx.transactionResponse))
          .to.emit(operationsRegistryContract, 'AddTrade')
          .withArgs(cpkKakaroto.address, xTokenContractKakaroto.interface.getSighash('transfer'), 5);

        // tokens are transfered from the proxy
        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore.sub('5'));
        expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq(balanceVegeteBefore.add('5'));
      });

      it('should be able to execute transferFrom from a EOA when the transferFrom sender is a CPK and if the operation is authorized', async function () {
        await authorizationContract.setAuthorized(true);
        const balanceBefore = await xTokenContract.balanceOf(cpkKakaroto.address);
        const balanceVegeteBefore = await xTokenContract.balanceOf(vegetaAddress);

        const transferTx = xTokenContractVegeta.transferFrom(cpkKakaroto.address, vegetaAddress, 5);

        // operation amount is accumulated for the user, in this case the transferFrom sender CPK owner, because tx.origin is Vegeta's CPK
        await expect(transferTx)
          .to.emit(operationsRegistryContract, 'AddTrade')
          .withArgs(cpkKakaroto.address, xTokenContractKakaroto.interface.getSighash('transfer'), 5);

        // tokens are transfered from the proxy
        expect(await xTokenContract.balanceOf(cpkKakaroto.address)).to.eq(balanceBefore.sub('5'));
        expect(await xTokenContract.balanceOf(vegetaAddress)).to.eq(balanceVegeteBefore.add('5'));
      });
    });
  });
});
