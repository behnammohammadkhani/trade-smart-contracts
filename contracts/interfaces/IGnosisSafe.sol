//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

/**
 * @title IOwnerManager
 * @author Protofire
 * @dev Interface definig some of the method on GnosisSafe contract.
 *
 */
interface IGnosisSafe {
    /// @dev Returns array of owners.
    /// @return Array of Safe owners.
    function getOwners() external view returns (address[] memory);
}
