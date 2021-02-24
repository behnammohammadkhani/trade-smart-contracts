//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./PermissionItems.sol";
import "./PermissionManagerStorage.sol";

import "hardhat/console.sol";

/**
 * @title PermissionManager
 * @author Protofire
 * @dev Provide tier based permissions assignments and revoking functions
 */
contract PermissionManager is Initializable, OwnableUpgradeable, PermissionManagerStorage {
    /**
     * @dev Emitted when `permissionItems` address is setted.
     */
    event PermissionItemsSetted(address indexed newPermissions);

    /**
     * @dev Initalize the contract.
     *
     * Sets ownership to the account that deploys the contract.
     *
     * Requirements:
     *
     * - `_permissionItems` should not be the zero address.
     *
     * @param _permissionItems The address of the new Pemissions module.
     */
    function initialize(address _permissionItems) public initializer {
        require(_permissionItems != address(0), "_permissionItems is the zero address");
        permissionItems = _permissionItems;

        __Ownable_init();

        emit PermissionItemsSetted(permissionItems);
    }

    /**
     * @dev Sets `_permissionItems` as the new permissionItems module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_permissionItems` should not be the zero address.
     *
     * @param _permissionItems The address of the new Pemissions module.
     */
    function setPermissionItems(address _permissionItems) public onlyOwner returns (bool) {
        require(_permissionItems != address(0), "_permissionItems is the zero address");
        emit PermissionItemsSetted(_permissionItems);
        permissionItems = _permissionItems;
        return true;
    }

    /**
     * @dev assigns Tier1 permission to `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should not have Tier1 already assigned.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function assingTier1(address _user, address _proxy) public onlyOwner {
        require(!hasTier1(_user), "PermissionManager: Address already has Tier 1 assigned");
        PermissionItems(permissionItems).mint(_user, TIER_1_ID, 1, "");

        if (_proxy != address(0)) {
            require(!hasTier1(_proxy), "PermissionManager: Proxy already has Tier 1 assigned");
            PermissionItems(permissionItems).mint(_proxy, TIER_1_ID, 1, "");
        }
    }

    /**
     * @dev assigns Tier2 permission to `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should not have Tier2 already assigned.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function assingTier2(address _user, address _proxy) public onlyOwner {
        require(!hasTier2(_user), "PermissionManager: Address already has Tier 2 assigned");
        PermissionItems(permissionItems).mint(_user, TIER_2_ID, 1, "");

        if (_proxy != address(0)) {
            require(!hasTier2(_proxy), "PermissionManager: Proxy already has Tier 2 assigned");
            PermissionItems(permissionItems).mint(_proxy, TIER_2_ID, 1, "");
        }
    }

    /**
     * @dev suspends pemissions effects on `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should not be already suspended.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function suspendUser(address _user, address _proxy) public onlyOwner {
        require(!isSuspended(_user), "PermissionManager: Address is already suspended");
        PermissionItems(permissionItems).mint(_user, SUSPENDED_ID, 1, "");

        if (_proxy != address(0)) {
            require(!isSuspended(_proxy), "PermissionManager: Proxy is already suspended");
            PermissionItems(permissionItems).mint(_proxy, SUSPENDED_ID, 1, "");
        }
    }

    /**
     * @dev removes Tier1 permission from `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should have Tier1 assigned.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function revokeTier1(address _user, address _proxy) public onlyOwner {
        require(hasTier1(_user), "PermissionManager: Address doesn't has Tier 1 assigned");
        PermissionItems(permissionItems).burn(_user, TIER_1_ID, 1);

        if (_proxy != address(0)) {
            require(hasTier1(_proxy), "PermissionManager: Proxy doesn't has Tier 1 assigned");
            PermissionItems(permissionItems).burn(_proxy, TIER_1_ID, 1);
        }
    }

    /**
     * @dev removes Tier2 permission from `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should have Tier2 assigned.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function revokeTier2(address _user, address _proxy) public onlyOwner {
        require(hasTier2(_user), "PermissionManager: Address doesn't has Tier 2 assigned");
        PermissionItems(permissionItems).burn(_user, TIER_2_ID, 1);

        if (_proxy != address(0)) {
            require(hasTier2(_proxy), "PermissionManager: Proxy doesn't has Tier 2 assigned");
            PermissionItems(permissionItems).burn(_proxy, TIER_2_ID, 1);
        }
    }

    /**
     * @dev re-activates pemissions effects on `_user`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_user` should be suspended.
     *
     * @param _user The address of the user.
     * @param _proxy The address of the user's proxy if it is not address zero.
     */
    function unsuspendUser(address _user, address _proxy) public onlyOwner {
        require(isSuspended(_user), "PermissionManager: Address is not currently suspended");
        PermissionItems(permissionItems).burn(_user, SUSPENDED_ID, 1);

        if (_proxy != address(0)) {
            require(isSuspended(_proxy), "PermissionManager: Proxy is not currently suspended");
            PermissionItems(permissionItems).burn(_proxy, SUSPENDED_ID, 1);
        }
    }

    function _hasItem(address _user, uint256 itemId) internal view returns (bool) {
        if (PermissionItems(permissionItems).balanceOf(_user, itemId) == 0) {
            return false;
        }
        return true;
    }

    /**
     * @dev Returns `true` if `_user` has been assigned Tier1 permission.
     *
     * @param _user The address of the user.
     */
    function hasTier1(address _user) public view returns (bool) {
        return _hasItem(_user, TIER_1_ID);
    }

    /**
     * @dev Returns `true` if `_user` has been assigned Tier2 permission.
     *
     * @param _user The address of the user.
     */
    function hasTier2(address _user) public view returns (bool) {
        return _hasItem(_user, TIER_2_ID);
    }

    /**
     * @dev Returns `true` if `_user` has been Suspended.
     *
     * @param _user The address of the user.
     */
    function isSuspended(address _user) public view returns (bool) {
        return _hasItem(_user, SUSPENDED_ID);
    }
}
