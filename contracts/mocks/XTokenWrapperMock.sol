//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155Holder.sol";

import "../token/IXToken.sol";

import "hardhat/console.sol";

contract XTokenWrapperMock is ERC1155Holder {
    IXToken public xToken;

    constructor() public {
        true;
    }

    function xTokenToToken(address xToken) public returns (address) {
        return xToken;
    }

    function wrap(address _xToken, uint256 _amount) public payable returns (bool) {
        IXToken(_xToken).mint(msg.sender, _amount);
        return true;
    }

    function unwrap(address _xToken, uint256 _amount) public payable returns (bool) {
        IXToken(_xToken).burnFrom(msg.sender, _amount);
        return true;
    }
}
