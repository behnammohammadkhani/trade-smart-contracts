//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155Holder.sol";

import "../interfaces/IXToken.sol";



contract XTokenWrapperMock is ERC1155Holder {
    IXToken public xToken;

    function xTokenToToken(address _xToken) public pure returns (address) {
        return _xToken;
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
