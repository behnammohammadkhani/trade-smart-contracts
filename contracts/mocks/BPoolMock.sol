//SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract BPoolMock is ERC20 {
    address[] public _tokens;
    bool public _extactAmount = true;

    constructor(address[] memory tokens) ERC20("Balancer Pool Token", "BPT") {
        _tokens = tokens;
    }

    function setExtactAmount(bool exact) public {
        _extactAmount = exact;
    }

    function calcOutGivenIn(
        uint256 ,
        uint256 ,
        uint256 ,
        uint256 ,
        uint256 tokenAmountIn,
        uint256
    ) external pure returns (uint256) {
        return tokenAmountIn;
    }

    function calcInGivenOut(
        uint256 ,
        uint256 ,
        uint256 ,
        uint256 ,
        uint256 tokenAmountOut,
        uint256
    ) external pure returns (uint256) {
        return tokenAmountOut;
    }

    function getBalance(address ) external pure returns (uint256) {
        return 1;
    }

    function getDenormalizedWeight(address ) external pure returns (uint256) {
        return 1;
    }

    function getSwapFee() external pure returns (uint256) {
        return 1;
    }

    function swapExactAmountOut(
        address ,
        uint256 ,
        address ,
        uint256 tokenAmountOut,
        uint256
    ) external pure returns (uint256, uint256) {
        return (tokenAmountOut, 1);
    }

    function swapExactAmountIn(
        address ,
        uint256 ,
        address ,
        uint256 minAmountOut,
        uint256
    ) external pure returns (uint256, uint256) {
        return (minAmountOut, 1);
    }

    function getCurrentTokens() external view returns (address[] memory tokens) {
        return _tokens;
    }

    function joinPool(uint256 poolAmountOut, uint256[] calldata maxAmountsIn) external {
        for (uint256 i = 0; i < _tokens.length; i++) {
            uint256 amount = _extactAmount ? maxAmountsIn[i] : maxAmountsIn[i] - 1;
            IERC20(_tokens[i]).transferFrom(msg.sender, address(this), amount);
        }
        _mint(address(this), poolAmountOut);
        _transfer(address(this), msg.sender, poolAmountOut);
    }

    function exitPool(uint256 poolAmountIn, uint256[] calldata minAmountsOut) external {
        for (uint256 i = 0; i < _tokens.length; i++) {
            uint256 amount = _extactAmount ? minAmountsOut[i] : minAmountsOut[i] + 1;
            IERC20(_tokens[i]).transfer(msg.sender, amount);
        }
        _transfer(msg.sender, address(this), poolAmountIn);
        _burn(address(this), poolAmountIn);
    }

    function joinswapExternAmountIn(
        address tokenIn,
        uint256 tokenAmountIn,
        uint256 minPoolAmountOut
    ) external returns (uint256 poolAmountOut) {
        IERC20(tokenIn).transferFrom(msg.sender, address(this), tokenAmountIn);

        poolAmountOut = _extactAmount ? minPoolAmountOut : minPoolAmountOut + 1;
        _mint(address(this), poolAmountOut);
        _transfer(address(this), msg.sender, poolAmountOut);
    }

    function joinswapPoolAmountOut(
        address tokenIn,
        uint256 poolAmountOut,
        uint256 maxAmountIn
    ) external returns (uint256 tokenAmountIn) {
        tokenAmountIn = _extactAmount ? maxAmountIn : maxAmountIn - 1;
        IERC20(tokenIn).transferFrom(msg.sender, address(this), tokenAmountIn);

        _mint(address(this), poolAmountOut);
        _transfer(address(this), msg.sender, poolAmountOut);
    }

    function exitswapPoolAmountIn(
        address tokenOut,
        uint256 poolAmountIn,
        uint256 minAmountOut
    ) external returns (uint256 tokenAmountOut) {
        tokenAmountOut = _extactAmount ? minAmountOut : minAmountOut + 1;
        IERC20(tokenOut).transfer(msg.sender, tokenAmountOut);

        _transfer(msg.sender, address(this), poolAmountIn);
        _burn(address(this), poolAmountIn);
    }

    function exitswapExternAmountOut(
        address tokenOut,
        uint256 tokenAmountOut,
        uint256 maxPoolAmountIn
    ) external returns (uint256 poolAmountIn) {
        IERC20(tokenOut).transfer(msg.sender, tokenAmountOut);

        poolAmountIn = _extactAmount ? maxPoolAmountIn : maxPoolAmountIn - 1;
        _transfer(msg.sender, address(this), poolAmountIn);
        _burn(address(this), poolAmountIn);
    }
}
