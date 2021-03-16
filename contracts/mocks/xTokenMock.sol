//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../authorization/Authorizable.sol";

import "../authorization/IAuthorization.sol";
import "../authorization/IOperationsRegistry.sol";

import "hardhat/console.sol";

// solhint-disable-next-line
contract xTokenMock is ERC20, Ownable, Authorizable {
    IOperationsRegistry public operationsRegistry;

    bytes4 public constant ERC20_TRANSFER = bytes4(keccak256("transfer(address,uint256)"));

    constructor(
        string memory name_,
        string memory symbol_,
        address authorization_,
        address operationsRegistry_
    ) public ERC20(name_, symbol_) {
        authorization = IAuthorization(authorization_);
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    function transfer(address recipient, uint256 amount) public override onlyAuthorized returns (bool) {
        super.transfer(recipient, amount);
        operationsRegistry.addTrade(_msgSender(), msg.sig, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override onlyAuthorized returns (bool) {
        super.transferFrom(sender, recipient, amount);
        operationsRegistry.addTrade(sender, ERC20_TRANSFER, amount);
    }

    function mint(address account, uint256 amount) public onlyOwner onlyAuthorized {
        _mint(account, amount);
        operationsRegistry.addTrade(account, msg.sig, amount);
    }

    function burnFrom(address account, uint256 amount) public onlyOwner onlyAuthorized {
        _burn(account, amount);
        operationsRegistry.addTrade(account, msg.sig, amount);
    }
}
