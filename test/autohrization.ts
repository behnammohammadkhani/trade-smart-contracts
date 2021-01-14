import { ethers, upgrades } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { Authorization, ERC20Authorizable, PermissionsMock, EurPriceFeedMock } from '../typechain';

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
  });

  describe('Initialization', () => {
    it('Should not allow to call initialize after deployment', async function () {
      await expect(
        authorizationContract.initialize(permissionsContract.address, eurPriceFeedContract.address, traidingLimit),
      ).to.be.revertedWith('Initializable: contract is already initialized');
    });

    it('Should not to set permissinos address to non owner', async function () {
      await expect(authorizationContractKakaroto.setPermissions(permissionsContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
    it('Should not to set eur price feed address to non owner', async function () {
      await expect(authorizationContractKakaroto.setPermissions(eurPriceFeedContract.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
    it('Should not to set traiding limit to non owner', async function () {
      await expect(authorizationContractKakaroto.setTraidingLimint(traidingLimit)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
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
});
