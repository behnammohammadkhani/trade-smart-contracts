//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IOperationsRegistry.sol";
import "./IEurPriceFeed.sol";

import "hardhat/console.sol";

contract OperationsRegistry is IOperationsRegistry, Ownable {
    using SafeMath for uint256;

    address public eurPriceFeed;
    mapping(address => bool) public allowedAssets;
    mapping(address => mapping(bytes4 => uint256)) public override tradingBalanceByOperation;

    event EurPriceFeedSetted(address indexed newEurPriceFeed);
    event AssetAllowed(address indexed asset);
    event AssetDisallowed(address indexed asset);

    constructor(address _eurPriceFeed) public {
        eurPriceFeed = _eurPriceFeed;
    }

    /**
     * @dev Throws if called by any asset not allowed.
     */
    modifier onlyAllowedAsset() {
        require(allowedAssets[_msgSender()], "asset is not allowed");
        _;
    }

    function setEurPriceFeed(address _eurPriceFeed) public override onlyOwner returns (bool) {
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        emit EurPriceFeedSetted(_eurPriceFeed);
        eurPriceFeed = _eurPriceFeed;

        return true;
    }

    function allowAsset(address _asset) public override onlyOwner returns (bool) {
        require(_asset != address(0), "asset is the zero address");
        emit AssetAllowed(_asset);
        allowedAssets[_asset] = true;

        return true;
    }

    function disallowAsset(address _asset) public override onlyOwner returns (bool) {
        require(_asset != address(0), "asset is the zero address");
        emit AssetDisallowed(_asset);
        allowedAssets[_asset] = false;

        return true;
    }

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
