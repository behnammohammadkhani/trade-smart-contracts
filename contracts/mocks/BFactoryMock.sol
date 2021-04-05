//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../authorization/Authorizable.sol";
import "../interfaces/IAuthorization.sol";




contract BFactoryMock is Authorizable {
    bool public isBPoolAnswer = false;

    event LOG_NEW_POOL(address indexed caller);

    function setAuthorization(address authorization_) public {
        authorization = IAuthorization(authorization_);
    }

    function setIsBPoolAnswer(bool answer) public {
        isBPoolAnswer = answer;
    }

    function isBPool(address) external view returns (bool) {
        return isBPoolAnswer;
    }

    function newBPool()
        external
        onlyAuthorized
        returns (bool)
    {
        emit LOG_NEW_POOL(msg.sender);
        return true;
    }
}
