//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "../interfaces/IUTokenPriceFeed.sol";

contract UTokenPriceFeedMock is IUTokenPriceFeed {
    bool public noPrice = false;

    function setNoPrice(bool _noPrice) external {
        noPrice = _noPrice;
    }

    function getPrice(address) external override returns (uint256) {
        return noPrice ? 0 : 1;
    }

    function calculateAmount(address, uint256 _amount) external view override returns (uint256) {
        return noPrice ? 0 : _amount;
    }
}
