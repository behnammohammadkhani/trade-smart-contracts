//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface IEurPriceFeed {
    function getPrice(address _asset) external returns (uint256);
}
