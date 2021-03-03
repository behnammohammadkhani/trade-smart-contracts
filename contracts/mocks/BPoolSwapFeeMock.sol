pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract BPoolSwapFeeMock  {
  uint private _swapFee;

  constructor(uint swapFee) public {
    setSwapFee(swapFee);
  }

  function setSwapFee(uint swapFee) public {
    _swapFee = swapFee;
  }

  function getSwapFee() public returns (uint) {
    return _swapFee;
  }
}
