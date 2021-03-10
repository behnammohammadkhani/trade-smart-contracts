//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Holder.sol";
import "../token/IXToken.sol";
import "../token/IXTokenWrapper.sol";
import "./ISwap.sol";
import "./IBPool.sol";
import "./IBRegistry.sol";
import "./IProtocolFee.sol";

import "hardhat/console.sol";

/**
 * @title BPoolProxy
 * @author Protofire
 * @dev Forwarding proxy that allows users to batch execute swaps.
 *
 * This code is based on Balancer ExchangeProxy contract
 * https://docs.balancer.finance/smart-contracts/exchange-proxy
 * (https://etherscan.io/address/0x3E66B66Fd1d0b02fDa6C811Da9E0547970DB2f21#code)
 */
contract BPoolProxy is Ownable, ISwap, ERC1155Holder {
    using SafeMath for uint256;

    struct Pool {
        address pool;
        uint256 tokenBalanceIn;
        uint256 tokenWeightIn;
        uint256 tokenBalanceOut;
        uint256 tokenWeightOut;
        uint256 swapFee;
        uint256 effectiveLiquidity;
    }

    uint256 private constant BONE = 10**18;

    IBRegistry public registry;
    IProtocolFee public protocolFee;
    IXTokenWrapper public xTokenWrapper;
    address public feeReceiver;

    event RegistrySetted(address registry);

    event ProtocolFeeSetted(address protocolFee);

    event FeeReceiverSetted(address feeReceiver);

    event XTokenWrapperSetted(address xTokenWrapper);

    constructor(
        address _registry,
        address _protocolFee,
        address _feeReceiver,
        address _xTokenWrapper
    ) public {
        _setRegistry(_registry);
        _setProtocolFee(_protocolFee);
        _setFeeReceiver(_feeReceiver);
        _setXTokenWrapper(_xTokenWrapper);
    }

    function setRegistry(address _registry) external onlyOwner {
        _setRegistry(_registry);
    }

    function setProtocolFee(address _protocolFee) external onlyOwner {
        _setProtocolFee(_protocolFee);
    }

    function setFeeReceiver(address _feeReceiver) external onlyOwner {
        _setFeeReceiver(_feeReceiver);
    }

    function setXTokenWrapper(address _xTokenWrapper) external onlyOwner {
        _setXTokenWrapper(_xTokenWrapper);
    }

    function _setRegistry(address _registry) internal {
        require(_registry != address(0), "registry is the zero address");
        emit RegistrySetted(_registry);
        registry = IBRegistry(_registry);
    }

    function _setProtocolFee(address _protocolFee) internal {
        require(_protocolFee != address(0), "protocolFee is the zero address");
        emit ProtocolFeeSetted(_protocolFee);
        protocolFee = IProtocolFee(_protocolFee);
    }

    function _setFeeReceiver(address _feeReceiver) internal {
        require(_feeReceiver != address(0), "feeReceiver is the zero address");
        emit FeeReceiverSetted(_feeReceiver);
        feeReceiver = _feeReceiver;
    }

    function _setXTokenWrapper(address _xTokenWrapper) internal {
        require(_xTokenWrapper != address(0), "xTokenWrapper is the zero address");
        emit FeeReceiverSetted(_xTokenWrapper);
        xTokenWrapper = IXTokenWrapper(_xTokenWrapper);
    }

    function batchSwapExactIn(
        Swap[] memory swaps,
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 totalAmountIn,
        uint256 minTotalAmountOut
    ) public returns (uint256 totalAmountOut) {
        transferFrom(tokenIn, totalAmountIn);

        for (uint256 i = 0; i < swaps.length; i++) {
            Swap memory swap = swaps[i];
            IXToken swapTokenIn = IXToken(swap.tokenIn);
            IBPool pool = IBPool(swap.pool);

            if (swapTokenIn.allowance(address(this), swap.pool) > 0) {
                swapTokenIn.approve(swap.pool, 0);
            }
            swapTokenIn.approve(swap.pool, swap.swapAmount);

            (uint256 tokenAmountOut, ) =
                pool.swapExactAmountIn(
                    swap.tokenIn,
                    swap.swapAmount,
                    swap.tokenOut,
                    swap.limitReturnAmount,
                    swap.maxPrice
                );
            totalAmountOut = tokenAmountOut.add(totalAmountOut);
        }

        require(totalAmountOut >= minTotalAmountOut, "ERR_LIMIT_OUT");

        transferFeeFrom(tokenIn, protocolFee.batchFee(swaps, totalAmountIn));

        transfer(tokenOut, totalAmountOut);
        transfer(tokenIn, getBalance(tokenIn));
    }

    function batchSwapExactOut(
        Swap[] memory swaps,
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 maxTotalAmountIn
    ) public returns (uint256 totalAmountIn) {
        transferFrom(tokenIn, maxTotalAmountIn);

        for (uint256 i = 0; i < swaps.length; i++) {
            Swap memory swap = swaps[i];
            IXToken swapTokenIn = IXToken(swap.tokenIn);
            IBPool pool = IBPool(swap.pool);

            if (swapTokenIn.allowance(address(this), swap.pool) > 0) {
                swapTokenIn.approve(swap.pool, 0);
            }
            swapTokenIn.approve(swap.pool, swap.limitReturnAmount);

            (uint256 tokenAmountIn, ) =
                pool.swapExactAmountOut(
                    swap.tokenIn,
                    swap.limitReturnAmount,
                    swap.tokenOut,
                    swap.swapAmount,
                    swap.maxPrice
                );
            totalAmountIn = tokenAmountIn.add(totalAmountIn);
        }
        require(totalAmountIn <= maxTotalAmountIn, "ERR_LIMIT_IN");

        transferFeeFrom(tokenIn, protocolFee.batchFee(swaps, totalAmountIn));

        transfer(tokenOut, getBalance(tokenOut));
        transfer(tokenIn, getBalance(tokenIn));
    }

    function multihopBatchSwapExactIn(
        Swap[][] memory swapSequences,
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 totalAmountIn,
        uint256 minTotalAmountOut
    ) public returns (uint256 totalAmountOut) {
        transferFrom(tokenIn, totalAmountIn);

        for (uint256 i = 0; i < swapSequences.length; i++) {
            uint256 tokenAmountOut;
            for (uint256 k = 0; k < swapSequences[i].length; k++) {
                Swap memory swap = swapSequences[i][k];
                IXToken swapTokenIn = IXToken(swap.tokenIn);
                if (k == 1) {
                    // Makes sure that on the second swap the output of the first was used
                    // so there is not intermediate token leftover
                    swap.swapAmount = tokenAmountOut;
                }

                IBPool pool = IBPool(swap.pool);
                if (swapTokenIn.allowance(address(this), swap.pool) > 0) {
                    swapTokenIn.approve(swap.pool, 0);
                }
                swapTokenIn.approve(swap.pool, swap.swapAmount);
                (tokenAmountOut, ) = pool.swapExactAmountIn(
                    swap.tokenIn,
                    swap.swapAmount,
                    swap.tokenOut,
                    swap.limitReturnAmount,
                    swap.maxPrice
                );
            }
            // This takes the amountOut of the last swap
            totalAmountOut = tokenAmountOut.add(totalAmountOut);
        }

        require(totalAmountOut >= minTotalAmountOut, "ERR_LIMIT_OUT");

        transferFeeFrom(tokenIn, protocolFee.multihopBatch(swapSequences, totalAmountIn));

        transfer(tokenOut, totalAmountOut);
        transfer(tokenIn, getBalance(tokenIn));
    }

    function multihopBatchSwapExactOut(
        Swap[][] memory swapSequences,
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 maxTotalAmountIn
    ) public returns (uint256 totalAmountIn) {
        transferFrom(tokenIn, maxTotalAmountIn);

        for (uint256 i = 0; i < swapSequences.length; i++) {
            uint256 tokenAmountInFirstSwap;
            // Specific code for a simple swap and a multihop (2 swaps in sequence)
            if (swapSequences[i].length == 1) {
                Swap memory swap = swapSequences[i][0];
                IXToken swapTokenIn = IXToken(swap.tokenIn);

                IBPool pool = IBPool(swap.pool);
                if (swapTokenIn.allowance(address(this), swap.pool) > 0) {
                    swapTokenIn.approve(swap.pool, 0);
                }
                swapTokenIn.approve(swap.pool, swap.limitReturnAmount);

                (tokenAmountInFirstSwap, ) = pool.swapExactAmountOut(
                    swap.tokenIn,
                    swap.limitReturnAmount,
                    swap.tokenOut,
                    swap.swapAmount,
                    swap.maxPrice
                );
            } else {
                // Consider we are swapping A -> B and B -> C. The goal is to buy a given amount
                // of token C. But first we need to buy B with A so we can then buy C with B
                // To get the exact amount of C we then first need to calculate how much B we'll need:
                uint256 intermediateTokenAmount; // This would be token B as described above
                Swap memory secondSwap = swapSequences[i][1];
                IBPool poolSecondSwap = IBPool(secondSwap.pool);
                intermediateTokenAmount = poolSecondSwap.calcInGivenOut(
                    poolSecondSwap.getBalance(secondSwap.tokenIn),
                    poolSecondSwap.getDenormalizedWeight(secondSwap.tokenIn),
                    poolSecondSwap.getBalance(secondSwap.tokenOut),
                    poolSecondSwap.getDenormalizedWeight(secondSwap.tokenOut),
                    secondSwap.swapAmount,
                    poolSecondSwap.getSwapFee()
                );

                //// Buy intermediateTokenAmount of token B with A in the first pool
                Swap memory firstSwap = swapSequences[i][0];
                IXToken firstswapTokenIn = IXToken(firstSwap.tokenIn);
                IBPool poolFirstSwap = IBPool(firstSwap.pool);
                if (firstswapTokenIn.allowance(address(this), firstSwap.pool) < uint256(-1)) {
                    firstswapTokenIn.approve(firstSwap.pool, uint256(-1));
                }

                (tokenAmountInFirstSwap, ) = poolFirstSwap.swapExactAmountOut(
                    firstSwap.tokenIn,
                    firstSwap.limitReturnAmount,
                    firstSwap.tokenOut,
                    intermediateTokenAmount, // This is the amount of token B we need
                    firstSwap.maxPrice
                );

                //// Buy the final amount of token C desired
                IXToken secondswapTokenIn = IXToken(secondSwap.tokenIn);
                if (secondswapTokenIn.allowance(address(this), secondSwap.pool) < uint256(-1)) {
                    secondswapTokenIn.approve(secondSwap.pool, uint256(-1));
                }

                poolSecondSwap.swapExactAmountOut(
                    secondSwap.tokenIn,
                    secondSwap.limitReturnAmount,
                    secondSwap.tokenOut,
                    secondSwap.swapAmount,
                    secondSwap.maxPrice
                );
            }
            totalAmountIn = tokenAmountInFirstSwap.add(totalAmountIn);
        }

        require(totalAmountIn <= maxTotalAmountIn, "ERR_LIMIT_IN");

        transferFeeFrom(tokenIn, protocolFee.multihopBatch(swapSequences, totalAmountIn));

        transfer(tokenOut, getBalance(tokenOut));
        transfer(tokenIn, getBalance(tokenIn));
    }

    function smartSwapExactIn(
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 totalAmountIn,
        uint256 minTotalAmountOut,
        uint256 nPools
    ) public returns (uint256 totalAmountOut) {
        Swap[] memory swaps;
        (swaps, ) = viewSplitExactIn(address(tokenIn), address(tokenOut), totalAmountIn, nPools);

        totalAmountOut = batchSwapExactIn(swaps, tokenIn, tokenOut, totalAmountIn, minTotalAmountOut);
    }

    function smartSwapExactOut(
        IXToken tokenIn,
        IXToken tokenOut,
        uint256 totalAmountOut,
        uint256 maxTotalAmountIn,
        uint256 nPools
    ) public returns (uint256 totalAmountIn) {
        Swap[] memory swaps;
        (swaps, ) = viewSplitExactOut(address(tokenIn), address(tokenOut), totalAmountOut, nPools);

        totalAmountIn = batchSwapExactOut(swaps, tokenIn, tokenOut, maxTotalAmountIn);
    }

    function joinPool(
        address pool,
        uint256 poolAmountOut,
        uint256[] calldata maxAmountsIn
    ) public {
        address[] memory tokens = IBPool(pool).getCurrentTokens();

        // pull xTokens
        for (uint256 i = 0; i < tokens.length; i++) {
            transferFrom(IXToken(tokens[i]), maxAmountsIn[i]);
            IXToken(tokens[i]).approve(pool, maxAmountsIn[i]);
        }

        IBPool(pool).joinPool(poolAmountOut, maxAmountsIn);

        // push remaining xTokens
        for (uint256 i = 0; i < tokens.length; i++) {
            transfer(IXToken(tokens[i]), getBalance(IXToken(tokens[i])));
        }

        // Wrap balancer liquidity tokens into its representing xToken
        require(xTokenWrapper.wrap(pool, poolAmountOut), "ERR_WRAP_POOL");

        transfer(IXToken(xTokenWrapper.tokenToXToken(pool)), poolAmountOut);
    }

    function exitPool(
        address pool,
        uint256 poolAmountIn,
        uint256[] calldata minAmountsOut
    ) external {
        address wrappedLPT = xTokenWrapper.tokenToXToken(pool);

        // pull wrapped liquitity tokens
        transferFrom(IXToken(wrappedLPT), poolAmountIn);

        // unwrap wrapped liquitity tokens
        require(xTokenWrapper.unwrap(wrappedLPT, poolAmountIn), "ERR_UNWRAP_POOL");

        // LPT do not need to be approved when exit
        IBPool(pool).exitPool(poolAmountIn, minAmountsOut);

        // push xTokens
        address[] memory tokens = IBPool(pool).getCurrentTokens();
        for (uint256 i = 0; i < tokens.length; i++) {
            transfer(IXToken(tokens[i]), getBalance(IXToken(tokens[i])));
        }
    }

    function joinswapExternAmountIn(
        address pool,
        address tokenIn,
        uint256 tokenAmountIn,
        uint256 minPoolAmountOut
    ) external returns (uint256 poolAmountOut) {
        // pull xToken
        transferFrom(IXToken(tokenIn), tokenAmountIn);
        IXToken(tokenIn).approve(pool, tokenAmountIn);

        poolAmountOut = IBPool(pool).joinswapExternAmountIn(tokenIn, tokenAmountIn, minPoolAmountOut);

        // push remaining xTokens
        transfer(IXToken(tokenIn), getBalance(IXToken(tokenIn)));

        // Wrap balancer liquidity tokens into its representing xToken
        require(xTokenWrapper.wrap(pool, poolAmountOut), "ERR_WRAP_POOL");

        transfer(IXToken(xTokenWrapper.tokenToXToken(pool)), poolAmountOut);
    }

    function joinswapPoolAmountOut(
        address pool,
        address tokenIn,
        uint256 poolAmountOut,
        uint256 maxAmountIn
    ) external returns (uint256 tokenAmountIn) {
        // pull xToken
        transferFrom(IXToken(tokenIn), maxAmountIn);
        IXToken(tokenIn).approve(pool, maxAmountIn);

        tokenAmountIn = IBPool(pool).joinswapPoolAmountOut(tokenIn, poolAmountOut, maxAmountIn);

        // push remaining xTokens
        transfer(IXToken(tokenIn), getBalance(IXToken(tokenIn)));

        // Wrap balancer liquidity tokens into its representing xToken
        require(xTokenWrapper.wrap(pool, poolAmountOut), "ERR_WRAP_POOL");

        transfer(IXToken(xTokenWrapper.tokenToXToken(pool)), poolAmountOut);
    }

    function exitswapPoolAmountIn(
        address pool,
        address tokenOut,
        uint256 poolAmountIn,
        uint256 minAmountOut
    ) external returns (uint256 tokenAmountOut) {
        address wrappedLPT = xTokenWrapper.tokenToXToken(pool);

        // pull wrapped liquitity tokens
        transferFrom(IXToken(wrappedLPT), poolAmountIn);

        // unwrap wrapped liquitity tokens
        require(xTokenWrapper.unwrap(wrappedLPT, poolAmountIn), "ERR_UNWRAP_POOL");

        // LPT do not need to be approved when exit
        tokenAmountOut = IBPool(pool).exitswapPoolAmountIn(tokenOut, poolAmountIn, minAmountOut);

        // push xToken
        transfer(IXToken(tokenOut), tokenAmountOut);
    }

    function exitswapExternAmountOut(
        address pool,
        address tokenOut,
        uint256 tokenAmountOut,
        uint256 maxPoolAmountIn
    ) external returns (uint256 poolAmountIn) {
        address wrappedLPT = xTokenWrapper.tokenToXToken(pool);

        // pull wrapped liquitity tokens
        transferFrom(IXToken(wrappedLPT), maxPoolAmountIn);

        // unwrap wrapped liquitity tokens
        require(xTokenWrapper.unwrap(wrappedLPT, maxPoolAmountIn), "ERR_UNWRAP_POOL");

        // LPT do not need to be approved when exit
        poolAmountIn = IBPool(pool).exitswapExternAmountOut(tokenOut, tokenAmountOut, maxPoolAmountIn);

        // push xToken
        transfer(IXToken(tokenOut), tokenAmountOut);

        uint256 remainingLPT = maxPoolAmountIn.sub(poolAmountIn);
        if (remainingLPT > 0) {
            // Wrap remaining balancer liquidity tokens into its representing xToken
            require(xTokenWrapper.wrap(pool, remainingLPT), "ERR_WRAP_POOL");

            transfer(IXToken(wrappedLPT), remainingLPT);
        }
    }

    function viewSplitExactIn(
        address tokenIn,
        address tokenOut,
        uint256 swapAmount,
        uint256 nPools
    ) public view returns (Swap[] memory swaps, uint256 totalOutput) {
        address[] memory poolAddresses = registry.getBestPoolsWithLimit(tokenIn, tokenOut, nPools);

        Pool[] memory pools = new Pool[](poolAddresses.length);
        uint256 sumEffectiveLiquidity;
        for (uint256 i = 0; i < poolAddresses.length; i++) {
            pools[i] = getPoolData(tokenIn, tokenOut, poolAddresses[i]);
            sumEffectiveLiquidity = sumEffectiveLiquidity.add(pools[i].effectiveLiquidity);
        }

        uint256[] memory bestInputAmounts = new uint256[](pools.length);
        uint256 totalInputAmount;
        for (uint256 i = 0; i < pools.length; i++) {
            bestInputAmounts[i] = swapAmount.mul(pools[i].effectiveLiquidity).div(sumEffectiveLiquidity);
            totalInputAmount = totalInputAmount.add(bestInputAmounts[i]);
        }

        if (totalInputAmount < swapAmount) {
            bestInputAmounts[0] = bestInputAmounts[0].add(swapAmount.sub(totalInputAmount));
        } else {
            bestInputAmounts[0] = bestInputAmounts[0].sub(totalInputAmount.sub(swapAmount));
        }

        swaps = new Swap[](pools.length);

        for (uint256 i = 0; i < pools.length; i++) {
            swaps[i] = Swap({
                pool: pools[i].pool,
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                swapAmount: bestInputAmounts[i],
                limitReturnAmount: 0,
                maxPrice: uint256(-1)
            });
        }

        totalOutput = calcTotalOutExactIn(bestInputAmounts, pools);

        return (swaps, totalOutput);
    }

    function viewSplitExactOut(
        address tokenIn,
        address tokenOut,
        uint256 swapAmount,
        uint256 nPools
    ) public view returns (Swap[] memory swaps, uint256 totalOutput) {
        address[] memory poolAddresses = registry.getBestPoolsWithLimit(tokenIn, tokenOut, nPools);

        Pool[] memory pools = new Pool[](poolAddresses.length);
        uint256 sumEffectiveLiquidity;
        for (uint256 i = 0; i < poolAddresses.length; i++) {
            pools[i] = getPoolData(tokenIn, tokenOut, poolAddresses[i]);
            sumEffectiveLiquidity = sumEffectiveLiquidity.add(pools[i].effectiveLiquidity);
        }

        uint256[] memory bestInputAmounts = new uint256[](pools.length);
        uint256 totalInputAmount;
        for (uint256 i = 0; i < pools.length; i++) {
            bestInputAmounts[i] = swapAmount.mul(pools[i].effectiveLiquidity).div(sumEffectiveLiquidity);
            totalInputAmount = totalInputAmount.add(bestInputAmounts[i]);
        }

        if (totalInputAmount < swapAmount) {
            bestInputAmounts[0] = bestInputAmounts[0].add(swapAmount.sub(totalInputAmount));
        } else {
            bestInputAmounts[0] = bestInputAmounts[0].sub(totalInputAmount.sub(swapAmount));
        }

        swaps = new Swap[](pools.length);

        for (uint256 i = 0; i < pools.length; i++) {
            swaps[i] = Swap({
                pool: pools[i].pool,
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                swapAmount: bestInputAmounts[i],
                limitReturnAmount: uint256(-1),
                maxPrice: uint256(-1)
            });
        }

        totalOutput = calcTotalOutExactOut(bestInputAmounts, pools);

        return (swaps, totalOutput);
    }

    function getPoolData(
        address tokenIn,
        address tokenOut,
        address poolAddress
    ) internal view returns (Pool memory) {
        IBPool pool = IBPool(poolAddress);
        uint256 tokenBalanceIn = pool.getBalance(tokenIn);
        uint256 tokenBalanceOut = pool.getBalance(tokenOut);
        uint256 tokenWeightIn = pool.getDenormalizedWeight(tokenIn);
        uint256 tokenWeightOut = pool.getDenormalizedWeight(tokenOut);
        uint256 swapFee = pool.getSwapFee();

        uint256 effectiveLiquidity = calcEffectiveLiquidity(tokenWeightIn, tokenBalanceOut, tokenWeightOut);
        Pool memory returnPool =
            Pool({
                pool: poolAddress,
                tokenBalanceIn: tokenBalanceIn,
                tokenWeightIn: tokenWeightIn,
                tokenBalanceOut: tokenBalanceOut,
                tokenWeightOut: tokenWeightOut,
                swapFee: swapFee,
                effectiveLiquidity: effectiveLiquidity
            });

        return returnPool;
    }

    function calcEffectiveLiquidity(
        uint256 tokenWeightIn,
        uint256 tokenBalanceOut,
        uint256 tokenWeightOut
    ) internal pure returns (uint256 effectiveLiquidity) {
        // Bo * wi/(wi+wo)
        effectiveLiquidity = tokenWeightIn.mul(BONE).div(tokenWeightOut.add(tokenWeightIn)).mul(tokenBalanceOut).div(
            BONE
        );

        return effectiveLiquidity;
    }

    function calcTotalOutExactIn(uint256[] memory bestInputAmounts, Pool[] memory bestPools)
        internal
        pure
        returns (uint256 totalOutput)
    {
        totalOutput = 0;
        for (uint256 i = 0; i < bestInputAmounts.length; i++) {
            uint256 output =
                IBPool(bestPools[i].pool).calcOutGivenIn(
                    bestPools[i].tokenBalanceIn,
                    bestPools[i].tokenWeightIn,
                    bestPools[i].tokenBalanceOut,
                    bestPools[i].tokenWeightOut,
                    bestInputAmounts[i],
                    bestPools[i].swapFee
                );

            totalOutput = totalOutput.add(output);
        }
        return totalOutput;
    }

    function calcTotalOutExactOut(uint256[] memory bestInputAmounts, Pool[] memory bestPools)
        internal
        pure
        returns (uint256 totalOutput)
    {
        totalOutput = 0;
        for (uint256 i = 0; i < bestInputAmounts.length; i++) {
            uint256 output =
                IBPool(bestPools[i].pool).calcInGivenOut(
                    bestPools[i].tokenBalanceIn,
                    bestPools[i].tokenWeightIn,
                    bestPools[i].tokenBalanceOut,
                    bestPools[i].tokenWeightOut,
                    bestInputAmounts[i],
                    bestPools[i].swapFee
                );

            totalOutput = totalOutput.add(output);
        }
        return totalOutput;
    }

    function transferFrom(IXToken token, uint256 amount) internal returns (bool) {
        require(token.transferFrom(msg.sender, address(this), amount), "ERR_TRANSFER_FAILED");
    }

    function transferFeeFrom(IXToken token, uint256 amount) internal returns (bool) {
        require(token.transferFrom(msg.sender, feeReceiver, amount), "ERR_FEE_TRANSFER_FAILED");
    }

    function getBalance(IXToken token) internal view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function transfer(IXToken token, uint256 amount) internal returns (bool) {
        if (amount == 0) {
            return true;
        }

        require(token.transfer(msg.sender, amount), "ERR_TRANSFER_FAILED");
    }
}
