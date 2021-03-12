//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

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
    struct UserProxy {
        address user;
        address proxy;
    }

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
     * @dev assigns Tier1 permission to the list `_accounts`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - each address in `_accounts` should not have Tier1 already assigned.
     *
     * @param _accounts The addresses to assign Tier1.
     */
    function assingTier1(address[] memory _accounts) public onlyOwner {
        for (uint256 i = 0; i < _accounts.length; i++) {
            require(!hasTier1(_accounts[i]), "PermissionManager: Address already has Tier 1 assigned");
            PermissionItems(permissionItems).mint(_accounts[i], TIER_1_ID, 1, "");
        }
    }

    /**
     * @dev assigns Tier2 permission to a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should not have Tier2 already assigned.
     * - All proxy addresses in `_usersProxies` should not have Tier2 already assigned.
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where user and proxy are bout required.
     */
    function assingTier2(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(!hasTier2(userProxy.user), "PermissionManager: Address already has Tier 2 assigned");
            require(!hasTier2(userProxy.proxy), "PermissionManager: Proxy already has Tier 2 assigned");

            PermissionItems(permissionItems).mint(userProxy.user, TIER_2_ID, 1, "");
            PermissionItems(permissionItems).mint(userProxy.proxy, TIER_2_ID, 1, "");
        }
    }

    /**
     * @dev suspends pemissions effects to a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should not be already suspended.
     * - All proxy addresses in `_usersProxies` should not be already suspended.
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where is required
     *                      but proxy can be optional if it is set to zero address.
     */
    function suspendUser(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(!isSuspended(userProxy.user), "PermissionManager: Address is already suspended");
            PermissionItems(permissionItems).mint(userProxy.user, SUSPENDED_ID, 1, "");

            if (userProxy.proxy != address(0)) {
                require(!isSuspended(userProxy.proxy), "PermissionManager: Proxy is already suspended");
                PermissionItems(permissionItems).mint(userProxy.proxy, SUSPENDED_ID, 1, "");
            }
        }
    }

    /**
     * @dev Assigns Reject permission to a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should not be already rejected.
     * - All proxy addresses in `_usersProxies` should not be already rejected.
     *
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where is required
     *                      but proxy can be optional if it is set to zero address.
     */
    function rejectUser(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(!isRejected(userProxy.user), "PermissionManager: Address is already rejected");
            PermissionItems(permissionItems).mint(userProxy.user, REJECTED_ID, 1, "");

            if (userProxy.proxy != address(0)) {
                require(!isRejected(userProxy.proxy), "PermissionManager: Proxy is already rejected");
                PermissionItems(permissionItems).mint(userProxy.proxy, REJECTED_ID, 1, "");
            }
        }
    }

    /**
     * @dev removes Tier1 permission from the list `_accounts`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - each address in `_accounts` should have Tier1 assigned.
     *
     * @param _accounts The addresses to revoke Tier1.
     */
    function revokeTier1(address[] memory _accounts) public onlyOwner {
        for (uint256 i = 0; i < _accounts.length; i++) {
            require(hasTier1(_accounts[i]), "PermissionManager: Address doesn't has Tier 1 assigned");
            PermissionItems(permissionItems).burn(_accounts[i], TIER_1_ID, 1);
        }
    }

    /**
     * @dev removes Tier2 permission from a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should have Tier2 assigned.
     * - All proxy addresses in should have Tier2 assigned.
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where user and proxy are bout required.
     */
    function revokeTier2(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(hasTier2(userProxy.user), "PermissionManager: Address doesn't has Tier 2 assigned");
            require(hasTier2(userProxy.proxy), "PermissionManager: Proxy doesn't has Tier 2 assigned");

            PermissionItems(permissionItems).burn(userProxy.user, TIER_2_ID, 1);
            PermissionItems(permissionItems).burn(userProxy.proxy, TIER_2_ID, 1);
        }
    }

    /**
     * @dev re-activates pemissions effects on a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should be suspended.
     * - All proxy addresses in `_usersProxies` should be suspended.
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where is required
     *                      but proxy can be optional if it is set to zero address.
     */
    function unsuspendUser(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(isSuspended(userProxy.user), "PermissionManager: Address is not currently suspended");
            PermissionItems(permissionItems).burn(userProxy.user, SUSPENDED_ID, 1);

            if (userProxy.proxy != address(0)) {
                require(isSuspended(userProxy.proxy), "PermissionManager: Proxy is not currently suspended");
                PermissionItems(permissionItems).burn(userProxy.proxy, SUSPENDED_ID, 1);
            }
        }
    }

    /**
     * @dev Removes Reject permission from a list of users and proxies.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - All user addresses in `_usersProxies` should be rejected.
     * - All proxy addresses in `_usersProxies` should be rejected.
     *
     *
     * @param _usersProxies The addresses of the users and proxies.
     *                      An array of the struct UserProxy where is required
     *                      but proxy can be optional if it is set to zero address.
     */
    function unrejectUser(UserProxy[] memory _usersProxies) public onlyOwner {
        for (uint256 i = 0; i < _usersProxies.length; i++) {
            UserProxy memory userProxy = _usersProxies[i];
            require(isRejected(userProxy.user), "PermissionManager: Address is not currently rejected");
            PermissionItems(permissionItems).burn(userProxy.user, REJECTED_ID, 1);

            if (userProxy.proxy != address(0)) {
                require(isRejected(userProxy.proxy), "PermissionManager: Proxy is not currently rejected");
                PermissionItems(permissionItems).burn(userProxy.proxy, REJECTED_ID, 1);
            }
        }
    }

    /**
     * @dev assigns specific item `_itemId` to the list `_accounts`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - each address in `_accounts` should not have `_itemId` already assigned.
     *
     * @param _itemId Item to be assigned.
     * @param _accounts The addresses to assign Tier1.
     */
    function assignItem(uint256 _itemId, address[] memory _accounts) public onlyOwner {
        for (uint256 i = 0; i < _accounts.length; i++) {
            require(!_hasItem(_accounts[i], _itemId), "PermissionManager: Account is assigned with item");
            PermissionItems(permissionItems).mint(_accounts[i], _itemId, 1, "");
        }
    }

    /**
     * @dev removes specific item `_itemId` to the list `_accounts`.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - each address in `_accounts` should have `_itemId` already assigned.
     *
     * @param _itemId Item to be removeded
     * @param _accounts The addresses to assign Tier1.
     */
    function removeItem(uint256 _itemId, address[] memory _accounts) public onlyOwner {
        for (uint256 i = 0; i < _accounts.length; i++) {
            require(_hasItem(_accounts[i], _itemId), "PermissionManager: Account is not assigned with item");
            PermissionItems(permissionItems).burn(_accounts[i], _itemId, 1);
        }
    }

    function _hasItem(address _user, uint256 itemId) internal view returns (bool) {
        if (PermissionItems(permissionItems).balanceOf(_user, itemId) == 0) {
            return false;
        }
        return true;
    }

    /**
     * @dev Returns `true` if `_account` has been assigned Tier1 permission.
     *
     * @param _account The address of the user.
     */
    function hasTier1(address _account) public view returns (bool) {
        return _hasItem(_account, TIER_1_ID);
    }

    /**
     * @dev Returns `true` if `_account` has been assigned Tier2 permission.
     *
     * @param _account The address of the user.
     */
    function hasTier2(address _account) public view returns (bool) {
        return _hasItem(_account, TIER_2_ID);
    }

    /**
     * @dev Returns `true` if `_account` has been Suspended.
     *
     * @param _account The address of the user.
     */
    function isSuspended(address _account) public view returns (bool) {
        return _hasItem(_account, SUSPENDED_ID);
    }

    /**
     * @dev Returns `true` if `_account` has been Rejected.
     *
     * @param _account The address of the user.
     */
    function isRejected(address _account) public view returns (bool) {
        return _hasItem(_account, REJECTED_ID);
    }
}
