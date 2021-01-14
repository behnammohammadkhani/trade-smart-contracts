//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface IAuthorization {
    function setPermissions(address _prermissions) external returns (bool);

    function setEurPriceFeed(address _prermissions) external returns (bool);

    function setTraidingLimint(uint256 _traidingLimit) external returns (bool);

    function isAuthorized(
        address _user,
        address _asset,
        bytes4 _operation,
        bytes calldata _data
    ) external returns (bool);
}
