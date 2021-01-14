//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/GSN/ContextUpgradeable.sol";
import "./IAuthorization.sol";

abstract contract AuthorizableUpgradeable is ContextUpgradeable {
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
