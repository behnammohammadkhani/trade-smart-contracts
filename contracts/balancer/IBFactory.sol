//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "./IBPool.sol";

interface IBFactory {
    function isBPool(address b) external view returns (bool);

    function newBPool() external returns (IBPool);
}
