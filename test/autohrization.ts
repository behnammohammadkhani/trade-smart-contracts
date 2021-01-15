import { ethers, upgrades } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { Authorization, ERC20Authorizable, PermissionsMock, EurPriceFeedMock } from '../typechain';
import Reverter from './utils/reverter';

const { BigNumber } = ethers;
let deployer: Signer;
let kakaroto: Signer;
// let vegeta: Signer;
// let karpincho: Signer;

let deployerAddress: string;
// let kakarotoAddress: string;
// let vegetaAddress: string;
// let karpinchoAddress: string;

let token: ERC20Authorizable;

let eurPriceFeedContract: EurPriceFeedMock;
let permissionsContract: PermissionsMock;
let authorizationContract: Authorization;
let authorizationContractKakaroto: Authorization;

const traidingLimit = ethers.constants.One.mul(5000);

describe('Authorization', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto] = await ethers.getSigners();
    [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
    const Authorization = await ethers.getContractFactory('Authorization');
    const ERC20AuthorizableToken = await ethers.getContractFactory('ERC20Authorizable');
    const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');

    eurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
    await eurPriceFeedContract.deployed();

    permissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
    await permissionsContract.deployed();

    authorizationContract = (await upgrades.deployProxy(Authorization, [
      permissionsContract.address,
      eurPriceFeedContract.address,
      traidingLimit,
    ])) as Authorization;

    token = (await ERC20AuthorizableToken.deploy(
      'Authorizable Token',
      'AT',
      authorizationContract.address,
    )) as ERC20Authorizable;
    await token.deployed();

    await token.mint(await deployer.getAddress(), BigNumber.from(`${10e18}`));

    authorizationContractKakaroto = await authorizationContract.connect(kakaroto);

    await reverter.snapshot();
  });

  describe('Initialization', () => {
    it('Should not allow to call initialize after deployment', async function () {
      await expect(
        authorizationContract.initialize(permissionsContract.address, eurPriceFeedContract.address, traidingLimit),
      ).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('Should set the right values', async function () {
      const ownerAddress = await authorizationContract.owner();
      const permissionsAddress = await authorizationContract.permissions();
      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      const traidingLimitValue = await authorizationContract.traidingLimit();

      expect(ownerAddress).to.equal(deployerAddress);
      expect(permissionsAddress).to.equal(permissionsContract.address);
      expect(eurPriceFeedAddress).to.equal(eurPriceFeedContract.address);
      expect(traidingLimitValue).to.equal(traidingLimit.toString());
    });
  });

  describe('Ownership', () => {
    before(async () => {
      await reverter.revert();
    });

    it('Should not allow to set permissinos address to non owner', async function () {
      await expect(authorizationContractKakaroto.setPermissions(permissionsContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set eur price feed address to non owner', async function () {
      await expect(authorizationContractKakaroto.setEurPriceFeed(eurPriceFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should not allow to set traiding limit to non owner', async function () {
      await expect(authorizationContractKakaroto.setTraidingLimint(traidingLimit)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should allow to set permissinos address to owner', async function () {
      const PermissionsMock = await ethers.getContractFactory('PermissionsMock');
      const newPermissionsContract = (await PermissionsMock.deploy('')) as PermissionsMock;
      await newPermissionsContract.deployed();

      await authorizationContract.setPermissions(newPermissionsContract.address);

      const permissionsAddress = await authorizationContract.permissions();
      expect(permissionsAddress).to.equal(newPermissionsContract.address);
    });

    it('Should allow to set eur price feed address to owner', async function () {
      const EurPriceFeed = await ethers.getContractFactory('EurPriceFeedMock');
      const newEurPriceFeedContract = (await EurPriceFeed.deploy()) as EurPriceFeedMock;
      await newEurPriceFeedContract.deployed();

      await authorizationContract.setEurPriceFeed(newEurPriceFeedContract.address);

      const eurPriceFeedAddress = await authorizationContract.eurPriceFeed();
      expect(eurPriceFeedAddress).to.equal(newEurPriceFeedContract.address);
    });

    it('Should allow to set traiding limit to owner', async function () {
      await authorizationContract.setTraidingLimint(traidingLimit.mul(2));

      const traidingLimitValue = await authorizationContract.traidingLimit();
      expect(traidingLimitValue).to.equal(traidingLimit.mul(2).toString());
    });
  });
});
