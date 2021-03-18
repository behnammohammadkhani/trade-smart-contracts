//SPDX-License-Identifier: GPL-3.0-or-later
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
import "../balancer/IBFactory.sol";
import "../token/IXTokenWrapper.sol";
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
     * @dev Emitted when `eurPriceFeed` address is setted.
     */
    event PoolFactorySetted(address indexed poolFactory);

    /**
     * @dev Emitted when `eurPriceFeed` address is setted.
     */
    event XTokenWrapperSetted(address indexed xTokenWrapper);

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
     * @param _poolFactory Balancer BFactory address
     * @param _xTokenWrapper XTokenWrapper address
     * @param _tradingLimit Traiding limit value
     * @param _paused Pause protocol
     */
    function initialize(
        address _permissions,
        address _eurPriceFeed,
        address _operationsRegistry,
        address _poolFactory,
        address _xTokenWrapper,
        uint256 _tradingLimit,
        bool _paused
    ) public initializer {
        _setPermissions(_permissions);
        _setEurPriceFeed(_eurPriceFeed);
        _setOperationsRegistry(_operationsRegistry);
        _setPoolFactory(_poolFactory);
        _setXTokenWrapper(_xTokenWrapper);
        _setTradingLimint(_tradingLimit);
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
        return _setPermissions(_permissions);
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
        return _setEurPriceFeed(_eurPriceFeed);
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
        return _setTradingLimint(_tradingLimit);
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
        return _setOperationsRegistry(_operationsRegistry);
    }

    /**
     * @dev Sets `_poolFactory` as the new BFactory module.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_poolFactory` should not be the zero address.
     *
     * @param _poolFactory The address of the new Balance BFactory module.
     */
    function setPoolFactory(address _poolFactory) public override onlyOwner returns (bool) {
        return _setPoolFactory(_poolFactory);
    }

    /**
     * @dev Sets `_xTokenWrapper` as the new XTokenWrapper module.
     *
     * Requirements:
     *
     * - the caller must have be the owner.
     * - `_xTokenWrapper` should not be the zero address.
     *
     * @param _xTokenWrapper The address of the new XTokenWrapper module.
     */
    function setXTokenWrapper(address _xTokenWrapper) public override onlyOwner returns (bool) {
        return _setXTokenWrapper(_xTokenWrapper);
    }

    /**
     * @dev Sets `_permissions` as the new Permissions module.
     *
     * Requirements:
     *
     * - `_permissions` should not be the zero address.
     *
     * @param _permissions The address of the new Pemissions module.
     */
    function _setPermissions(address _permissions) internal returns (bool) {
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
     * - `_eurPriceFeed` should not be the zero address.
     *
     * @param _eurPriceFeed The address of the new EUR Price feed module.
     */
    function _setEurPriceFeed(address _eurPriceFeed) internal returns (bool) {
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
     * - `_tradingLimit` should not be 0.
     *
     * @param _tradingLimit The value of the new traiding limit for T1 users.
     */
    function _setTradingLimint(uint256 _tradingLimit) internal returns (bool) {
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
     * - `_operationsRegistry` should not be the zero address.
     *
     * @param _operationsRegistry The address of the new OperationsRegistry module.
     */
    function _setOperationsRegistry(address _operationsRegistry) internal returns (bool) {
        require(_operationsRegistry != address(0), "operation registry is the zero address");
        emit OperationsRegistrySetted(_operationsRegistry);
        operationsRegistry = _operationsRegistry;

        return true;
    }

    /**
     * @dev Sets `_poolFactory` as the new BFactory module.
     *
     * Requirements:
     *
     * - `_poolFactory` should not be the zero address.
     *
     * @param _poolFactory The address of the new Balance BFactory module.
     */
    function _setPoolFactory(address _poolFactory) internal returns (bool) {
        require(_poolFactory != address(0), "Pool Factory is the zero address");
        emit PoolFactorySetted(_poolFactory);
        poolFactory = _poolFactory;

        return true;
    }

    /**
     * @dev Sets `_xTokenWrapper` as the new XTokenWrapper module.
     *
     * Requirements:
     *
     * - `_xTokenWrapper` should not be the zero address.
     *
     * @param _xTokenWrapper The address of the new XTokenWrapper module.
     */
    function _setXTokenWrapper(address _xTokenWrapper) internal returns (bool) {
        require(_xTokenWrapper != address(0), "XTokenWrapper is the zero address");
        emit XTokenWrapperSetted(_xTokenWrapper);
        xTokenWrapper = _xTokenWrapper;

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
        if (isERC20Operation(_operation)) {
            // Get user and amount based on the operation
            address operationSender = _user;
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

            // No need to check for Zero amount operations. Also Balances requires allowed zero amount transfers
            if (operationAmount == 0) {
                return true;
            }

            return checkERC20Permissions(operationSender, user, _asset, operation, operationAmount);
        }

        if (isBFactoryOperation(_operation)) {
            return checkBFactoryPermissions(_user);
        }

        return false;
    }

    /**
     * @dev Checks user permissions logic for ERC20 operations.
     *
     * @param _sender address executing the operation.
     * @param _user user's address.
     * @param _asset address of the contract where `_operation` comes from.
     * @param _operation operation to authorized.
     * @param _amount operation amount.
     */
    function checkERC20Permissions(
        address _sender,
        address _user,
        address _asset,
        bytes4 _operation,
        uint256 _amount
    ) internal view returns (bool) {
        // Get user permissions
        address[] memory accounts = new address[](6);
        accounts[0] = _user;
        accounts[1] = _user;
        accounts[2] = _user;
        accounts[3] = _user;
        accounts[4] = _user;
        accounts[5] = _sender;

        uint256[] memory ids = new uint256[](6);
        ids[0] = TIER_1_ID;
        ids[1] = TIER_2_ID;
        ids[2] = SUSPENDED_ID;
        ids[3] = REJECTED_ID;
        ids[4] = PROTOCOL_CONTRACT;
        ids[5] = PROTOCOL_CONTRACT;

        uint256[] memory permissionsBlance = IERC1155(permissions).balanceOfBatch(accounts, ids);

        address token = IXTokenWrapper(xTokenWrapper).xTokenToToken(_asset);

        // Only PROTOCOL_CONTRACT can mint/burn/transfer/transferFrom xLPT
        if (IBFactory(poolFactory).isBPool(token)) {
            return checkProtocolContract(_operation, permissionsBlance[4], permissionsBlance[5]);
        }

        // User is paused
        if (permissionsBlance[2] > 0) {
            return false;
        }

        // User is Rejected
        if (permissionsBlance[3] > 0) {
            return checkRejected(_operation);
        }

        return checkByTier(_user, _asset, _operation, _amount, permissionsBlance);
    }

    /**
     * @dev Checks user permissions logic for BFactory operations.
     *
     * @param _user user's address.
     */
    function checkBFactoryPermissions(address _user) internal view returns (bool) {
        uint256 permissionBlance = IERC1155(permissions).balanceOf(_user, POOL_CREATOR);

        return permissionBlance > 0;
    }

    /**
     * @dev Checks user permissions by Tier logic.
     *
     * @param _user user's address.
     * @param _asset address of the contract where `_operation` comes from.
     * @param _operation operation to authorized.
     * @param _amount operation amount.
     * @param _permissionsBlance user's permissions.
     */
    function checkByTier(
        address _user,
        address _asset,
        bytes4 _operation,
        uint256 _amount,
        uint256[] memory _permissionsBlance
    ) internal view returns (bool) {
        // If User is in TIER 2 it is allowed to do everything
        if (_permissionsBlance[1] > 0) {
            return true;
        }

        // If not Tier 2 but Tier 1, we need to check limits and actions
        uint256 currentTradigBalace =
            IOperationsRegistry(operationsRegistry).tradingBalanceByOperation(_user, _operation);
        uint256 eurAmount = IEurPriceFeed(eurPriceFeed).calculateAmount(_asset, _amount);

        // Something wrong with price feed
        if (eurAmount == 0) {
            return false;
        }

        if (_permissionsBlance[0] > 0 && currentTradigBalace.add(eurAmount) <= tradingLimit) {
            return true;
        }

        // Neither Tier 2 or Tier 1
        return false;
    }

    /**
     * @dev Checks user permissions when rejected.
     *
     * @param _operation operation to authorized.
     */
    function checkRejected(bytes4 _operation) internal pure returns (bool) {
        // Only allowed to unwind position (burn)
        if (_operation == ERC20_BURN_FROM) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Checks protocol contract type permissions .
     *
     * @param _operation operation to authorized.
     * @param _permissionUser user's protocol contract permission.
     * @param _permissionSender sender's protocol contract permission.
     */
    function checkProtocolContract(
        bytes4 _operation,
        uint256 _permissionUser,
        uint256 _permissionSender
    ) internal pure returns (bool) {
        if (_operation == ERC20_TRANSFER || _operation == ERC20_TRANSFER_FROM) {
            if (_permissionSender > 0) {
                // the sender should be PROTOCOL_CONTRACT
                return true;
            } else {
                return false;
            }
        }

        if (_operation == ERC20_MINT || _operation == ERC20_BURN_FROM) {
            if (_permissionUser > 0) {
                // minting to or berning from should be PROTOCOL_CONTRACT
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    function isERC20Operation(bytes4 _operation) internal pure returns (bool) {
        return
            _operation == ERC20_TRANSFER ||
            _operation == ERC20_TRANSFER_FROM ||
            _operation == ERC20_MINT ||
            _operation == ERC20_BURN_FROM;
    }

    function isBFactoryOperation(bytes4 _operation) internal pure returns (bool) {
        return _operation == BFACTORY_NEW_POOL;
    }
}
