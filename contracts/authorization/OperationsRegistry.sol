//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IOperationsRegistry.sol";
import "./IEurPriceFeed.sol";

import "hardhat/console.sol";

/**
 * @title Authorization
 * @author Protofire
 * @dev Contract module to keep track of the EUR amount being tradded for each user by operation.
 *
 */
contract OperationsRegistry is IOperationsRegistry, Ownable {
    using SafeMath for uint256;

    /**
     * @dev Address of EUR Price feed module from where to get assets EUR prices.
     */
    address public eurPriceFeed;

    /**
     * @dev Assets that are allowed for updating user traiding balances.
     */
    mapping(address => bool) public allowedAssets;

    /**
     * @dev EUR amount tradded for each user by operation.
     */
    mapping(address => mapping(bytes4 => uint256)) public override tradingBalanceByOperation;

    /**
     * @dev Emitted when `eurPriceFeed` address is setted.
     */
    event EurPriceFeedSetted(address indexed newEurPriceFeed);

    /**
     * @dev Emitted when `asset` is allowed.
     */
    event AssetAllowed(address indexed asset);

    /**
     * @dev Emitted when `asset` is disallowed.
     */
    event AssetDisallowed(address indexed asset);

    /**
     * @dev Sets the values for {eurPriceFeed}.
     *
     * Sets ownership to the account that deploys the contract.
     *
     */
    constructor(address _eurPriceFeed) public {
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        emit EurPriceFeedSetted(_eurPriceFeed);
        eurPriceFeed = _eurPriceFeed;
    }

    /**
     * @dev Throws if called by any asset not allowed.
     */
    modifier onlyAllowedAsset() {
        require(allowedAssets[_msgSender()], "asset is not allowed");
        _;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
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
     * @dev Sets `_asset` as allowed for calling `addTrade`.
     *
     * Requirements:
     *
     * - the caller mustbe the owner.
     * - `_asset` should not be the zero address.
     *
     * @param _asset asset's address.
     */
    function allowAsset(address _asset) public override onlyOwner returns (bool) {
        require(_asset != address(0), "asset is the zero address");
        emit AssetAllowed(_asset);
        allowedAssets[_asset] = true;

        return true;
    }

    /**
     * @dev Sets `_asset` as disallowed for calling `addTrade`.
     *
     * Requirements:
     *
     * - the caller mustbe the owner.
     * - `_asset` should not be the zero address.
     *
     * @param _asset asset's address.
     */
    function disallowAsset(address _asset) public override onlyOwner returns (bool) {
        require(_asset != address(0), "asset is the zero address");
        emit AssetDisallowed(_asset);
        allowedAssets[_asset] = false;

        return true;
    }

    /**
     * @dev Adds `_amount` converted to ERU to the balance traded by `_user` for an `_operation`
     *
     * Requirements:
     *
     * - the caller must be an allowed asset.
     *
     * @param _user user's address
     * @param _operation msg.sig of the function considered an operation.
     * @param _amount asset amount which is converted to EUR and added to balance traded by `_user` for `_operation`.
     */
    function addTrade(
        address _user,
        bytes4 _operation,
        uint256 _amount
    ) public override onlyAllowedAsset {
        uint256 currentBalance = tradingBalanceByOperation[_user][_operation];
        tradingBalanceByOperation[_user][_operation] = currentBalance.add(
            IEurPriceFeed(eurPriceFeed).calculateAmount(_msgSender(), _amount)
        );
    }
}
