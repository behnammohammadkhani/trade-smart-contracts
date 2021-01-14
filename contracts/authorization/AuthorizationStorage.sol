//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

/**
 * All storage must be declared here
 * New storage must be appended to the end
 * Never remove items from this list
 */
abstract contract AuthorizationStorage {
    address public permissions;
    address public eurPriceFeed;
    uint256 public traidingLimit;
    mapping(address => mapping(bytes4 => uint256)) private traidingBalanceByAction;

    bytes4 public constant ERC20_TRANSFER = bytes4(keccak256("transfer(address,uint256)"));
    bytes4 public constant ERC20_TRANSFER_FROM = bytes4(keccak256("approve(address,amount)"));
    bytes4 public constant ERC20_APPROVE = bytes4(keccak256("approve(address,uint256)"));
    bytes4 public constant ERC20_MINT = bytes4(keccak256("mint(address,uint256)"));

    uint256 public constant TIER_1_ID = 1;
    uint256 public constant TIER_2_ID = 2;
}
