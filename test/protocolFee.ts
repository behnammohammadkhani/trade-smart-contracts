import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { ProtocolFee, BPoolSwapFeeMock } from '../typechain';
import Reverter from './utils/reverter';

// let deployer: Signer;
let kakaroto: Signer;

let protocolFeeContract: ProtocolFee;
let protocolFeeContractKakaroto: ProtocolFee;
let bPool1: BPoolSwapFeeMock;
let bPool2: BPoolSwapFeeMock;
let bPool3: BPoolSwapFeeMock;

const ONE = ethers.constants.WeiPerEther;
const MIN_FEE = ONE.div(1e6); // 0.0001%
const MAX_FEE = ONE.div(2); // 50%

describe('ProtocolFee', function () {
  const reverter = new Reverter();

  before(async () => {
    [, kakaroto] = await ethers.getSigners();
    // [deployerAddress] = await Promise.all([deployer.getAddress()]);

    const ProtocolFeeFactory = await ethers.getContractFactory('ProtocolFee');
    const BPoolSwapFeeMockFactory = await ethers.getContractFactory('BPoolSwapFeeMock');

    // 10^18  = 100%
    // 20% = 20*10^18/100 = 2 * 10^17
    // 0.05% = 0.05*10^18/100 = 500000000000000
    protocolFeeContract = (await ProtocolFeeFactory.deploy(`${2e17}`, `${5e14}`)) as ProtocolFee;
    await protocolFeeContract.deployed();

    protocolFeeContractKakaroto = protocolFeeContract.connect(kakaroto);

    // 1% = 1*10^18/100 = 4e15
    bPool1 = (await BPoolSwapFeeMockFactory.deploy(`${1e16}`)) as BPoolSwapFeeMock;
    await bPool1.deployed();
    // 0.1% = 0.1*10^18/100 = 1000000000000000
    bPool2 = (await BPoolSwapFeeMockFactory.deploy(`${1e15}`)) as BPoolSwapFeeMock;
    await bPool2.deployed();
    // 0.3% = 0.3*10^18/100 = 3e15
    bPool3 = (await BPoolSwapFeeMockFactory.deploy(`${3e15}`)) as BPoolSwapFeeMock;
    await bPool3.deployed();

    await reverter.snapshot();
  });

  describe('#setProtocolFee', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setProtocolFee', async () => {
      await expect(protocolFeeContractKakaroto.setProtocolFee(`${1e17}`)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setProtocolFee lower than the min', async () => {
      await expect(protocolFeeContract.setProtocolFee(MIN_FEE.sub(1))).to.be.revertedWith('ERR_MIN_FEE');
    });

    it('owner should not be able to setProtocolFee higher than the max', async () => {
      await expect(protocolFeeContract.setProtocolFee(MAX_FEE.add(1))).to.be.revertedWith('ERR_MAX_FEE');
    });

    it('owner shouldbe able to setProtocolFee to the min', async () => {
      await protocolFeeContract.setProtocolFee(MIN_FEE);
      expect(await protocolFeeContract.protocolFee()).to.eq(MIN_FEE);
    });

    it('owner shouldbe able to setProtocolFee to the max', async () => {
      await protocolFeeContract.setProtocolFee(MAX_FEE);
      expect(await protocolFeeContract.protocolFee()).to.eq(MAX_FEE);
    });

    it('owner shouldbe able to setProtocolFee between min and max', async () => {
      await protocolFeeContract.setProtocolFee(MAX_FEE.sub(10));
      expect(await protocolFeeContract.protocolFee()).to.eq(MAX_FEE.sub(10));
    });
  });

  describe('#setMinProtocolFee', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('non owner should not be able to execute setMinProtocolFee', async () => {
      await expect(protocolFeeContractKakaroto.setMinProtocolFee(`${1e17}`)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to setMinProtocolFee lower than the min', async () => {
      await expect(protocolFeeContract.setMinProtocolFee(MIN_FEE.sub(1))).to.be.revertedWith('ERR_MIN_MIN_FEE');
    });

    it('owner should not be able to setMinProtocolFee higher than the max', async () => {
      await expect(protocolFeeContract.setMinProtocolFee(MAX_FEE.add(1))).to.be.revertedWith('ERR_MAX_MIN_FEE');
    });

    it('owner shouldbe able to setMinProtocolFee to the min', async () => {
      await protocolFeeContract.setMinProtocolFee(MIN_FEE);
      expect(await protocolFeeContract.minProtocolFee()).to.eq(MIN_FEE);
    });

    it('owner shouldbe able to setMinProtocolFee to the max', async () => {
      await protocolFeeContract.setMinProtocolFee(MAX_FEE);
      expect(await protocolFeeContract.minProtocolFee()).to.eq(MAX_FEE);
    });

    it('owner shouldbe able to setMinProtocolFee between min and max', async () => {
      await protocolFeeContract.setMinProtocolFee(MAX_FEE.sub(10));
      expect(await protocolFeeContract.minProtocolFee()).to.eq(MAX_FEE.sub(10));
    });
  });

  describe('#batchFee', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should get the 20% of the swap fees', async () => {
      //            | fee % | amount in | pool fee amount | Protocol Fee
      // Pool1 A/B	| 1     | 4         | 0.04            |
      // Pool2 A/B	| 0.1   | 6         | 0.006           |
      // Pool3 A/B	| 0.3   | 5         | 0.015           |
      // Total		  |       | 15        | 0.061           | 0.0122
      // Min 0.05%                                        | 0.0075

      const feeAmount = await protocolFeeContract.batchFee(
        [
          {
            pool: bPool1.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${4e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
          {
            pool: bPool2.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${6e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
          {
            pool: bPool3.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${5e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
        ],
        `${15e8}`,
      );

      // 0.0122 = 0.0122*10^8 = 1220000
      expect(feeAmount).to.eq('1220000');
    });

    it('should get the MIN protocol fee when is greater than protocol fee', async () => {
      // 0.4% = 0.4*10^18/100 = 4e15
      await bPool1.setSwapFee(`${4e15}`);

      //            | fee % | amount in | pool fee amount | Protocol Fee
      // Pool1 A/B	| 0.4   | 4         | 0.016           |
      // Pool2 A/B	| 0.1   | 6         | 0.006           |
      // Pool3 A/B	| 0.3   | 5         | 0.015           |
      // Total		  |       | 15        | 0.037           | 0.0074
      // Min 0.05%                                        | 0.0075

      const feeAmount = await protocolFeeContract.batchFee(
        [
          {
            pool: bPool1.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${4e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
          {
            pool: bPool2.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${6e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
          {
            pool: bPool3.address,
            tokenIn: ethers.constants.AddressZero,
            tokenOut: ethers.constants.AddressZero,
            swapAmount: `${5e8}`,
            limitReturnAmount: 0,
            maxPrice: 0,
          },
        ],
        `${15e8}`,
      );

      // 0.0075 = 0.0075*10^8 = 750000
      expect(feeAmount).to.eq('750000');
    });
  });

  describe('#multihopBatch', () => {
    beforeEach(async () => {
      await reverter.revert();
    });

    it('should get the 20% of the swap fees', async () => {
      // ************** Swap A for D using Pools in Serie **************
      //            | fee % | amount in | pool fee amount | Protocol Fee
      // Pool1 A/B	| 1     | 15        | 0.15            |
      // Pool2 A/B	| 0.1   | 14.85     | 0.01485         |
      // Pool3 A/B	| 0.3   | 14.83515  | 0.04450545      |
      // Total		  |       |           | 0.20935545      | 0.04187109
      // Min 0.05%                                        | 0.0075

      const feeAmount = await protocolFeeContract.multihopBatch(
        [
          [
            {
              pool: bPool1.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${15e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
            {
              pool: bPool2.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${6e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
            {
              pool: bPool3.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${5e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
          ],
        ],
        `${15e8}`,
      );

      // 0.04187109 = 0.04187109*10^8 = 4187109
      expect(feeAmount).to.eq('4187109');
    });

    it('should get the MIN protocol fee when is greater than protocol fee', async () => {
      // 0.4% = 0.01*10^18/100 = 4e15
      await bPool1.setSwapFee(`${1e14}`);
      // 0.4% = 0.01*10^18/100 = 1e15
      await bPool2.setSwapFee(`${1e15}`);
      // 0.4% = 0.01*10^18/100 = 1e15
      await bPool3.setSwapFee(`${1e15}`);

      /// ************** Swap A for D using Pools in Serie **************
      //            | fee % | amount in | pool fee amount | Protocol Fee
      // Pool1 A/B	| 0.01  | 15        | 0.0015          |
      // Pool2 A/B	| 0.1   | 14.9985   | 0.0149985       |
      // Pool3 A/B	| 0.3   | 14.9835015| 0.0149835015    |
      // Total		  |       |           | 0.0314820015    | 0.0062964003
      // Min 0.05%                                        | 0.0075

      const feeAmount = await protocolFeeContract.multihopBatch(
        [
          [
            {
              pool: bPool1.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${15e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
            {
              pool: bPool2.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${6e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
            {
              pool: bPool3.address,
              tokenIn: ethers.constants.AddressZero,
              tokenOut: ethers.constants.AddressZero,
              swapAmount: `${5e8}`,
              limitReturnAmount: 0,
              maxPrice: 0,
            },
          ],
        ],
        `${15e8}`,
      );

      // 0.0075 = 0.0075*10^8 = 750000
      expect(feeAmount).to.eq('750000');
    });
  });
});
