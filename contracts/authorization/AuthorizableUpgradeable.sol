//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/GSN/ContextUpgradeable.sol";
import "../interfaces/IAuthorization.sol";

/**
 * @title Authorizable
 * @author Protofire
 * @dev Contract module which provides an authorization mechanism.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyAuthorized`, which can be applied to your functions to restrict their use.
 */
abstract contract AuthorizableUpgradeable is ContextUpgradeable {
    IAuthorization public authorization;

    /**
     * @dev Emitted when `authorization` address is setted.
     */
    event AuthorizationSetted(address indexed newAuthorization);

    /**
     * @dev Throws if called by any account which is not authorized to execute the transaction.
     */
    modifier onlyAuthorized() {
        require(
            authorization.isAuthorized(_msgSender(), address(this), msg.sig, _msgData()),
            "Authorizable: not authorized"
        );
        _;
    }

    /**
     * @dev Sets authorization.
     *
     */
    function _setAuthorization(address authorization_) internal {
        require(authorization_ != address(0), "Authorizable: authorization is the zero address");
        authorization = IAuthorization(authorization_);
        emit AuthorizationSetted(authorization_);
    }
}
