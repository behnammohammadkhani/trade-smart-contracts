//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/GSN/ContextUpgradeable.sol";
import "./IAuthorization.sol";

abstract contract Autorizable is ContextUpgradeable {
    IAuthorization private authorization;

    /**
     * @dev Throws if called by any account which is not authorized to execute the transaction.
     */
    modifier onlyAuthorized() {
        require(
            authorization.isAuthorized(_msgSender(), msg.sig, address(this), _msgData()),
            "Authorizable: not authorized"
        );
        _;
    }
}
