//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "../interfaces/IAuthorization.sol";

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

    function setPermissions(address) public pure override {
        1 + 1;
    }

    function setEurPriceFeed(address) public pure override {
        1 + 1;
    }

    function setTradingLimit(uint256) public pure override {
        1 + 1;
    }

    function setOperationsRegistry(address) public pure override {
        1 + 1;
    }

    function setPoolFactory(address) public pure override {
        1 + 1;
    }

    function setXTokenWrapper(address) public pure override {
        1 + 1;
    }
}
