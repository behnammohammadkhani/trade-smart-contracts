// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "hardhat/console.sol";

contract PermissioningItems is ERC1155 {
    // We encourage minter to use
    uint256 public constant TIER1 = 1;
    uint256 public constant TIER2 = 2;

    constructor() public ERC1155("no metadata here") {
        _mint(msg.sender, TIER1, 1, "");
        _mint(msg.sender, TIER2, 2, "");
        console.log("Deploying a PermissioningItems with TIER1:", TIER1, "and TIER2: ", TIER2);
    }
}
