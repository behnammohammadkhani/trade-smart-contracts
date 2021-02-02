//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./IPermissionManager.sol";
import "./PermissionItems.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Burnable.sol";

/**
 * @title PermissionManager
 * @author Protofire
 * @dev Provide tier based permissions asignments and revoking functions
 */
contract PermissionManager is IPermissionManager, Initializable, OwnableUpgradeable {
    address public permissionItems;

    /**
     * @dev Emitted when `permissionItems` address is setted.
     */

    event PermissionItemsSetted(address indexed newPermissions);

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
     * - the caller must have be the owner.
     * - `_permissionItems` should not be the zero address.
     *
     * @param _permissionItems The address of the new Pemissions module.
     */
    function setPermissionItems(address _permissionItems) public override onlyOwner returns (bool) {
        require(_permissionItems != address(0), "_permissionItems is the zero address");
        emit PermissionItemsSetted(_permissionItems);
        permissionItems = _permissionItems;
        return true;
    }

    /**
     * @dev assign Tier1 to `_user`.
     */
    function assingTier1(address _user) public override {
        require(_user != address(0), "_user is the zero address");
        require(!_hasItem(_user, 1), "PermissionManager: User already has tier 1 assigned");
        PermissionItems(permissionItems).mint(_user, 1, 1, "");
    }

    /**
     * @dev assign Tier2 to `_user`.
     */
    function assingTier2(address _user) public override {
        require(_user != address(0), "_user is the zero address");
        require(!_hasItem(_user, 2), "PermissionManager: User already has tier 2 assigned");
        PermissionItems(permissionItems).mint(_user, 2, 1, "");
    }

    /**
     * @dev suspend pemissions effects on `_user`.
     */
    function suspendUser(address _user) public override {
        require(_user != address(0), "_user is the zero address");
        require(!_hasItem(_user, 0), "PermissionManager: User is already suspended");
        PermissionItems(permissionItems).mint(_user, 0, 1, "");
    }

    /**
     * @dev remove Tier1 from `_user`.
     */
    function revokeTier1(address _user) public override {
        require(_hasItem(_user, 1), "PermissionManager: User doens't has tier 1 assigned");
        PermissionItems(permissionItems).burn(_user, 1, 1);
    }

    /**
     * @dev remove Tier2 from `_user`.
     */
    function revokeTier2(address _user) public override {
        require(_hasItem(_user, 2), "PermissionManager: User doesn't has tier 2 assigned");
        PermissionItems(permissionItems).burn(_user, 2, 1);
    }

    /**
     * @dev re-activate pemissions effects on `_user`.
     */
    function unsuspendUser(address _user) public override {
        require(_hasItem(_user, 0), "PermissionManager: User is not currently suspended");
        PermissionItems(permissionItems).burn(_user, 0, 1);
    }

    function _hasItem(address _user, uint256 itemId) internal returns (bool) {
        if (PermissionItems(permissionItems).balanceOf(_user, itemId) == 0) {
            return false;
        }
        return true;
    }

    /**
     * @dev checks if Tier1 had been asigned to _user
     */
    function hasTier1(address _user) public override returns (bool) {
        return _hasItem(_user, 1);
    }

    /**
     * @dev checks if Tier2 had been asigned to _user
     */
    function hasTier2(address _user) public override returns (bool) {
        return _hasItem(_user, 2);
    }

    /**
     * @dev checks if pemissions effects are suspended _user
     */
    function isSuspended(address _user) public override returns (bool) {
        return _hasItem(_user, 0);
    }
}
