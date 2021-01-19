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
     * @dev Throws if called by any account which is not authorized to execute the transaction.
     */
    modifier onlyAuthorized() {
        require(
            authorization.isAuthorized(_msgSender(), address(this), msg.sig, _msgData()),
            "Authorizable: not authorized"
        );
        _;
    }
}
