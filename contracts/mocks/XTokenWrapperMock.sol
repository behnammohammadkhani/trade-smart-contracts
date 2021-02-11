//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../token/IXToken.sol";

import "hardhat/console.sol";


contract XTokenWrapperMock  {
  IXToken public xToken;

  constructor() public {
      true;
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
