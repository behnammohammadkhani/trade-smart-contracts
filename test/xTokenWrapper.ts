import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import CPK from 'contract-proxy-kit';
import {
  AuthorizationMock,
  PermissionsMock,
  EurPriceFeedMock,
  OperationsRegistryMock,
  XTokenWrapper,
  XToken,
  ERC20Detailed,
  SafeEvents,
} from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;
// let vegeta: Signer;
let karpincho: Signer;

// let deployerAddress: string;
let kakarotoAddress: string;
// let vegetaAddress: string;
let karpinchoAddress: string;

let xTokenDaiContract: XToken;
// let xTokenDaiContractKakaroto: XToken;
// let xTokenDaiContractVegeta: XToken;
// let xTokenDaiContractKarpincho: XToken;

let xTokenEthContract: XToken;
// let xTokenEthContractKakaroto: XToken;
// let xTokenEthContractVegeta: XToken;
// let xTokenEthContractKarpincho: XToken;

let xTokenWrapperContract: XTokenWrapper;
let xTokenWrapperContractKakaroto: XTokenWrapper;
// let xTokenWrapperContractVegeta: XTokenWrapper;
let xTokenWrapperContractKarpincho: XTokenWrapper;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: AuthorizationMock;
// let authorizationContractKakaroto: AuthorizationMock;
let operationsRegistryContract: OperationsRegistryMock;

let usdcToken: ERC20Detailed;
let daiToken: ERC20Detailed;
let daiTokenKakaroto: ERC20Detailed;

let REGISTRY_MANAGER_ROLE: string;
let ETH_TOKEN_ADDRESS: string;

let SafeContract: SafeEvents;

