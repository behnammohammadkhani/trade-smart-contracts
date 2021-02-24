//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../authorization/IEurPriceFeed.sol";

contract EurPriceFeedMock is IEurPriceFeed {
    function getPrice(address) external override returns (uint256) {
        return 1;
    }

    function calculateAmount(address, uint256 _amount) external view override returns (uint256) {
        return _amount;
    }

    function setAssetsFeeds(address[] memory, address[] memory) external override {
        1;
    }

    function setAssetFeed(address, address) external override {
        1;
    }
}
