//SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "../interfaces/IAuthorization.sol";

contract AuthorizationMock is IAuthorization {
    bool public authorized;

    constructor(bool _authorized) {
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

    // solhint-disable-next-line no-empty-blocks
    function setPermissions(address) public pure override {
    }

    // solhint-disable-next-line no-empty-blocks
    function setEurPriceFeed(address) public pure override {
    }

    // solhint-disable-next-line no-empty-blocks
    function setTradingLimit(uint256) public pure override {
    }
    // solhint-disable-next-line no-empty-blocks
    function setOperationsRegistry(address) public pure override {
    }
    // solhint-disable-next-line no-empty-blocks
    function setPoolFactory(address) public pure override {
    }
    // solhint-disable-next-line no-empty-blocks
    function setXTokenWrapper(address) public pure override {
    }
}
