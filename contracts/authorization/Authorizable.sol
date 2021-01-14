//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "./IAuthorization.sol";

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
