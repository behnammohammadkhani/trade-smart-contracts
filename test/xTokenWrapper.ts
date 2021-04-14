import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import {
  AuthorizationMock,
  PermissionsMock,
  EurPriceFeedMock,
  OperationsRegistryMock,
  XTokenWrapper,
  XToken,
  ERC20Detailed,
} from '../typechain';
import Reverter from './utils/reverter';

let deployer: Signer;
let kakaroto: Signer;
let karpincho: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let karpinchoAddress: string;

let xTokenDaiContract: XToken;
let xTokenEthContract: XToken;

let xTokenWrapperContract: XTokenWrapper;
let xTokenWrapperContractKakaroto: XTokenWrapper;
let xTokenWrapperContractKarpincho: XTokenWrapper;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: AuthorizationMock;
let operationsRegistryContract: OperationsRegistryMock;

let usdcToken: ERC20Detailed;
let daiToken: ERC20Detailed;
let daiTokenKakaroto: ERC20Detailed;

let DEFAULT_ADMIN_ROLE: string;
let REGISTRY_MANAGER_ROLE: string;
let ETH_TOKEN_ADDRESS: string;

describe('xTokenWrapper', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto, , karpincho] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress, karpinchoAddress] = await Promise.all([
      deployer.getAddress(),
      kakaroto.getAddress(),
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

    usdcToken = (await ERC20DetailedFactory.deploy('USDC', 'USDC', 6)) as ERC20Detailed;
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

    xTokenWrapperContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapper;
    await xTokenWrapperContract.deployed();

    ETH_TOKEN_ADDRESS = await xTokenWrapperContract.ETH_TOKEN_ADDRESS();

    await xTokenDaiContract.setWrapper(xTokenWrapperContract.address);
    await xTokenEthContract.setWrapper(xTokenWrapperContract.address);

    xTokenWrapperContractKakaroto = xTokenWrapperContract.connect(kakaroto);
    xTokenWrapperContractKarpincho = xTokenWrapperContract.connect(karpincho);

    await daiToken.mint(kakarotoAddress, 1000);
    await usdcToken.mint(kakarotoAddress, 1000);

    await reverter.snapshot();
  });

  describe('Deployment', () => {
    it('should set admin and registry manager', async () => {
      DEFAULT_ADMIN_ROLE = await xTokenWrapperContract.DEFAULT_ADMIN_ROLE();

      expect(await xTokenWrapperContract.hasRole(DEFAULT_ADMIN_ROLE, deployerAddress)).to.equal(true);
    });
  });

  describe('#setRegistryManager', () => {
    it('non admin should not be able to set registry manager', async () => {
      await expect(xTokenWrapperContractKakaroto.setRegistryManager(karpinchoAddress)).to.be.revertedWith(
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('admin should be able to register  set registry manager', async () => {
      REGISTRY_MANAGER_ROLE = await xTokenWrapperContract.REGISTRY_MANAGER_ROLE();

      await xTokenWrapperContract.setRegistryManager(karpinchoAddress);

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
});
