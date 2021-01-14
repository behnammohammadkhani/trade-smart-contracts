//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../authorization/Authorizable.sol";
import "../authorization/IAuthorization.sol";

contract ERC20Authorizable is ERC20, Authorizable {

    constructor (string memory name_, string memory symbol_, address authorization_) ERC20(name_, symbol_) public {
        authorization = IAuthorization(authorization_);
    }

    function transfer(address recipient, uint256 amount) public virtual override onlyAuthorized returns (bool) {
        super.transfer(recipient, amount);
    }

    function approve(address spender, uint256 amount) public virtual override onlyAuthorized returns (bool) {
        super.approve(spender, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override onlyAuthorized returns (bool) {
        super.transferFrom(sender, recipient, amount);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
