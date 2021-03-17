import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { ProtocolFeeMock, BPoolMock, BPoolProxy, BRegistry, ERC20Detailed, XTokenWrapper } from '../typechain';
import Reverter from './utils/reverter';

let deployer: Signer;
let kakaroto: Signer;
let vegeta: Signer;

let deployerAddress: string;
let kakarotoAddress: string;
let vegetaAddress: string;

let poolProxyContract: BPoolProxy;
let poolProxyContractKakaroto: BPoolProxy;
let poolProxyContractVegeta: BPoolProxy;
let bRegistryContract: BRegistry;
let protocolFeeContract: ProtocolFeeMock;
let xTokenWrapperContract: XTokenWrapper;
let bPool1: BPoolMock;
let bPool2: BPoolMock;
let bPool3: BPoolMock;
let bPoolJoinExit: BPoolMock;

let dai: ERC20Detailed;
let wEth: ERC20Detailed;
let xLPT: ERC20Detailed;

let daiVegeta: ERC20Detailed;
let wEthVegeta: ERC20Detailed;
let xLPTVegeta: ERC20Detailed;

const MOCKED_PROTOCOL_FEE_AMOUNT = 10;

describe('BPoolProxy', function () {
  const reverter = new Reverter();

  before(async () => {
    [deployer, kakaroto, vegeta] = await ethers.getSigners();
    [deployerAddress, kakarotoAddress, vegetaAddress] = await Promise.all([
      deployer.getAddress(),
      kakaroto.getAddress(),
      vegeta.getAddress(),
    ]);
    // [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const BPoolProxyFactory = await ethers.getContractFactory('BPoolProxy');
    const BRegistryFactory = await ethers.getContractFactory('BRegistry');
    const ProtocolFeeFactory = await ethers.getContractFactory('ProtocolFeeMock');
    const BPoolMockFactory = await ethers.getContractFactory('BPoolMock');
    const ERC20Factory = await ethers.getContractFactory('ERC20Detailed');
    const XTokenWrapperFactory = await ethers.getContractFactory('XTokenWrapper');

    bRegistryContract = (await BRegistryFactory.deploy(ethers.constants.AddressZero)) as BRegistry;
    await bRegistryContract.deployed();

    protocolFeeContract = (await ProtocolFeeFactory.deploy(MOCKED_PROTOCOL_FEE_AMOUNT)) as ProtocolFeeMock;
    await protocolFeeContract.deployed();

    xTokenWrapperContract = (await XTokenWrapperFactory.deploy()) as XTokenWrapper;
    await xTokenWrapperContract.deployed();

    poolProxyContract = (await BPoolProxyFactory.deploy(
      bRegistryContract.address,
      protocolFeeContract.address,
      kakarotoAddress,
      xTokenWrapperContract.address,
    )) as BPoolProxy;
    await poolProxyContract.deployed();

    poolProxyContractKakaroto = poolProxyContract.connect(kakaroto);
    poolProxyContractVegeta = poolProxyContract.connect(vegeta);

    dai = (await ERC20Factory.deploy('Dai Stablecoin', 'DAI', 18)) as ERC20Detailed;
    await dai.deployed();
    wEth = (await ERC20Factory.deploy('Wrapped Ether', 'WETH', 18)) as ERC20Detailed;
    await wEth.deployed();

    bPool1 = (await BPoolMockFactory.deploy([])) as BPoolMock;
    await bPool1.deployed();
    bPool2 = (await BPoolMockFactory.deploy([])) as BPoolMock;
    await bPool2.deployed();
    bPool3 = (await BPoolMockFactory.deploy([])) as BPoolMock;
    await bPool3.deployed();

    await dai.mint(vegetaAddress, ethers.constants.WeiPerEther.mul(3000));
    await wEth.mint(poolProxyContract.address, `${10e18}`);

    daiVegeta = dai.connect(vegeta);
    wEthVegeta = wEth.connect(vegeta);

    // No need for it to be an actul xToken.
    // we just need to test that this is minted/burnt by the wrapper called from BPoolProxy
    xLPT = (await ERC20Factory.deploy('bPoolJoinExit xToken', 'XLPT', 18)) as ERC20Detailed;
    await xLPT.deployed();

    xLPTVegeta = xLPT.connect(vegeta);

    bPoolJoinExit = (await BPoolMockFactory.deploy([dai.address, wEth.address])) as BPoolMock;
    await bPoolJoinExit.deployed();

    await xTokenWrapperContract.setRegistryManager(deployerAddress);
    await xTokenWrapperContract.registerToken(bPoolJoinExit.address, xLPT.address);

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

  describe('#setXTokenWrapper', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setXTokenWrapper', async () => {
      await expect(poolProxyContractKakaroto.setXTokenWrapper(kakarotoAddress)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setXTokenWrapper with zero address', async () => {
      await expect(poolProxyContract.setXTokenWrapper(ethers.constants.AddressZero)).to.be.revertedWith(
        'xTokenWrapper is the zero address',
      );
    });

    it('owner shouldbe able to setXTokenWrapper non zero address', async () => {
      await poolProxyContract.setXTokenWrapper(kakarotoAddress);
      expect(await poolProxyContract.xTokenWrapper()).to.eq(kakarotoAddress);
    });
  });
  describe('swap', () => {
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

  describe('join/exit', () => {
    before(async () => {
      await dai.mint(bPoolJoinExit.address, ethers.constants.WeiPerEther.mul(3000));
      await wEth.mint(bPoolJoinExit.address, ethers.constants.WeiPerEther.mul(3000));
      await dai.mint(vegetaAddress, ethers.constants.WeiPerEther.mul(3000));
      await wEth.mint(vegetaAddress, ethers.constants.WeiPerEther.mul(3000));

      await daiVegeta.approve(poolProxyContractVegeta.address, ethers.constants.MaxUint256);
      await wEthVegeta.approve(poolProxyContractVegeta.address, ethers.constants.MaxUint256);
      await xLPTVegeta.approve(poolProxyContractVegeta.address, ethers.constants.MaxUint256);

      await reverter.snapshot();
    });

    describe('#joinPool', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('user should be able to call joinPool getting xLPT', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.joinPool(bPoolJoinExit.address, 10, [10, 10]);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore.sub(10));
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.sub(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.add(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.add(10));
      });

      it('user should be able to call joinPool getting xLPT and the remaining tokens back', async () => {
        await bPoolJoinExit.setExtactAmount(false);

        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.joinPool(bPoolJoinExit.address, 10, [10, 10]);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore.sub(9));
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.sub(9));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.add(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.add(10));
      });
    });

    describe('#exitPool', () => {
      beforeEach(async () => {
        await reverter.revert();
        await poolProxyContractVegeta.joinPool(bPoolJoinExit.address, 10, [10, 10]);
      });

      it('user should be able to call exitPool sending the xLPT and receiving exact tokens in exchange', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.exitPool(bPoolJoinExit.address, 10, [10, 10]);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore.add(10));
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.add(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.sub(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.sub(10));
      });
    });

    describe('#joinswapExternAmountIn', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('user should be able to call joinswapExternAmountIn getting xLPT', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        // join with 10 DAI an get at least 10 xLPT
        await poolProxyContractVegeta.joinswapExternAmountIn(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.sub(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.add(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.add(10));
      });
    });

    describe('#joinswapPoolAmountOut', () => {
      beforeEach(async () => {
        await reverter.revert();
      });

      it('user should be able to call joinswapPoolAmountOut getting xLPT', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        // join with 10 DAI an get at least 10 xLPT
        await poolProxyContractVegeta.joinswapPoolAmountOut(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.sub(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.add(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.add(10));
      });

      it('user should be able to call joinswapPoolAmountOut getting xLPT and the remaining tokens back', async () => {
        await bPoolJoinExit.setExtactAmount(false);

        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.joinswapPoolAmountOut(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.sub(9));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.add(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.add(10));
      });
    });

    describe('#exitswapPoolAmountIn', () => {
      beforeEach(async () => {
        await reverter.revert();
        await poolProxyContractVegeta.joinPool(bPoolJoinExit.address, 10, [10, 10]);
      });

      it('user should be able to call exitswapPoolAmountIn sending the xLPT and receiving dai in exchange', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.exitswapPoolAmountIn(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.add(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.sub(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.sub(10));
      });
    });

    describe('#exitswapExternAmountOut', () => {
      beforeEach(async () => {
        await reverter.revert();
        await poolProxyContractVegeta.joinPool(bPoolJoinExit.address, 10, [10, 10]);
      });

      it('user should be able to call exitswapPoolAmountIn sending the xLPT and receiving dai in exchange', async () => {
        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.exitswapExternAmountOut(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.add(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.sub(10));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.sub(10));
      });
      it('user should be able to call exitswapPoolAmountIn sending the xLPT, receiving dai in exchange and remining xLPT back', async () => {
        await bPoolJoinExit.setExtactAmount(false);

        const wEthBalanceBefore = await wEth.balanceOf(vegetaAddress);
        const daiBalanceBefore = await dai.balanceOf(vegetaAddress);
        const xlpBalanceBefore = await xLPT.balanceOf(vegetaAddress);
        const lptBalanceWrapperBefore = await bPoolJoinExit.balanceOf(xTokenWrapperContract.address);

        await poolProxyContractVegeta.exitswapExternAmountOut(bPoolJoinExit.address, dai.address, 10, 10);

        expect(await wEth.balanceOf(vegetaAddress)).to.eq(wEthBalanceBefore);
        expect(await dai.balanceOf(vegetaAddress)).to.eq(daiBalanceBefore.add(10));
        expect(await xLPT.balanceOf(vegetaAddress)).to.eq(xlpBalanceBefore.sub(9));
        expect(await bPoolJoinExit.balanceOf(xTokenWrapperContract.address)).to.eq(lptBalanceWrapperBefore.sub(9));
      });
    });
  });
});
