import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { ProtocolFeeMock, BPoolMock, BPoolProxy, BRegistry, ERC20Detailed } from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;

let kakarotoAddress: string;
let vegetaAddress: string;

let poolProxyContract: BPoolProxy;
let poolProxyContractKakaroto: BPoolProxy;
let poolProxyContractVegeta: BPoolProxy;
let bRegistryContract: BRegistry;
let protocolFeeContract: ProtocolFeeMock;
let bPool1: BPoolMock;
let bPool2: BPoolMock;
let bPool3: BPoolMock;

let dai: ERC20Detailed;
let wEth: ERC20Detailed;

let daiVegeta: ERC20Detailed;

const MOCKED_PROTOCOL_FEE_AMOUNT = 10;

describe('BPoolProxy', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto, vegeta] = await ethers.getSigners();
    [kakarotoAddress, vegetaAddress] = await Promise.all([kakaroto.getAddress(), vegeta.getAddress()]);
    // [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const BPoolProxyFactory = await ethers.getContractFactory('BPoolProxy');
    const BRegistryFactory = await ethers.getContractFactory('BRegistry');
    const ProtocolFeeFactory = await ethers.getContractFactory('ProtocolFeeMock');
    const BPoolMockFactory = await ethers.getContractFactory('BPoolMock');
    const ERC20Factory = await ethers.getContractFactory('ERC20Detailed');

    bRegistryContract = (await BRegistryFactory.deploy(ethers.constants.AddressZero)) as BRegistry;
    await bRegistryContract.deployed();

    protocolFeeContract = (await ProtocolFeeFactory.deploy(MOCKED_PROTOCOL_FEE_AMOUNT)) as ProtocolFeeMock;
    await protocolFeeContract.deployed();

    poolProxyContract = (await BPoolProxyFactory.deploy(
      bRegistryContract.address,
      protocolFeeContract.address,
      kakarotoAddress,
    )) as BPoolProxy;
    await poolProxyContract.deployed();

    poolProxyContractKakaroto = poolProxyContract.connect(kakaroto);
    poolProxyContractVegeta = poolProxyContract.connect(vegeta);

    bPool1 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool1.deployed();
    bPool2 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool2.deployed();
    bPool3 = (await BPoolMockFactory.deploy()) as BPoolMock;
    await bPool3.deployed();

    dai = (await ERC20Factory.deploy('Dai Stablecoin', 'DAI', 18)) as ERC20Detailed;
    await dai.deployed();
    wEth = (await ERC20Factory.deploy('Wrapped Ether', 'WETH', 18)) as ERC20Detailed;
    await wEth.deployed();

    await dai.mint(vegetaAddress, ethers.constants.WeiPerEther.mul(3000));
    await wEth.mint(poolProxyContract.address, `${10e18}`);

    daiVegeta = dai.connect(vegeta);

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

  describe('#batchSwapExactIn', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should revert when not able to transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.WeiPerEther.mul(1500));

      await expect(
        poolProxyContractVegeta.batchSwapExactIn(
          [
            {
              pool: bPool1.address,
              tokenIn: dai.address,
              tokenOut: wEth.address,
              swapAmount: ethers.constants.WeiPerEther.mul(1500),
              limitReturnAmount: `${1e18}`,
              maxPrice: '666666666666666',
            },
          ],
          dai.address,
          wEth.address,
          ethers.constants.WeiPerEther.mul(1500),
          `${1e18}`,
        ),
      ).to.be.reverted;
    });

    it('should transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.MaxUint256);

      const vegetaBalanceBefore = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceBefore = await dai.balanceOf(kakarotoAddress);

      await poolProxyContractVegeta.batchSwapExactIn(
        [
          {
            pool: bPool1.address,
            tokenIn: dai.address,
            tokenOut: wEth.address,
            swapAmount: ethers.constants.WeiPerEther.mul(1500),
            limitReturnAmount: `${1e18}`,
            maxPrice: '666666666666666',
          },
        ],
        dai.address,
        wEth.address,
        ethers.constants.WeiPerEther.mul(1500),
        `${1e18}`,
      );

      const vegetaBalanceAfter = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceAfter = await dai.balanceOf(kakarotoAddress);

      // It only takes the fee from the user because pool.swapExactAmountIn is mocked
      expect(vegetaBalanceAfter).to.eq(vegetaBalanceBefore.sub(MOCKED_PROTOCOL_FEE_AMOUNT));
      expect(feeReceiverBalanceAfter).to.eq(feeReceiverBalanceBefore.add(MOCKED_PROTOCOL_FEE_AMOUNT));
    });
  });

  describe('#batchSwapExactOut', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should revert when not able to transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.WeiPerEther.mul(1500));

      await expect(
        poolProxyContractVegeta.batchSwapExactOut(
          [
            {
              pool: bPool1.address,
              tokenIn: dai.address,
              tokenOut: wEth.address,
              swapAmount: ethers.constants.WeiPerEther.mul(1500),
              limitReturnAmount: `${1e18}`,
              maxPrice: '666666666666666',
            },
          ],
          dai.address,
          wEth.address,
          ethers.constants.WeiPerEther.mul(1500),
        ),
      ).to.be.reverted;
    });

    it('should transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.MaxUint256);

      const vegetaBalanceBefore = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceBefore = await dai.balanceOf(kakarotoAddress);

      await poolProxyContractVegeta.batchSwapExactOut(
        [
          {
            pool: bPool1.address,
            tokenIn: dai.address,
            tokenOut: wEth.address,
            swapAmount: ethers.constants.WeiPerEther.mul(1500),
            limitReturnAmount: `${1e18}`,
            maxPrice: '666666666666666',
          },
        ],
        dai.address,
        wEth.address,
        ethers.constants.WeiPerEther.mul(1500),
      );

      const vegetaBalanceAfter = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceAfter = await dai.balanceOf(kakarotoAddress);

      // It only takes the fee from the user because pool.swapExactAmountIn is mocked
      expect(vegetaBalanceAfter).to.eq(vegetaBalanceBefore.sub(MOCKED_PROTOCOL_FEE_AMOUNT));
      expect(feeReceiverBalanceAfter).to.eq(feeReceiverBalanceBefore.add(MOCKED_PROTOCOL_FEE_AMOUNT));
    });
  });

  describe('#multihopBatchSwapExactIn', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should revert when not able to transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.WeiPerEther.mul(1500));

      await expect(
        poolProxyContractVegeta.multihopBatchSwapExactIn(
          [
            [
              {
                pool: bPool1.address,
                tokenIn: dai.address,
                tokenOut: wEth.address,
                swapAmount: ethers.constants.WeiPerEther.mul(1500),
                limitReturnAmount: `${1e18}`,
                maxPrice: '666666666666666',
              },
            ],
          ],
          dai.address,
          wEth.address,
          ethers.constants.WeiPerEther.mul(1500),
          `${1e18}`,
        ),
      ).to.be.reverted;
    });

    it('should transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.MaxUint256);

      const vegetaBalanceBefore = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceBefore = await dai.balanceOf(kakarotoAddress);

      await poolProxyContractVegeta.multihopBatchSwapExactIn(
        [
          [
            {
              pool: bPool1.address,
              tokenIn: dai.address,
              tokenOut: wEth.address,
              swapAmount: ethers.constants.WeiPerEther.mul(1500),
              limitReturnAmount: `${1e18}`,
              maxPrice: '666666666666666',
            },
          ],
        ],
        dai.address,
        wEth.address,
        ethers.constants.WeiPerEther.mul(1500),
        `${1e18}`,
      );

      const vegetaBalanceAfter = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceAfter = await dai.balanceOf(kakarotoAddress);

      // It only takes the fee from the user because pool.swapExactAmountIn is mocked
      expect(vegetaBalanceAfter).to.eq(vegetaBalanceBefore.sub(MOCKED_PROTOCOL_FEE_AMOUNT));
      expect(feeReceiverBalanceAfter).to.eq(feeReceiverBalanceBefore.add(MOCKED_PROTOCOL_FEE_AMOUNT));
    });
  });

  describe('#multihopBatchSwapExactOut', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should revert when not able to transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.WeiPerEther.mul(1500));

      await expect(
        poolProxyContractVegeta.multihopBatchSwapExactOut(
          [
            [
              {
                pool: bPool1.address,
                tokenIn: dai.address,
                tokenOut: wEth.address,
                swapAmount: ethers.constants.WeiPerEther.mul(1500),
                limitReturnAmount: `${1e18}`,
                maxPrice: '666666666666666',
              },
            ],
          ],
          dai.address,
          wEth.address,
          ethers.constants.WeiPerEther.mul(1500),
        ),
      ).to.be.reverted;
    });

    it('should transfer the protocol fee from the user to fee receiver', async () => {
      await daiVegeta.approve(poolProxyContract.address, ethers.constants.MaxUint256);

      const vegetaBalanceBefore = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceBefore = await dai.balanceOf(kakarotoAddress);

      await poolProxyContractVegeta.multihopBatchSwapExactOut(
        [
          [
            {
              pool: bPool1.address,
              tokenIn: dai.address,
              tokenOut: wEth.address,
              swapAmount: ethers.constants.WeiPerEther.mul(1500),
              limitReturnAmount: `${1e18}`,
              maxPrice: '666666666666666',
            },
          ],
        ],
        dai.address,
        wEth.address,
        ethers.constants.WeiPerEther.mul(1500),
      );

      const vegetaBalanceAfter = await dai.balanceOf(vegetaAddress);
      const feeReceiverBalanceAfter = await dai.balanceOf(kakarotoAddress);

      // It only takes the fee from the user because pool.swapExactAmountIn is mocked
      expect(vegetaBalanceAfter).to.eq(vegetaBalanceBefore.sub(MOCKED_PROTOCOL_FEE_AMOUNT));
      expect(feeReceiverBalanceAfter).to.eq(feeReceiverBalanceBefore.add(MOCKED_PROTOCOL_FEE_AMOUNT));
    });
  });
});
