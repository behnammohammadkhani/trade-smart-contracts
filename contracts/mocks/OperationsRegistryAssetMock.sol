//SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "../interfaces/IOperationsRegistry.sol";

contract OperationsRegistryAssetMock {
    IOperationsRegistry public operationsRegistry;

    constructor(address operationsRegistry_) {
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    function someFunction(uint256 _amount) public {
        operationsRegistry.addTrade(msg.sender, msg.sig, _amount);
    }
}
