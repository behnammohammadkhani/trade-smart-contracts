//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;



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
