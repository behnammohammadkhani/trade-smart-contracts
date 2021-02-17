//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "./IAuthorization.sol";

/**
 * @title Authorizable
 * @author Protofire
 * @dev Contract module which provides an authorization mechanism.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyAuthorized`, which can be applied to your functions to restrict their use.
 */
abstract contract Authorizable is Context {
    IAuthorization public authorization;

    /**
     * @dev Emitted when `authorization` address is setted.
     */
    event AuthorizationSetted(address indexed newAuthorization);

    /**
     * @dev Throws if called by any account which is not authorized to execute the transaction.
     */
    modifier onlyAuthorized() {
        // It uses tx.origin because user may use a CPK for interacting with the protocol
        require(
            // solhint-disable-next-line avoid-tx-origin
            authorization.isAuthorized(tx.origin, address(this), msg.sig, _msgData()),
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
