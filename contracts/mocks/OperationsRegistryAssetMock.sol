//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../authorization/IOperationsRegistry.sol";

contract OperationsRegistryAssetMock {
    IOperationsRegistry public operationsRegistry;

    constructor(address operationsRegistry_) public {
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    function someFunction(uint256 _amount) public {
        operationsRegistry.addTrade(msg.sender, msg.sig, _amount);
    }
}
