//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.7/interfaces/AggregatorV2V3Interface.sol";

import "./IEurPriceFeed.sol";

import "hardhat/console.sol";

interface IDecimals {
    function decimals() external view returns (uint8);
}

/**
 * @title EurPriceFeed
 * @author Protofire
 * @dev Contract module to retrieve EUR price per asset.
 *
 */
contract EurPriceFeed is IEurPriceFeed, Ownable {
    using SafeMath for uint256;

    /// @dev mapping between an asset and its feed. It returs how many USD is 1eAssetDecimal asset.
    mapping(address => address) public assetUsdFeed;

    /// @dev EUR/USD feed. It returs how many USD is 1 EUR.
    address public eurUsdFeed;

    /**
     * @dev Emitted when `eurUsdFeed` address is setted.
     */
    event EurUsdFeedSetted(address indexed newEurUsdFeed);

    /**
     * @dev Emitted when `eurUsdFeed` address is setted.
     */
    event AssetUsdFeedSetted(address indexed asset, address indexed feed);

    /**
     * @dev Sets the values for {eurUsdFeed} and {assetUsdFeed}.
     *
     * Sets ownership to the account that deploys the contract.
     *
     */
    constructor(
        address _eurUsdFeed,
        address[] memory _assets,
        address[] memory _feeds
    ) public {
        require(_eurUsdFeed != address(0), "eur/usd price feed is the zero address");

        eurUsdFeed = _eurUsdFeed;

        _setAssetsFeeds(_assets, _feeds);
    }

    function setEurUsdFeed(address _eurUsdFeed) public onlyOwner {
        require(_eurUsdFeed != address(0), "eur/usd price feed is the zero address");
        emit EurUsdFeedSetted(_eurUsdFeed);
        eurUsdFeed = _eurUsdFeed;
    }

    function setAssetsFeeds(address[] memory _assets, address[] memory _feeds) external onlyOwner {
        _setAssetsFeeds(_assets, _feeds);
    }

    /**
     * @dev Gets the price 1 `_asset` in EUR.
     *
     * @param _asset address of asset to get the price.
     *
     * @return price scaled by 1e8, denominated in EUR
     * e.g. 17568900000 => 175.689 EUR
     */
    function getPrice(address _asset) external view override returns (uint256) {
        return _getPrice(_asset);
    }

    /**
     * @dev Gets how many EUR represents the `_amount` of `_asset`.
     *
     * @param _asset address of asset to get the price.
     * @param _amount amount of `_asset`.
     */
    function calculateAmount(address _asset, uint256 _amount) external view override returns (uint256) {
        uint8 assetDecimals = IDecimals(_asset).decimals();
        uint8 biggestExp = assetDecimals > 8 ? assetDecimals : 8;

        uint256 assetPrice = _getPrice(_asset).mul(10**(uint256(biggestExp) - 8)).mul(10**8);
        uint256 assetUnit = 10**uint256(biggestExp);

        return _amount.mul(assetPrice.div(assetUnit));
    }

    function _setAssetsFeeds(address[] memory _assets, address[] memory _feeds) internal {
        require(_assets.length == _feeds.length, "assets and feeds not the same size");

        for (uint256 i = 0; i < _assets.length; i++) {
            require(_assets[i] != address(0), "asset is the zero address");
            require(_feeds[i] != address(0), "asset feed is the zero address");
            emit AssetUsdFeedSetted(_assets[i], _feeds[i]);
            assetUsdFeed[_assets[i]] = _feeds[i];
        }
    }

    /**
     * @dev Gets the price 1 `_asset` in EUR.
     *
     * @param _asset address of asset to get the price.
     *
     * @return price scaled by 1e8, denominated in EUR
     * e.g. 17568900000 => 175.689 EUR
     */
    function _getPrice(address _asset) internal returns (uint256) {
        if (assetUsdFeed[_asset] != address(0)) {
            return 0;
        }

        uint256 eurUsdDecimals = AggregatorV2V3Interface(eurUsdFeed).decimals();
        int256 eurUsdPrice = AggregatorV2V3Interface(eurUsdFeed).latestAnswer();

        uint256 assetUsdDecimals = AggregatorV2V3Interface(assetUsdFeed[_asset]).decimals();
        int256 assetUsdPrice = AggregatorV2V3Interface(assetUsdFeed[_asset]).latestAnswer();

        if (eurUsdFeed == 0 || assetUsdPrice == 0) {
            return 0;
        }

        // (X x* 1e18)/(Y * 1e18) = X/Y = Z ==> (X * 1e18) * 1e8 / (Y * 1e18) = Z * 1e8
        uint256 den = eurUsdPrice.mul(10**(18 - eurUsdDecimals));
        uint256 num = assetUsdPrice.mul(10**(18 - assetUsdDecimals)).mul(10**8);

        return num.div(den);
    }
}
