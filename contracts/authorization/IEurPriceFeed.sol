//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface IEurPriceFeed {
    function getPrice(address _asset) external returns (uint256);

    function calculateAmount(address _asset, uint256 _amount) external returns (uint256);
}
