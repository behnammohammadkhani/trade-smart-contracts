//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../authorization/Authorizable.sol";
import "../authorization/IAuthorization.sol";
import "../authorization/ITradingRegistry.sol";

// solhint-disable-next-line
contract xTokenMock is ERC20, Authorizable {
    ITradingRegistry public tradingRegistry;

    bytes4 public constant ERC20_RECEIVE = bytes4(keccak256("receive(address,uint256)"));
    bytes4 public constant ERC20_TRANSFER = bytes4(keccak256("transfer(address,uint256)"));

    constructor(
        string memory name_,
        string memory symbol_,
        address authorization_,
        address tradingRegistry_
    ) public ERC20(name_, symbol_) {
        authorization = IAuthorization(authorization_);
        tradingRegistry = ITradingRegistry(tradingRegistry_);
    }

    function transfer(address recipient, uint256 amount) public virtual override onlyAuthorized returns (bool) {
        super.transfer(recipient, amount);
        tradingRegistry.addTrade(_msgSender(), msg.sig, amount);
        tradingRegistry.addTrade(recipient, ERC20_RECEIVE, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override onlyAuthorized returns (bool) {
        super.transferFrom(sender, recipient, amount);
        tradingRegistry.addTrade(sender, ERC20_TRANSFER, amount);
        tradingRegistry.addTrade(recipient, ERC20_RECEIVE, amount);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
        tradingRegistry.addTrade(account, msg.sig, amount);
    }
}
