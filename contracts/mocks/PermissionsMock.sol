//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract PermissionsMock is ERC1155 {
    // solhint-disable-next-line
    constructor(string memory uri_) public ERC1155(uri_) {}

    function assingTier1(address _user) public {
        _mint(_user, 1, 1, "");
    }

    function assingTier2(address _user) public {
        _mint(_user, 2, 1, "");
    }

    function pauseUser(address _user) public {
        _mint(_user, 3, 1, "");
    }
}
