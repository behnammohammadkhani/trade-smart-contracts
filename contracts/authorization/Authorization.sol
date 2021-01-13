//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./IAuthorization.sol";
import "./AuthorizationStorage.sol";

import "hardhat/console.sol";

contract Authorization is IAuthorization, Initializable, OwnableUpgradeable, AuthorizationStorage {
    using SafeMathUpgradeable for uint256;

    event PermissionsSetted(address indexed previousPermissions, address indexed newPermissions);

    function initialize(address _permissions) public initializer {
        require(_permissions != address(0), "new permissions is the zero address");
        permissions = _permissions;
        __Ownable_init();

        emit PermissionsSetted(address(0), permissions);
    }

    function setPermissions(address _permissions) public override onlyOwner returns (bool) {
        require(_permissions != address(0), "new permissions is the zero address");
        emit PermissionsSetted(permissions, _permissions);
        permissions = _permissions;

        return true;
    }

    function isAuthorized(
        address _user,
        bytes4 _operation,
        address _asset,
        bytes calldata _data
    ) public view override returns (bool) {
        //ERC20
        if (_operation == ERC20_TRANSFER) {
            (address recipient, uint256 amount) = abi.decode(_data[4:], (address, uint256));
            console.log("TRANSFER", recipient, amount);
        }

        if (_operation == ERC20_TRANSFER_FROM) {
            (address sender, address recipient, uint256 amount) = abi.decode(_data[4:], (address, address, uint256));
            console.log("TRANSFER_FROM", sender, recipient, amount);
        }

        if (_operation == ERC20_APPROVE) {
            (address spender, uint256 amount) = abi.decode(_data[4:], (address, uint256));
            console.log("APPROVE",  spender, amount);
        }

        return true;
    }
}
