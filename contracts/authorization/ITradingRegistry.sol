//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface ITradingRegistry {
    function tradingBalanceByOperation(address _user, bytes4 _operation) external returns (uint256);

    function setEurPriceFeed(address _eurPriceFeed) external returns (bool);

    function allowAsset(address _asset) external returns (bool);

    function disallowAsset(address _asset) external returns (bool);

    function addTrade(
        address _user,
        bytes4 _operation,
        uint256 _amount
    ) external;
}