describe('xTokenWrapper', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, , karpincho] = await ethers.getSigners();
    [
      //deployerAddress,
      kakarotoAddress,
      // vegetaAddress,
      karpinchoAddress,
    ] = await Promise.all([
      //deployer.getAddress(),
      kakaroto.getAddress(),
      // vegeta.getAddress(),
      karpincho.getAddress(),
    ]);

    const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
    const xTokenFactory = await ethers.getContractFactory('XToken');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
    const XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapper');
    const ERC20DetailedFactory = await ethers.getContractFactory('ERC20Detailed');
    const AuthorizationFactory = await ethers.getContractFactory('AuthorizationMock');
    const OperationsRegistryFactory = await ethers.getContractFactory('OperationsRegistryMock');

    daiToken = (await ERC20DetailedFactory.deploy('DAI', 'DAI', 18)) as ERC20Detailed;
    await daiToken.deployed();

    daiTokenKakaroto = daiToken.connect(kakaroto);

    usdcToken = (await ERC20DetailedFactory.deploy('USDC', 'USDC', 8)) as ERC20Detailed;
    await usdcToken.deployed();

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    permissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
    await permissionsContract.deployed();

    authorizationContract = (await AuthorizationFactory.deploy(true)) as AuthorizationMock;
    await authorizationContract.deployed();

    operationsRegistryContract = (await OperationsRegistryFactory.deploy()) as OperationsRegistryMock;
    await authorizationContract.deployed();

    xTokenDaiContract = (await xTokenFactory.deploy(
      'xToken wrapped DAI',
      'xDAI',
      18,
      '',
      authorizationContract.address,
      operationsRegistryContract.address,
    )) as XToken;
    await xTokenDaiContract.deployed();

    xTokenEthContract = (await xTokenFactory.deploy(
      'xToken wrapped ETH',
      'xETH',
      18,
      '',
      authorizationContract.address,
      operationsRegistryContract.address,
    )) as XToken;
    await xTokenDaiContract.deployed();

    // xTokenDaiContractKakaroto = xTokenDaiContract.connect(kakaroto);
    // xTokenDaiContractVegeta = xTokenDaiContract.connect(vegeta);
    // xTokenDaiContractKarpincho = xTokenDaiContract.connect(karpincho);

    xTokenWrapperContract = (await XTokenWrapperFactory.deploy(karpinchoAddress)) as XTokenWrapper;
    await xTokenWrapperContract.deployed();

    ETH_TOKEN_ADDRESS = await xTokenWrapperContract.ETH_TOKEN_ADDRESS();

    await xTokenDaiContract.setWrapper(xTokenWrapperContract.address);
    await xTokenEthContract.setWrapper(xTokenWrapperContract.address);

    xTokenWrapperContractKakaroto = xTokenWrapperContract.connect(kakaroto);
    // xTokenWrapperContractVegeta = xTokenWrapperContract.connect(vegeta);
    xTokenWrapperContractKarpincho = xTokenWrapperContract.connect(karpincho);

    await daiToken.mint(kakarotoAddress, 1000);
    await usdcToken.mint(kakarotoAddress, 1000);

    await reverter.snapshot();
  });

  describe('Deployment', () => {
    it('should set admin and registry manager', async () => {
      REGISTRY_MANAGER_ROLE = await xTokenWrapperContract.REGISTRY_MANAGER_ROLE();

      expect(await xTokenWrapperContract.hasRole(REGISTRY_MANAGER_ROLE, karpinchoAddress)).to.equal(true);
    });
  });

  describe('#registerToken', () => {
    it('non registrty manager should not be able to register a new token', async () => {
      await expect(xTokenWrapperContract.registerToken(daiToken.address, xTokenDaiContract.address)).to.be.revertedWith(
        'must have registry manager role',
      );
    });

    it('registrty manager should not be able to register a new token with token address zero', async () => {
      await expect(
        xTokenWrapperContractKarpincho.registerToken(ethers.constants.AddressZero, xTokenDaiContract.address),
      ).to.be.revertedWith('token is the zero address');
    });

    it('registrty manager should not be able to register a new token with xToken address zero', async () => {
      await expect(
        xTokenWrapperContractKarpincho.registerToken(daiToken.address, ethers.constants.AddressZero),
      ).to.be.revertedWith('xToken is the zero address');
    });

    it('registrty manager should be able to register a new token', async () => {
      await xTokenWrapperContractKarpincho.registerToken(daiToken.address, xTokenDaiContract.address);

      expect(await xTokenWrapperContract.tokenToXToken(daiToken.address)).to.eq(xTokenDaiContract.address);
      expect(await xTokenWrapperContract.xTokenToToken(xTokenDaiContract.address)).to.eq(daiToken.address);

      await xTokenWrapperContractKarpincho.registerToken(ETH_TOKEN_ADDRESS, xTokenEthContract.address);

      expect(await xTokenWrapperContract.tokenToXToken(ETH_TOKEN_ADDRESS)).to.eq(xTokenEthContract.address);
      expect(await xTokenWrapperContract.xTokenToToken(xTokenEthContract.address)).to.eq(ETH_TOKEN_ADDRESS);

      await reverter.snapshot();
    });
  });

  describe('#wrap', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not be able to wrap a non registered token', async () => {
      await expect(xTokenWrapperContractKakaroto.wrap(usdcToken.address, 1)).to.be.revertedWith(
        'token is not registered',
      );
    });

    it('should not be able to wrap a registered ERC20 token before approving the wrapper', async () => {
      await expect(xTokenWrapperContractKakaroto.wrap(daiToken.address, 1)).to.be.revertedWith(
        'ERC20: transfer amount exceeds allowance',
      );
    });

    it('should not be able to wrap a registered ERC20 token if it is not authorized', async () => {
      await authorizationContract.setAuthorized(false);

      await daiTokenKakaroto.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);

      await expect(xTokenWrapperContractKakaroto.wrap(daiToken.address, 1)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('should be able to wrap a registered ERC20 token', async () => {
      const daiBalanceBefore = await daiToken.balanceOf(kakarotoAddress);
      const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(kakarotoAddress);

      await daiTokenKakaroto.approve(xTokenWrapperContract.address, ethers.constants.MaxUint256);

      await xTokenWrapperContractKakaroto.wrap(daiToken.address, 1);

      expect(await daiToken.balanceOf(kakarotoAddress)).to.eq(daiBalanceBefore.sub(1));
      expect(await xTokenDaiContract.balanceOf(kakarotoAddress)).to.eq(xDaiBalanceBefore.add(1));

      await reverter.snapshot();
    });

    it('should not be able to wrap a ETH if it is not paying with ETH', async () => {
      await expect(xTokenWrapperContractKakaroto.wrap(ETH_TOKEN_ADDRESS, 1)).to.be.revertedWith(
        'amount to wrap should be positive',
      );
    });

    it('should not be able to wrap a ETH if it is not authorized', async () => {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenWrapperContractKakaroto.wrap(ETH_TOKEN_ADDRESS, 0, { value: 1 })).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('should be able to wrap a ETH with the amount being payed', async () => {
      const ethBalanceBefore = await kakaroto.getBalance();
      const xEthBalanceBefore = await xTokenEthContract.balanceOf(kakarotoAddress);

      const tx = await xTokenWrapperContractKakaroto.wrap(ETH_TOKEN_ADDRESS, ethers.constants.WeiPerEther.mul(2), {
        value: ethers.constants.WeiPerEther,
      });
      const gasPrice = tx.gasPrice;
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;

      expect(await kakaroto.getBalance()).to.eq(
        ethBalanceBefore.sub(ethers.constants.WeiPerEther).sub(gasUsed.mul(gasPrice)),
      );
      expect(await xTokenEthContract.balanceOf(kakarotoAddress)).to.eq(
        xEthBalanceBefore.add(ethers.constants.WeiPerEther),
      );

      await reverter.snapshot();
    });
  });

  describe('#unwrap', () => {
    let unRegisteredXToken: XToken;
    before(async () => {
      const xTokenFactory = await ethers.getContractFactory('XToken');

      unRegisteredXToken = (await xTokenFactory.deploy(
        'some x token',
        'xST',
        18,
        '',
        authorizationContract.address,
        operationsRegistryContract.address,
      )) as XToken;
      await unRegisteredXToken.deployed();
    });

    beforeEach(async () => {
      await reverter.revert();
    });

    it('should not be able to unwrap a non registered token', async () => {
      await expect(xTokenWrapperContractKakaroto.unwrap(unRegisteredXToken.address, 1)).to.be.revertedWith(
        'xToken is not registered',
      );
    });

    it('should not be able to unwrap a registered ERC20 wrapped xToken if it is not authorized', async () => {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenWrapperContractKakaroto.unwrap(xTokenDaiContract.address, 1)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('should not be able to unwrap a registered ERC20 wrapped xToken more than it owns', async () => {
      const xDaiBalance = await xTokenDaiContract.balanceOf(kakarotoAddress);

      await expect(
        xTokenWrapperContractKakaroto.unwrap(xTokenDaiContract.address, xDaiBalance.add(1)),
      ).to.be.revertedWith('ERC20: burn amount exceeds balance');
    });

    it('should be able to unwrap a registered ERC20 token', async () => {
      const daiBalanceBefore = await daiToken.balanceOf(kakarotoAddress);
      const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(kakarotoAddress);

      await xTokenWrapperContractKakaroto.unwrap(xTokenDaiContract.address, 1);

      expect(await daiToken.balanceOf(kakarotoAddress)).to.eq(daiBalanceBefore.add(1));
      expect(await xTokenDaiContract.balanceOf(kakarotoAddress)).to.eq(xDaiBalanceBefore.sub(1));
    });

    it('should not be able to unwrap a ETH if it is not authorized', async () => {
      await authorizationContract.setAuthorized(false);

      await expect(xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, 1)).to.be.revertedWith(
        'Authorizable: not authorized',
      );
    });

    it('should not be able to unwrap a registered ERC20 wrapped xToken more than it owns', async () => {
      const xEthBalance = await xTokenEthContract.balanceOf(kakarotoAddress);

      await expect(
        xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, xEthBalance.add(1)),
      ).to.be.revertedWith('ERC20: burn amount exceeds balance');
    });

    it('should be able to unwrap a ETH', async () => {
      const ethBalanceBefore = await kakaroto.getBalance();
      const xEthBalanceBefore = await xTokenEthContract.balanceOf(kakarotoAddress);

      const tx = await xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, xEthBalanceBefore);
      const gasPrice = tx.gasPrice;
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;

      expect(await kakaroto.getBalance()).to.eq(ethBalanceBefore.add(xEthBalanceBefore).sub(gasUsed.mul(gasPrice)));
      expect(await xTokenEthContract.balanceOf(kakarotoAddress)).to.eq(0);
    });
  });

  describe('interacting through CPK', () => {
    let cpkKakaroto: CPK;

    before(async () => {
      await authorizationContract.setAuthorized(true);

      cpkKakaroto = await CPK.create({
        ethers: ethers as any,
        signer: kakaroto as any,
        networks: {
          31337: {
            //masterCopyAddress: '0x6851D6fDFAfD08c0295C392436245E5bc78B0185', new version
            masterCopyAddress: '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F', // old version witgh executeTransaction non payable
            proxyFactoryAddress: '0x0fB4340432e56c014fa96286de17222822a9281b',
            multiSendAddress: '0x8D29bE29923b68abfDD21e541b9374737B49cdAD',
            fallbackHandlerAddress: '0x40A930851BD2e590Bd5A5C981b436de25742E980',
          },
        },
      });

      const SafeEventsFactory = await ethers.getContractFactory('SafeEvents');
      SafeContract = SafeEventsFactory.attach(cpkKakaroto.address) as SafeEvents;

      await daiTokenKakaroto.approve(xTokenWrapperContract.address, ethers.constants.Zero);

      await reverter.snapshot();
    });

    describe('#wrap', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('should not be able to wrap a non registered token', async () => {
        await usdcToken.approve(cpkKakaroto.address, ethers.constants.MaxUint256);

        const execTransferFromTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: usdcToken.address,
            data: usdcToken.interface.encodeFunctionData('transferFrom', [kakarotoAddress, cpkKakaroto.address, '1']),
          },
        ]);
        await execTransferFromTx.transactionResponse?.wait();

        const usdcBalanceBefore = await usdcToken.balanceOf(cpkKakaroto.address);

        const execApproveTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: usdcToken.address,
            data: usdcToken.interface.encodeFunctionData('approve', [xTokenWrapperContractKakaroto.address, '1']),
          },
        ]);
        await execApproveTx.transactionResponse?.wait();

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [usdcToken.address, '1']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await usdcToken.balanceOf(cpkKakaroto.address)).to.eq(usdcBalanceBefore);
      });

      it('should not be able to wrap a registered ERC20 token if it is not authorized', async () => {
        await authorizationContract.setAuthorized(false);

        await daiTokenKakaroto.approve(cpkKakaroto.address, ethers.constants.MaxUint256);

        const execTransferFromTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: daiToken.address,
            data: daiToken.interface.encodeFunctionData('transferFrom', [kakarotoAddress, cpkKakaroto.address, '1']),
          },
        ]);
        await execTransferFromTx.transactionResponse?.wait();

        const daiBalanceBefore = await daiToken.balanceOf(cpkKakaroto.address);
        const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(cpkKakaroto.address);

        const execApproveTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: daiToken.address,
            data: daiToken.interface.encodeFunctionData('approve', [xTokenWrapperContractKakaroto.address, '1']),
          },
        ]);
        await execApproveTx.transactionResponse?.wait();

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [daiToken.address, '1']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await daiToken.balanceOf(cpkKakaroto.address)).to.eq(daiBalanceBefore);
        expect(await xTokenDaiContract.balanceOf(cpkKakaroto.address)).to.eq(xDaiBalanceBefore);
      });

      it('should be able to wrap a registered ERC20 token', async () => {
        await daiTokenKakaroto.approve(cpkKakaroto.address, ethers.constants.MaxUint256);

        const execTransferFromTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: daiToken.address,
            data: daiToken.interface.encodeFunctionData('transferFrom', [kakarotoAddress, cpkKakaroto.address, '1']),
          },
        ]);
        await execTransferFromTx.transactionResponse?.wait();

        const daiBalanceBefore = await daiToken.balanceOf(cpkKakaroto.address);
        const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(cpkKakaroto.address);

        const execApproveTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: daiToken.address,
            data: daiToken.interface.encodeFunctionData('approve', [xTokenWrapperContractKakaroto.address, '1']),
          },
        ]);
        await execApproveTx.transactionResponse?.wait();

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [daiToken.address, '1']),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await daiToken.balanceOf(cpkKakaroto.address)).to.eq(daiBalanceBefore.sub(1));
        expect(await xTokenDaiContract.balanceOf(cpkKakaroto.address)).to.eq(xDaiBalanceBefore.add(1));

        await reverter.snapshot();
      });

      xit('should not be able to wrap a ETH if it is not paying with ETH', async () => {
        const ethBalanceBefore = await kakaroto.getBalance();
        const xEthBalanceBefore = await xTokenEthContract.balanceOf(cpkKakaroto.address);

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [ETH_TOKEN_ADDRESS, '1']),
          },
        ]);

        const receipt = await execTx.transactionResponse?.wait();

        const gasPrice = execTx.transactionResponse
          ? ethers.BigNumber.from(execTx.transactionResponse.gasPrice)
          : ethers.constants.Zero;
        const gasUsed = receipt
          ? ethers.BigNumber.from(receipt.gasUsed ? receipt.gasUsed.toString() : 0)
          : ethers.constants.Zero;

        expect(await kakaroto.getBalance()).to.eq(ethBalanceBefore.sub(gasUsed.mul(gasPrice)));
        expect(await xTokenEthContract.balanceOf(cpkKakaroto.address)).to.eq(xEthBalanceBefore);
      });

      xit('should not be able to wrap a ETH if it is not authorized', async () => {
        await authorizationContract.setAuthorized(false);

        const ethBalanceBefore = await kakaroto.getBalance();
        const xEthBalanceBefore = await xTokenEthContract.balanceOf(cpkKakaroto.address);

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [ETH_TOKEN_ADDRESS, '0']),
            value: '1',
          },
        ]);

        const receipt = await execTx.transactionResponse?.wait();

        const gasPrice = execTx.transactionResponse
          ? ethers.BigNumber.from(execTx.transactionResponse.gasPrice)
          : ethers.constants.Zero;
        const gasUsed = receipt
          ? ethers.BigNumber.from(receipt.gasUsed ? receipt.gasUsed.toString() : 0)
          : ethers.constants.Zero;

        expect(await kakaroto.getBalance()).to.eq(ethBalanceBefore.sub(gasUsed.mul(gasPrice)));
        expect(await xTokenEthContract.balanceOf(cpkKakaroto.address)).to.eq(xEthBalanceBefore);
      });

      // TODO - Make this test work. CPK is emmiting ExecutionFailure event
      // The version of the CPK being used is prepared for the old version of GnosisSafe where executeTransaction is non payable
      //
      xit('should be able to wrap a ETH with the amount being payed', async () => {
        const ethBalanceBefore = await kakaroto.getBalance();
        const xEthBalanceBefore = await xTokenEthContract.balanceOf(cpkKakaroto.address);

        console.log('kakarotoAddress', kakarotoAddress);
        console.log('cpkKakaroto.address', cpkKakaroto.address);
        console.log('xTokenEthContract', xTokenEthContract.address);

        const execTx = await cpkKakaroto.execTransactions(
          [
            {
              operation: CPK.CALL,
              to: xTokenWrapperContractKakaroto.address,
              data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('wrap', [
                ETH_TOKEN_ADDRESS,
                ethers.constants.WeiPerEther.mul(2),
              ]),
              value: ethers.constants.WeiPerEther,
            },
          ],
          { gasLimit: 9500000 },
        );

        console.log('gasLimit', execTx.transactionResponse?.gasLimit.toString());
        console.log('gasPrice', execTx.transactionResponse?.gasPrice.toString());

        const receipt = await execTx.transactionResponse?.wait();

        // const gasPrice = execTx.transactionResponse ? ethers.BigNumber.from(execTx.transactionResponse.gasPrice) : ethers.constants.Zero
        const gasUsed = receipt
          ? ethers.BigNumber.from(receipt.gasUsed ? receipt.gasUsed.toString() : 0)
          : ethers.constants.Zero;

        console.log('gasUsed', gasUsed.toString());

        console.log('xeth before', xEthBalanceBefore.toString());
        console.log('xeth after', (await xTokenEthContract.balanceOf(cpkKakaroto.address)).toString());

        console.log('eth before', ethBalanceBefore.toString());
        console.log('eth after', (await kakaroto.getBalance()).toString());

        console.log(execTx);
        const log = receipt
          ? receipt.logs
            ? receipt.logs[0]
            : {
                topics: [],
                data: '',
              }
          : {
              topics: [],
              data: '',
            };

        console.log(SafeContract.interface.parseLog(log));

        // expect(await kakaroto.getBalance()).to.eq(ethBalanceBefore.sub(ethers.constants.WeiPerEther).sub(gasUsed.mul(gasPrice)))
        expect(await xTokenEthContract.balanceOf(cpkKakaroto.address)).to.eq(
          xEthBalanceBefore.add(ethers.constants.WeiPerEther),
        );
      });
    });

    describe('#unwrap', () => {
      let unRegisteredXToken: XToken;
      before(async () => {
        const xTokenFactory = await ethers.getContractFactory('XToken', karpincho);

        unRegisteredXToken = (await xTokenFactory.deploy(
          'some x token',
          'xST',
          18,
          '',
          authorizationContract.address,
          operationsRegistryContract.address,
        )) as XToken;
        await unRegisteredXToken.deployed();
      });

      beforeEach(async () => {
        await reverter.revert();
      });

      it('should not be able to unwrap a non registered token', async () => {
        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('unwrap', [
              unRegisteredXToken.address,
              '1',
            ]),
          },
        ]);

        const receipt = await execTx.transactionResponse?.wait();

        const log = receipt
          ? receipt.logs
            ? receipt.logs[0]
            : {
                topics: [],
                data: '',
              }
          : {
              topics: [],
              data: '',
            };

        expect(SafeContract.interface.parseLog(log).name).to.eq('ExecutionFailure');
      });

      it('should not be able to unwrap a registered ERC20 wrapped xToken if it is not authorized', async () => {
        await authorizationContract.setAuthorized(false);
        const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(cpkKakaroto.address);
        expect(xDaiBalanceBefore).to.eq('1');

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('unwrap', [
              xTokenDaiContract.address,
              '1',
            ]),
          },
        ]);

        const receipt = await execTx.transactionResponse?.wait();

        const log = receipt
          ? receipt.logs
            ? receipt.logs[0]
            : {
                topics: [],
                data: '',
              }
          : {
              topics: [],
              data: '',
            };

        expect(SafeContract.interface.parseLog(log).name).to.eq('ExecutionFailure');
        expect(await xTokenDaiContract.balanceOf(cpkKakaroto.address)).to.eq(xDaiBalanceBefore);
      });

      it('should not be able to unwrap a registered ERC20 wrapped xToken more than it owns', async () => {
        await authorizationContract.setAuthorized(true);
        const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(cpkKakaroto.address);
        expect(xDaiBalanceBefore).to.eq('1');

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('unwrap', [
              xTokenDaiContract.address,
              xDaiBalanceBefore.add(1),
            ]),
          },
        ]);

        const receipt = await execTx.transactionResponse?.wait();

        const log = receipt
          ? receipt.logs
            ? receipt.logs[0]
            : {
                topics: [],
                data: '',
              }
          : {
              topics: [],
              data: '',
            };

        expect(SafeContract.interface.parseLog(log).name).to.eq('ExecutionFailure');
        expect(await xTokenDaiContract.balanceOf(cpkKakaroto.address)).to.eq(xDaiBalanceBefore);
      });

      it('should be able to unwrap a registered ERC20 token', async () => {
        const daiBalanceBefore = await daiToken.balanceOf(cpkKakaroto.address);
        const xDaiBalanceBefore = await xTokenDaiContract.balanceOf(cpkKakaroto.address);

        const execTx = await cpkKakaroto.execTransactions([
          {
            operation: CPK.CALL,
            value: '0',
            to: xTokenWrapperContractKakaroto.address,
            data: xTokenWrapperContractKakaroto.interface.encodeFunctionData('unwrap', [
              xTokenDaiContract.address,
              xDaiBalanceBefore,
            ]),
          },
        ]);

        await execTx.transactionResponse?.wait();

        expect(await daiToken.balanceOf(cpkKakaroto.address)).to.eq(daiBalanceBefore.add(1));
        expect(await xTokenDaiContract.balanceOf(cpkKakaroto.address)).to.eq(xDaiBalanceBefore.sub(1));
      });

      xit('should not be able to unwrap a ETH if it is not authorized', async () => {
        await authorizationContract.setAuthorized(false);

        await expect(xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, 1)).to.be.revertedWith(
          'Authorizable: not authorized',
        );
      });

      xit('should not be able to unwrap a registered ERC20 wrapped xToken more than it owns', async () => {
        const xEthBalance = await xTokenEthContract.balanceOf(kakarotoAddress);

        await expect(
          xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, xEthBalance.add(1)),
        ).to.be.revertedWith('ERC20: burn amount exceeds balance');
      });

      xit('should be able to unwrap a ETH', async () => {
        const ethBalanceBefore = await kakaroto.getBalance();
        const xEthBalanceBefore = await xTokenEthContract.balanceOf(kakarotoAddress);

        const tx = await xTokenWrapperContractKakaroto.unwrap(xTokenEthContract.address, xEthBalanceBefore);
        const gasPrice = tx.gasPrice;
        const receipt = await tx.wait();
        const gasUsed = receipt.gasUsed;

        expect(await kakaroto.getBalance()).to.eq(ethBalanceBefore.add(xEthBalanceBefore).sub(gasUsed.mul(gasPrice)));
        expect(await xTokenEthContract.balanceOf(kakarotoAddress)).to.eq(0);
      });
    });
  });
});
