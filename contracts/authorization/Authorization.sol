//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./IAuthorization.sol";
import "./IEurPriceFeed.sol";
import "./AuthorizationStorage.sol";

import "hardhat/console.sol";

contract Authorization is IAuthorization, Initializable, OwnableUpgradeable, AuthorizationStorage {
    using SafeMathUpgradeable for uint256;

    event PermissionsSetted(address indexed newPermissions);
    event TradingRegistrySetted(address indexed newTradingRegistry);
    event TradingLimitSetted(uint256 newLimit);
    event EurPriceFeedSetted(address indexed newEurPriceFeed);

    function initialize(
        address _permissions,
        address _eurPriceFeed,
        address _tradingRegistry,
        uint256 _tradingLimit
    ) public initializer {
        require(_permissions != address(0), "new permissions is the zero address");
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        require(_tradingLimit != 0, "trading limit is 0");
        permissions = _permissions;
        eurPriceFeed = _eurPriceFeed;
        tradingRegistry = _tradingRegistry;
        tradingLimit = _tradingLimit;

        __Ownable_init();

        emit PermissionsSetted(permissions);
        emit EurPriceFeedSetted(_eurPriceFeed);
        emit TradingRegistrySetted(_tradingRegistry);
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

    function setTradingRegistry(address _tradingRegistry) public override onlyOwner returns (bool) {
        require(_tradingRegistry != address(0), "trading registry is the zero address");
        emit TradingRegistrySetted(_tradingRegistry);
        tradingRegistry = _tradingRegistry;

        return true;
    }

    function isAuthorized(
        address _user,
        address _asset, // solhint-disable-line
        bytes4 _operation,
        bytes calldata _data // solhint-disable-line
    ) public view override returns (bool) {
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
        if (permissionsBlance[0] > 0) {
            //ERC20
            // solhint-disable-next-line
            if (_operation == ERC20_TRANSFER) {
                // (address recipient, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                // console.log("TRANSFER", recipient, amount);
            }

            // solhint-disable-next-line
            if (_operation == ERC20_TRANSFER_FROM) {
                // solhint-disable-next-line
                // (address sender, address recipient, uint256 amount) = abi.decode(_data[4:], (address, address, uint256));
                // console.log("TRANSFER_FROM", sender, recipient, amount);
            }

            // solhint-disable-next-line
            if (_operation == ERC20_APPROVE) {
                // (address spender, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                // console.log("APPROVE",  spender, amount);
            }

            // solhint-disable-next-line
            if (_operation == ERC20_MINT) {
                // (address account, uint256 amount) = abi.decode(_data[4:], (address, uint256));
                // console.log("MINT",  account, amount);
            }
        }

        // Neither Tier 2 or Tier 1
        return false;
    }
}
