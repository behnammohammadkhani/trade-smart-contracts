//SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;



contract BPoolSwapFeeMock {
    uint256 private _swapFee;

    constructor(uint256 swapFee) {
        setSwapFee(swapFee);
    }

    function setSwapFee(uint256 swapFee) public {
        _swapFee = swapFee;
    }

    function getSwapFee() public view returns (uint256) {
        return _swapFee;
    }
}
