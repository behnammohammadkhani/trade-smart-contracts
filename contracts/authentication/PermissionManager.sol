//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PermissionItems.sol";
/**
 * @title PermissionManager
 * @author Protofire
 * @dev Provide tier based permissions asignments and revoking funtcions
 */
contract PermissionManager is Ownable {

    PermissionItems public permissionItems; 

    constructor() public {
        permissionItems = new PermissionItems();
    }

    // Assign tiers
    function assingTier1(address _user) public {
        require(!_hasItem(_user, 1), "PermissionManager: User already has tier 1 assigned");
        permissionItems.mint(_user, 1, 1, "");
    }

    function assingTier2(address _user) public {
        require(!_hasItem(_user, 2), "PermissionManager: User already has tier 2 assigned");
        permissionItems.mint(_user, 2, 1, "");
    }
    // Suspend User
    function suspendUser(address _user) public {
         require(!_hasItem(_user, 0), "PermissionManager: User is already suspended");
        permissionItems.mint(_user, 0, 1, "");
    }

    // Revoke tiers
    function revokeTier1(address _user) public {
        require(_hasItem(_user, 1), "PermissionManager: User doens't has tier 1 assigned");
        permissionItems.burn(_user, 1, 1);
    }

    function revokeTier2(address _user) public {
        require(_hasItem(_user, 2), "PermissionManager: User doesn't has tier 2 assigned");
        permissionItems.burn(_user, 2, 1);
    }

    // Unsuspend user
    function unsuspendUser(address _user) public {
         require(_hasItem(_user, 0), "PermissionManager: User is not currently suspended");
        permissionItems.burn(_user, 0, 1);
    }

    function _hasItem(address _user, uint256 itemId) internal returns (bool) {
        if (permissionItems.balanceOf(_user,itemId) == 0){
            return false;
        }
            return true;
    }
}