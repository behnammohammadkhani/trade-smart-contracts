//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBPool.sol";
import "./IProtocolFee.sol";

import "hardhat/console.sol";

contract ProtocolFee is Ownable, IProtocolFee {
    using SafeMath for uint256;

    uint256 public constant ONE = 10**18;
    uint256 public constant MIN_FEE = ONE / 10**6; // 0.0001%
    uint256 public constant MAX_FEE = ONE / 2; // 50%

    uint256 public protocolFee;
    uint256 public minProtocolFee;

    event ProtocolFeeSetted(uint256 protocolFee);

    event MinProtocolFeeSetted(uint256 minProtocolFee);

    constructor(uint256 _protocolFee, uint256 _minProtocolFee) public {
        _setProtocolFee(_protocolFee);
        _setMinProtocolFee(_minProtocolFee);
    }

    function setProtocolFee(uint256 _protocolFee) external onlyOwner {
        _setProtocolFee(_protocolFee);
    }

    function setMinProtocolFee(uint256 _minProtocolFee) external onlyOwner {
        _setMinProtocolFee(_minProtocolFee);
    }

    function _setProtocolFee(uint256 _protocolFee) internal {
        require(_protocolFee >= MIN_FEE, "ERR_MIN_FEE");
        require(_protocolFee <= MAX_FEE, "ERR_MAX_FEE");
        emit ProtocolFeeSetted(_protocolFee);
        protocolFee = _protocolFee;
    }

    function _setMinProtocolFee(uint256 _minProtocolFee) internal {
        require(_minProtocolFee >= MIN_FEE, "ERR_MIN_MIN_FEE");
        require(_minProtocolFee <= MAX_FEE, "ERR_MAX_MIN_FEE");
        emit MinProtocolFeeSetted(_minProtocolFee);
        minProtocolFee = _minProtocolFee;
    }

    function batchFee(Swap[] memory swaps, uint256 totalAmountIn) public view override returns (uint256) {
        uint256 feeAmount = 0;

        for (uint256 i = 0; i < swaps.length; i++) {
            feeAmount = feeAmount.add(getProtocolFeeAmount(getPoolFeeAmount(swaps[i].pool, swaps[i].swapAmount)));
        }

        return Math.max(feeAmount, minProtocolFee.mul(totalAmountIn).div(ONE));
    }

    function multihopBatch(Swap[][] memory swapSequences, uint256 totalAmountIn)
        public
        view
        override
        returns (uint256)
    {
        uint256 toatlSwapFeeAmount = 0;

        for (uint256 i = 0; i < swapSequences.length; i++) {
            // Considering that the outgoing value is equivalent to the incoming less the pool fee,
            // all the amounts are expressed in A to be able to calculate the equivalent total fee.
            // So the swapAmount[i][k] = swapAmount[i][k-1] - swapFee[i][k-1]
            uint256 totalSequenceIn = swapSequences[i][0].swapAmount;

            for (uint256 k = 0; k < swapSequences[i].length; k++) {
                uint256 poolFeeAmount = getPoolFeeAmount(swapSequences[i][k].pool, totalSequenceIn);
                toatlSwapFeeAmount = toatlSwapFeeAmount.add(poolFeeAmount);
                totalSequenceIn = totalSequenceIn.sub(poolFeeAmount);
            }
        }

        return Math.max(getProtocolFeeAmount(toatlSwapFeeAmount), minProtocolFee.mul(totalAmountIn).div(ONE));
    }

    function getProtocolFeeAmount(uint256 poolFeeAmount) internal view returns (uint256) {
        return protocolFee.mul(poolFeeAmount).div(ONE);
    }

    function getPoolFeeAmount(address pool, uint256 swapAmount) internal view returns (uint256) {
        IBPool bPool = IBPool(pool);
        uint256 swapFee = bPool.getSwapFee();
        return swapFee.mul(swapAmount).div(ONE);
    }
}
