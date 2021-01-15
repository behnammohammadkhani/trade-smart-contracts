//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../authorization/ITradingRegistry.sol";

contract TradingRegistryAssetMock {
    ITradingRegistry public tradingRegistry;

    constructor(address tradingRegistry_) public {
        tradingRegistry = ITradingRegistry(tradingRegistry_);
    }

    function someFunction(uint256 _amount) public {
        tradingRegistry.addTrade(msg.sender, msg.sig, _amount);
    }
}
