//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../authorization/Authorizable.sol";

import "../authorization/IAuthorization.sol";
import "../authorization/IOperationsRegistry.sol";

import "hardhat/console.sol";

contract xToken is ERC20Pausable, Ownable, Authorizable {
    IOperationsRegistry public operationsRegistry;
    string public kya;

    bytes4 public constant ERC20_TRANSFER = bytes4(keccak256("transfer(address,uint256)"));

    /**
     * @dev Emitted when `operationsRegistry` address is setted.
     */
    event KyaSetted(string newKya);

    /**
     * @dev Emitted when `operationsRegistry` address is setted.
     */
    event OperationsRegistrySetted(address indexed newOperationsRegistry);

    /**
     * @dev Sets the values for {name}, {symbol}, {decimals}, {kya}, {authorization} and {operationsRegistry}.
     *
     * Sets ownership to `owner_`.
     *
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        string memory kya_,
        address authorization_,
        address operationsRegistry_,
        address owner_
    ) public ERC20(name_, symbol_) {
        require(decimals_ > 0, "decimals is 0");
        require(authorization_ != address(0), "authorization is the zero address");
        require(operationsRegistry_ != address(0), "operationsRegistry is the zero address");
        require(owner_ != address(0), "owner is the zero address");

        _setupDecimals(decimals_);
        kya = kya_;
        _setAuthorization(authorization_);
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
        transferOwnership(owner_);
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - the contract must not be paused.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - the contract must be paused.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Sets authorization.
     *
     */
    function setAuthorization(address authorization_) public onlyOwner {
        _setAuthorization(authorization_);
    }

    /**
     * @dev Sets operationsRegistry.
     *
     */
    function setOperationsRegistry(address operationsRegistry_) public onlyOwner {
        require(operationsRegistry_ != address(0), "operationsRegistry is the zero address");
        emit OperationsRegistrySetted(operationsRegistry_);
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    /**
     * @dev Sets kya.
     *
     */
    function setKya(string memory kya_) public onlyOwner {
        emit KyaSetted(kya_);
        kya = kya_;
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Adds the `amount` being tranfered to the `sender`'s accumulated in
     * {bytes4(keccak256("transfer(address,uint256)"))} operation.
     * This is not required by the EIP.
     *
     * Requirements:
     *
     * - the operation should be authorized.
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public override onlyAuthorized returns (bool) {
        super.transfer(recipient, amount);
        operationsRegistry.addTrade(_msgSender(), msg.sig, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Adds the `amount` being tranfered to the `msg.sender`'s accumulated in
     * {bytes4(keccak256("transfer(address,uint256)"))} operation.
     * This is not required by the EIP.
     *
     * Requirements:
     *
     * - the operation should be authorized.
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override onlyAuthorized returns (bool) {
        super.transferFrom(sender, recipient, amount);
        operationsRegistry.addTrade(sender, ERC20_TRANSFER, amount);
        return true;
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Adds the `amount` being minted to the `account`'s accumulated in
     * {bytes4(keccak256("mint(address,uint256)"))} operation.
     * This is not required by the EIP.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - the operation should be authorized.
     * - `to` cannot be the zero address.
     */
    function mint(address account, uint256 amount) public onlyOwner onlyAuthorized {
        _mint(account, amount);
        operationsRegistry.addTrade(account, msg.sig, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Adds the `amount` being burned to the `account`'s accumulated in
     * {bytes4(keccak256("burnFrom(address,uint256)"))} operation.
     * This is not required by the EIP.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - the operation should be authorized.
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function burnFrom(address account, uint256 amount) public onlyOwner onlyAuthorized {
        _burn(account, amount);
        operationsRegistry.addTrade(account, msg.sig, amount);
    }
}
