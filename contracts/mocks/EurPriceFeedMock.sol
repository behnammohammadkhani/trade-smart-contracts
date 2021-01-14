//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../authorization/IEurPriceFeed.sol";

contract EurPriceFeedMock is IEurPriceFeed {
    function getPrice(address _asset) external override returns (uint256) {
        return 1;
    }
}
