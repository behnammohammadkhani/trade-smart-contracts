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
    mapping(address => address) public assetEthFeed;

    /// @dev EUR/USD feed. It returs how many USD is 1 EUR.
    address public eurUsdFeed;

    /// @dev ETH/USD feed. It returs how many USD is 1 ETH.
    address public ethUsdFeed;

    /**
     * @dev Emitted when `eurUsdFeed` address is setted.
     */
    event EurUsdFeedSetted(address indexed newEurUsdFeed);

    /**
     * @dev Emitted when `ethUsdFeed` address is setted.
     */
    event EthUsdFeedSetted(address indexed newEthUsdFeed);

    /**
     * @dev Emitted when a feed address is setted for an asset.
     */
    event AssetEthFeedSetted(address indexed asset, address indexed feed);

    /**
     * @dev Sets the values for {eurUsdFeed}, {ethUsdFeed} and {assetUsdFeed}.
     *
     * Sets ownership to the account that deploys the contract.
     *
     */
    constructor(
        address _eurUsdFeed,
        address _ethUsdFeed,
        address[] memory _assets,
        address[] memory _feeds
    ) public {
        require(_eurUsdFeed != address(0), "eur/usd price feed is the zero address");
        require(_ethUsdFeed != address(0), "eth/usd price feed is the zero address");

        eurUsdFeed = _eurUsdFeed;
        emit EurUsdFeedSetted(_eurUsdFeed);

        ethUsdFeed = _ethUsdFeed;
        emit EthUsdFeedSetted(_ethUsdFeed);

        _setAssetsFeeds(_assets, _feeds);
    }

    /**
     * @dev Sets `_eurUsdFeed` as the new ERU/USD feed.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_eurUsdFeed` should not be the zero address.
     *
     * @param _eurUsdFeed The address of the new ERU/USD feed.
     */
    function setEurUsdFeed(address _eurUsdFeed) public onlyOwner {
        require(_eurUsdFeed != address(0), "eur/usd price feed is the zero address");
        emit EurUsdFeedSetted(_eurUsdFeed);
        eurUsdFeed = _eurUsdFeed;
    }

    /**
     * @dev Sets `_ethUsdFeed` as the new ERU/USD feed.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_ethUsdFeed` should not be the zero address.
     *
     * @param _ethUsdFeed The address of the new ERU/USD feed.
     */
    function setEthUsdFeed(address _ethUsdFeed) public onlyOwner {
        require(_ethUsdFeed != address(0), "eth/usd price feed is the zero address");
        emit EthUsdFeedSetted(_ethUsdFeed);
        ethUsdFeed = _ethUsdFeed;
    }

    /**
     * @dev Sets feed addresses for a given group of assets.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_assets` and `_feeds` lengths must match.
     * - every address in `_assets` should not be the zero address .
     * - every address in `_feeds` should not be the zero address .
     *
     * @param _assets Array of assets addresses.
     * @param _feeds Array of asset/ETH price feeds.
     */
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
        uint256 assetPrice = _getPrice(_asset);

        return _amount.mul(10**uint256(18 - assetDecimals)).mul(assetPrice);
    }

    function _setAssetsFeeds(address[] memory _assets, address[] memory _feeds) internal {
        require(_assets.length == _feeds.length, "assets and feeds lengths not match");

        for (uint256 i = 0; i < _assets.length; i++) {
            require(_assets[i] != address(0), "asset is the zero address");
            require(_feeds[i] != address(0), "asset feed is the zero address");
            emit AssetEthFeedSetted(_assets[i], _feeds[i]);
            assetEthFeed[_assets[i]] = _feeds[i];
        }
    }

    /**
     * @dev Gets the price 1 `_asset` in EUR.
     *
     * @param _asset address of asset to get the price.
     *
     * @return price scaled by 1e18, denominated in EUR
     */
    function _getPrice(address _asset) internal view returns (uint256) {
        if (assetEthFeed[_asset] == address(0)) {
            return 0;
        }

        uint256 eurUsdDecimals = AggregatorV2V3Interface(eurUsdFeed).decimals();
        int256 eurUsdPrice = AggregatorV2V3Interface(eurUsdFeed).latestAnswer();

        uint256 ethUsdDecimals = AggregatorV2V3Interface(ethUsdFeed).decimals();
        int256 ethUsdPrice = AggregatorV2V3Interface(ethUsdFeed).latestAnswer();

        uint256 assetEthDecimals = AggregatorV2V3Interface(assetEthFeed[_asset]).decimals();
        int256 assetEthPrice = AggregatorV2V3Interface(assetEthFeed[_asset]).latestAnswer();

        if (eurUsdPrice <= 0 || ethUsdPrice <= 0 || assetEthPrice <= 0) {
            return 0;
        }

        // (X x* 1e18)/(Y * 1e18) = X/Y = Z ==> (X * 1e18) * 1e8 / (Y * 1e18) = Z * 1e8
        // ETH/EUR
        // ETH/USD ==> 1 ETH -> 125375000000 USD (scale 1e8)
        // EUR/USD ==> 1 EUR -> 121376500 USD (scaled 1e8)
        //  125375000000 * 1e(18-8) USD  = 1e18 ETH
        //  121376500 * 1e(18-8) USD     = 1 EUR
        //  125375000000*1e(18-8) USD (1e18 ETH) = 125375000000*1e(18-8) / 121376500 * 1e(18-8) EUR

        uint256 num = uint256(ethUsdPrice).mul(10**(18 - ethUsdDecimals)).mul(10**18);
        uint256 den = uint256(eurUsdPrice).mul(10**(18 - eurUsdDecimals));

        uint256 ethEurPrice = num.div(den);

        // asset/EUR
        // DAI/ETH ==> 1 DAI -> 802500000000000 ETH (scaled 1e18)
        // 10**(18-daiUsdDecimal) DAI = 802500000000000 ETH
        // 1e18 ETH                   = ethEurPrice EUR
        // 802500000000000 ETH (1e18 DAI)_= (802500000000000 ETH * ethEurPrice / 1e18) EUR
        uint256 assetEurPrice = uint256(assetEthPrice).mul(10**(18 - assetEthDecimals)).mul(ethEurPrice).div(10**18);

        return assetEurPrice;
    }
}
