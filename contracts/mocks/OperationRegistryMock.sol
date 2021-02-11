//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract OperationsRegistryMock {
    event AddTrade(address user, bytes4 operation, uint256 amount);

    function addTrade(
        address user,
        bytes4 operation,
        uint256 amount
    ) public {
        emit AddTrade(user, operation, amount);
    }
}
