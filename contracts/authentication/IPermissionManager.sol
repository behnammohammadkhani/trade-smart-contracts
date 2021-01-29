//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

/**
 * @title IPermissionManager
 * @author Protofire
 * @dev Interface to be implemented by any PermissionManager contract.
 */
interface IPermissionManager {
    /**
     * @dev Sets `_permissionItems` as the new PemissionsItems Implementation.
     *
     * @param _permissionItems The address of the new PemissionsItems contract.
     */
    function setPermissionItems(address _permissionItems) external returns (bool);

    /**
     * @dev assign Tier1 to `_user`. 
     */
    function assingTier1(address _user) external;

    /**
     * @dev assign Tier2 to `_user`. 
     */
    function assingTier2(address _user) external;

    /**
     * @dev suspend pemissions effects on `_user`. 
     */
    function suspendUser(address _user) external;

    /**
     * @dev remove Tier1 from `_user`. 
     */
    function revokeTier1(address _user) external;

    /**
    * @dev remove Tier2 from `_user`. 
    */
    function revokeTier2(address _user) external;

    /**
    * @dev re-activate pemissions effects on `_user`. 
    */
    function unsuspendUser(address _user) external;

    /**
     * @dev checks if Tier1 had been asigned to _user
     */
    function hasTier1(address _user) external returns (bool);

    /**
     * @dev checks if Tier2 had been asigned to _user
     */
    function hasTier2(address _user) external returns (bool);

    /**
     * @dev checks if pemissions effects are suspended _user
     */
    function isSuspended(address _user) external returns (bool);
}