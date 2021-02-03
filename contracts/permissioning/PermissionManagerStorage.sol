//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

/**
 * @title PemissionManagerStorage
 * @author Protofire
 * @dev Storage structure used by PermissionManager contract.
 *
 * All storage must be declared here
 * New storage must be appended to the end
 * Never remove items from this list
 */
abstract contract PermissionManagerStorage {
    address public permissionItems;
}
