//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

interface IAuthorization {
    function setPermissions(address _prermissions) external returns (bool);

    function isAuthorized(
        address _user,
        bytes4 _operation,
        address _asset,
        bytes calldata _data
    ) external returns (bool);
}
