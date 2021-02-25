//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import "./AuthorizationStorage.sol";

import "./IAuthorization.sol";
import "./IEurPriceFeed.sol";
import "./IOperationsRegistry.sol";
import "../interfaces/IGnosisSafe.sol";

import "hardhat/console.sol";

/**
 * @title Authorization
 * @author Protofire
 * @dev Contract module which provides an authorization mechanism.
 *
 * This contract should be called by an Authorizable contract through its `onlyAuthorized` modifier.
 */
contract Authorization is IAuthorization, Initializable, OwnableUpgradeable, AuthorizationStorage {
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address;

    /**
     * @dev Emitted when `permissions` address is setted.
     */
    event PermissionsSetted(address indexed newPermissions);

    /**
     * @dev Emitted when `operationsRegistry` address is setted.
     */
    event OperationsRegistrySetted(address indexed newOperationsRegistry);

    /**
     * @dev Emitted when `tradingLimit` value is setted.
     */
    event TradingLimitSetted(uint256 newLimit);

    /**
     * @dev Emitted when `eurPriceFeed` address is setted.
     */
    event EurPriceFeedSetted(address indexed newEurPriceFeed);

    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    /**
     * @dev Initalize the contract.
     *
     * Sets ownership to the account that deploys the contract.
     *
     * @param _permissions Permissions module address
     * @param _eurPriceFeed EurPriceFeed module address
     * @param _operationsRegistry OperationsRegistry address
     * @param _tradingLimit Traiding limit value
     * @param _paused Pause protocol
     */
    function initialize(
        address _permissions,
        address _eurPriceFeed,
        address _operationsRegistry,
        uint256 _tradingLimit,
        bool _paused
    ) public initializer {
        require(_permissions != address(0), "permissions is the zero address");
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        require(_operationsRegistry != address(0), "operation registry is the zero address");
        require(_tradingLimit != 0, "trading limit is 0");
        permissions = _permissions;
        eurPriceFeed = _eurPriceFeed;
        operationsRegistry = _operationsRegistry;
        tradingLimit = _tradingLimit;
        paused = _paused;

        __Ownable_init();

        emit PermissionsSetted(permissions);
        emit EurPriceFeedSetted(_eurPriceFeed);
        emit OperationsRegistrySetted(_operationsRegistry);
        emit TradingLimitSetted(_tradingLimit);
    }

    /**
     * @dev Sets `_permissions` as the new Permissions module.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_permissions` should not be the zero address.
     *
     * @param _permissions The address of the new Pemissions module.
     */
    function setPermissions(address _permissions) public override onlyOwner returns (bool) {
        require(_permissions != address(0), "permissions is the zero address");
        emit PermissionsSetted(_permissions);
        permissions = _permissions;

        return true;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_eurPriceFeed` should not be the zero address.
     *
     * @param _eurPriceFeed The address of the new EUR Price feed module.
     */
    function setEurPriceFeed(address _eurPriceFeed) public override onlyOwner returns (bool) {
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        emit EurPriceFeedSetted(_eurPriceFeed);
        eurPriceFeed = _eurPriceFeed;

        return true;
    }

    /**
     * @dev Sets `_tradingLimit` as the new traiding limit for T1 users.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_tradingLimit` should not be 0.
     *
     * @param _tradingLimit The value of the new traiding limit for T1 users.
     */
    function setTradingLimint(uint256 _tradingLimit) public override onlyOwner returns (bool) {
        require(_tradingLimit != 0, "trading limit is 0");
        emit TradingLimitSetted(_tradingLimit);
        tradingLimit = _tradingLimit;

        return true;
    }

    /**
     * @dev Sets `_operationsRegistry` as the new OperationsRegistry module.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_operationsRegistry` should not be the zero address.
     *
     * @param _operationsRegistry The address of the new OperationsRegistry module.
     */
    function setOperationsRegistry(address _operationsRegistry) public override onlyOwner returns (bool) {
        require(_operationsRegistry != address(0), "operation registry is the zero address");
        emit OperationsRegistrySetted(_operationsRegistry);
        operationsRegistry = _operationsRegistry;

        return true;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function pause() external onlyOwner {
        require(!paused, "paused");
        paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function unpause() external onlyOwner {
        require(paused, "not paused");
        paused = false;
        emit Unpaused(_msgSender());
    }

    /**
     * @dev Determins if a user is allowed to perform an operation.
     *
     * @param _user msg.sender from function using Authorizable `onlyAuthorized` modifier.
     * @param _asset address of the contract using Authorizable `onlyAuthorized` modifier.
     * @param _operation msg.sig from function using Authorizable `onlyAuthorized` modifier.
     * @param _data msg.data from function using Authorizable `onlyAuthorized` modifier.
     * @return a boolean signaling the authorization.
     */
    function isAuthorized(
        address _user,
        address _asset,
        bytes4 _operation,
        bytes calldata _data
    ) public view override returns (bool) {
        // The protocol is paused
        if (paused) {
            return false;
        }

        // Only allowed operations
        if (
            _operation == ERC20_TRANSFER ||
            _operation == ERC20_TRANSFER_FROM ||
            _operation == ERC20_MINT ||
            _operation == ERC20_BURN_FROM
        ) {
            // Get user and amount based on the operation
            address user = _user;
            bytes4 operation = _operation;
            uint256 operationAmount;

            // ERC20_TRANSFER uses _user, which is the sender, for authorizing

            if (_operation == ERC20_TRANSFER) {
                ( , uint256 amount) = abi.decode(_data[4:], (address, uint256));
                operationAmount = amount;
            }

            if (_operation == ERC20_MINT || _operation == ERC20_BURN_FROM) {
                (address account, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                user = account;
                operationAmount = amount;
            }

            if (_operation == ERC20_TRANSFER_FROM) {
                (address sender, , uint256 amount) = abi.decode(_data[4:], (address, address, uint256));
                user = sender;
                operationAmount = amount;
                operation = ERC20_TRANSFER;
            }

            return checkPermissions(user, _asset, operation, operationAmount);
        }

        return false;
    }

    /**
     * @dev Checks user permissions logic.
     *
     * @param _user user's address.
     * @param _asset address of the contract where `_operation` comes from.
     * @param _operation operation to authorized.
     * @param amount operation amount.
     */
    function checkPermissions(
        address _user,
        address _asset,
        bytes4 _operation,
        uint256 amount
    ) internal view returns (bool) {
        // Get user permissions
        address[] memory accounts = new address[](4);
        accounts[0] = _user;
        accounts[1] = _user;
        accounts[2] = _user;
        accounts[3] = _user;

        uint256[] memory ids = new uint256[](4);
        ids[0] = TIER_1_ID;
        ids[1] = TIER_2_ID;
        ids[2] = SUSPENDED_ID;
        ids[3] = REJECTED_ID;

        uint256[] memory permissionsBlance = IERC1155(permissions).balanceOfBatch(accounts, ids);

        // User is paused
        if (permissionsBlance[2] > 0) {
            return false;
        }

        // User is Rejected
        if (permissionsBlance[3] > 0) {
            // Only allowed to unwind position (burn)
            // TODO - transferFrom shoudl only be allowed for LPT, we should deal with it when
            // defining if LPT are going to be wrapped or not, depending on that we may need some sort of
            // LPT/xLPT registry to only allow transferFrom if it is a xLPT
            if (_operation == ERC20_BURN_FROM) {
                return true;
            } else {
                return false;
            }
        }

        // If User is in TIER 2 it is allowed to do everything
        if (permissionsBlance[1] > 0) {
            return true;
        }

        // If not Tier 2 but Tier 1, we need to check limits and actions
        uint256 currentTradigBalace =
            IOperationsRegistry(operationsRegistry).tradingBalanceByOperation(_user, _operation);
        uint256 eurAmount = IEurPriceFeed(eurPriceFeed).calculateAmount(_asset, amount);

        // Something wrong with price feed
        if (eurAmount == 0) {
            return false;
        }

        if (permissionsBlance[0] > 0 && currentTradigBalace.add(eurAmount) <= tradingLimit) {
            return true;
        }

        // Neither Tier 2 or Tier 1
        return false;
    }
}
