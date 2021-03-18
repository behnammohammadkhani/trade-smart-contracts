//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

contract SafeEvents {
    event ApproveHash(bytes32 indexed approvedHash, address indexed owner);
    event SignMsg(bytes32 indexed msgHash);
    event ExecutionFailure(bytes32 txHash, uint256 payment);
    event ExecutionSuccess(bytes32 txHash, uint256 payment);
}
