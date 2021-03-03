pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract BPoolSwapFeeMock {
    uint256 private _swapFee;

    constructor(uint256 swapFee) public {
        setSwapFee(swapFee);
    }

    function setSwapFee(uint256 swapFee) public {
        _swapFee = swapFee;
    }

    function getSwapFee() public returns (uint256) {
        return _swapFee;
    }
}
