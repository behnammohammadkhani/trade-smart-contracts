//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../authorization/IAuthorization.sol";

import "hardhat/console.sol";

contract AuthorizationMock is IAuthorization {
    bool public authorized;

    constructor(bool _authorized) public {
        authorized = _authorized;
    }

    function setAuthorized(bool _authorized) public {
        authorized = _authorized;
    }

    function isAuthorized(
        address,
        address,
        bytes4,
        bytes calldata
    ) public view override returns (bool) {
        return authorized;
    }

    function setPermissions(address) public pure override returns (bool) {
        return true;
    }

    function setEurPriceFeed(address) public pure override returns (bool) {
        return true;
    }

    function setTradingLimint(uint256) public pure override returns (bool) {
        return true;
    }

    function setOperationsRegistry(address) public pure override returns (bool) {
        return true;
    }

    function setPoolFactory(address) public pure override returns (bool) {
        return true;
    }

    function setXTokenWrapper(address) public pure override returns (bool) {
        return true;
    }
}
