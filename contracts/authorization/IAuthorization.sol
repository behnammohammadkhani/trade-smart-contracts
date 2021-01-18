//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface IAuthorization {
    function setPermissions(address _prermissions) external returns (bool);

    function setEurPriceFeed(address _prermissions) external returns (bool);

    function setOperationsRegistry(address _prermissions) external returns (bool);

    function setTradingLimint(uint256 _tradingLimit) external returns (bool);

    function isAuthorized(
        address _user,
        address _asset,
        bytes4 _operation,
        bytes calldata _data
    ) external returns (bool);
}
