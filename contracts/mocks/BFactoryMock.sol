pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract BFactoryMock {
    bool public isBPoolAnswer = false;

    function setIsBPoolAnswer(bool answer) public {
        isBPoolAnswer = answer;
    }

    function isBPool(address) external view returns (bool) {
        return isBPoolAnswer;
    }
}
