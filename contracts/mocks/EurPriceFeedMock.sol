//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/IEurPriceFeed.sol";

contract EurPriceFeedMock is IEurPriceFeed {
    // solhint-disable-next-line no-empty-blocks
    function getPrice(address) external override returns (uint256) {
    }

    function calculateAmount(address, uint256 _amount) external pure override returns (uint256) {
        return _amount;
    }

    // solhint-disable-next-line no-empty-blocks
    function setAssetsFeeds(address[] memory, address[] memory) external pure override {
    }

    // solhint-disable-next-line no-empty-blocks
    function setAssetFeed(address, address) external pure override {
    }
}
