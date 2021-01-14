//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract PermissionsMock is ERC1155 {
  constructor (string memory uri_) ERC1155(uri_) public {}
}
