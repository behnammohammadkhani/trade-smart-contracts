//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../authorization/Authorizable.sol";
import "../authorization/IAuthorization.sol";
import "../authorization/IOperationsRegistry.sol";
import "../interfaces/IGnosisSafe.sol";

import "hardhat/console.sol";

/**
 * @title XToken
 * @author Protofire
 * @dev ERC20 token used for wrapping tokens with the purpose of applying an authorization layer.
 *
 */
contract XToken is ERC20Pausable, AccessControl, Authorizable {
    using Address for address;

    IOperationsRegistry public operationsRegistry;
    string public kya;

    bytes4 public constant ERC20_TRANSFER = bytes4(keccak256("transfer(address,uint256)"));
    bytes32 public constant WRAPPER_ROLE = keccak256("MINTER_ROLE");

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
     * Grants the contract deployer the default admin role.
     *
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        string memory kya_,
        address authorization_,
        address operationsRegistry_
    ) public ERC20(name_, symbol_) {
        require(decimals_ > 0, "decimals is 0");
        require(authorization_ != address(0), "authorization is the zero address");
        require(operationsRegistry_ != address(0), "operationsRegistry is the zero address");

        _setupDecimals(decimals_);

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setKya(kya_);
        _setAuthorization(authorization_);
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    /**
     * @dev Throws if called by any account with no admin role.
     */
    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "must have default admin role");
        _;
    }

    /**
     * @dev Throws if called by any account with no wrapper role.
     */
    modifier onlyWrapper() {
        require(hasRole(WRAPPER_ROLE, _msgSender()), "must have wrapper role");
        _;
    }

    /**
     * @dev Grants WRAPPER role to `account`.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function setWrapper(address account) public {
        grantRole(WRAPPER_ROLE, account);
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     * - the contract must not be paused.
     */
    function pause() public onlyAdmin {
        _pause();
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     * - the contract must be paused.
     */
    function unpause() public onlyAdmin {
        _unpause();
    }

    /**
     * @dev Sets authorization.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function setAuthorization(address authorization_) public onlyAdmin {
        _setAuthorization(authorization_);
    }

    /**
     * @dev Sets operationsRegistry.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function setOperationsRegistry(address operationsRegistry_) public onlyAdmin {
        require(operationsRegistry_ != address(0), "operationsRegistry is the zero address");
        emit OperationsRegistrySetted(operationsRegistry_);
        operationsRegistry = IOperationsRegistry(operationsRegistry_);
    }

    /**
     * @dev Sets kya.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function setKya(string memory kya_) public onlyAdmin {
        _setKya(kya_);
    }

    /**
     * @dev Sets kya.
     *
     */
    function _setKya(string memory kya_) internal {
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

        // It uses tx.origin because user may use a CPK for interacting with the protocol
        // solhint-disable-next-line avoid-tx-origin
        operationsRegistry.addTrade(tx.origin, msg.sig, amount);
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
     * - the caller must have WRAPPER_ROLE.
     * - the operation should be authorized.
     * - `to` cannot be the zero address.
     */
    function mint(address account, uint256 amount) public onlyWrapper onlyAuthorized {
        _mint(account, amount);

        // It uses tx.origin because user may use a CPK for interacting with the protocol
        // solhint-disable-next-line avoid-tx-origin
        operationsRegistry.addTrade(tx.origin, msg.sig, amount);
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
     * - the caller must have WRAPPER_ROLE.
     * - the operation should be authorized.
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function burnFrom(address account, uint256 amount) public onlyWrapper onlyAuthorized {
        _burn(account, amount);

        // It uses tx.origin because user may use a CPK for interacting with the protocol
        // solhint-disable-next-line avoid-tx-origin
        operationsRegistry.addTrade(tx.origin, msg.sig, amount);
    }
}
