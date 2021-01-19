//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./AuthorizationStorage.sol";

import "./IAuthorization.sol";
import "./IEurPriceFeed.sol";
import "./IOperationsRegistry.sol";

import "hardhat/console.sol";

contract Authorization is IAuthorization, Initializable, OwnableUpgradeable, AuthorizationStorage {
    using SafeMathUpgradeable for uint256;

    event PermissionsSetted(address indexed newPermissions);
    event OperationsRegistrySetted(address indexed newOperationsRegistry);
    event TradingLimitSetted(uint256 newLimit);
    event EurPriceFeedSetted(address indexed newEurPriceFeed);

    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    function initialize(
        address _permissions,
        address _eurPriceFeed,
        address _operationsRegistry,
        uint256 _tradingLimit,
        bool _paused
    ) public initializer {
        require(_permissions != address(0), "new permissions is the zero address");
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
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

    function setPermissions(address _permissions) public override onlyOwner returns (bool) {
        require(_permissions != address(0), "new permissions is the zero address");
        emit PermissionsSetted(_permissions);
        permissions = _permissions;

        return true;
    }

    function setEurPriceFeed(address _eurPriceFeed) public override onlyOwner returns (bool) {
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        emit EurPriceFeedSetted(_eurPriceFeed);
        eurPriceFeed = _eurPriceFeed;

        return true;
    }

    function setTradingLimint(uint256 _tradingLimit) public override onlyOwner returns (bool) {
        require(_tradingLimit != 0, "trading limit is 0");
        emit TradingLimitSetted(_tradingLimit);
        tradingLimit = _tradingLimit;

        return true;
    }

    function setOperationsRegistry(address _operationsRegistry) public override onlyOwner returns (bool) {
        require(_operationsRegistry != address(0), "trading registry is the zero address");
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

    function isAuthorized(
        address _user,
        address _asset,
        bytes4 _operation,
        bytes calldata _data // solhint-disable-line
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

            if (_operation == ERC20_MINT || _operation == ERC20_BURN_FROM) {
                (address account, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                user = account;
                operationAmount = amount;
            }

            if (_operation == ERC20_TRANSFER) {
                (address _, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                operationAmount = amount;
            }

            if (_operation == ERC20_TRANSFER_FROM) {
                // solhint-disable-next-line no-unused-vars
                (address sender, address _, uint256 amount) = abi.decode(_data[4:], (address, address, uint256));
                user = sender;
                operationAmount = amount;
                operation = ERC20_TRANSFER;
            }

            return checkPermissions(user, _asset, operation, operationAmount);
        }

        return false;
    }

    function checkPermissions(
        address _user,
        address _asset,
        bytes4 _operation,
        uint256 amount
    ) internal view returns (bool) {
        // Get user permissions
        address[] memory accounts = new address[](2);
        accounts[0] = _user;
        accounts[1] = _user;

        uint256[] memory ids = new uint256[](2);
        ids[0] = TIER_1_ID;
        ids[1] = TIER_2_ID;

        uint256[] memory permissionsBlance = IERC1155(permissions).balanceOfBatch(accounts, ids);

        // If User is in TIER 2 it is allowed to do everything
        if (permissionsBlance[1] > 0) {
            return true;
        }

        // If not Tier 2 but Tier 1, we need to check limits and actions
        uint256 currentTradigBalace =
            IOperationsRegistry(operationsRegistry).tradingBalanceByOperation(_user, _operation);
        uint256 eurAmount = IEurPriceFeed(eurPriceFeed).calculateAmount(_asset, amount);

        if (permissionsBlance[0] > 0 && currentTradigBalace.add(eurAmount) <= tradingLimit) {
            return true;
        }

        // Neither Tier 2 or Tier 1
        return false;
    }
}
