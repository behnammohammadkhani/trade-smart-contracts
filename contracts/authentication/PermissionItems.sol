// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Burnable.sol";

/**
 * @title PermissionItems
 * @author Protofire
 * @dev Contract module which provides an authorization mechanism.
 * This module is used through inheritance. It inherits from standar ERC1155 and 
 * extends functionality for role based acces control.
 */

contract PermissionItems is ERC1155, ERC1155Burnable, AccessControl {

     // Constants for roles asignments
    bytes32 public constant TRANSFERER_ROLE = keccak256("TRANSFER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Constants for item ID
    uint256 public constant SUSPENDED = 0;
    uint256 public constant TIER1 = 1;
    uint256 public constant TIER2 = 2;

    //
    constructor() public ERC1155("") {
        _mint(msg.sender, TIER1, 1, "");
        _mint(msg.sender, TIER2, 2, "");

         _setupRole(TRANSFERER_ROLE, msg.sender);
         _setupRole(MINTER_ROLE, msg.sender);
         _setupRole(BURNER_ROLE, msg.sender);
         _setupRole(PAUSER_ROLE, msg.sender);
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "PermissionItems: must have minter role to mint");

        super._mint(to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "PermissionItems: must have minter role to mint");

        super._mintBatch(to, ids, amounts, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        virtual
        override
    {
        require(hasRole(TRANSFERER_ROLE, _msgSender()), "PermissionItems: Must have transferer role to transfer");
        super.safeTransferFrom(from,to,id,amount,data);
    }


     /**
     * @dev See {IERC1155-safeBatchTransferFrom}.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        public
        override
    {
        require(hasRole(TRANSFERER_ROLE, _msgSender()), "PermissionItems: must have trasnferer role to transfer");
        super.safeBatchTransferFrom(from,to,ids,amounts,data);
    }

    function burn(address account, uint256 id, uint256 value) public override {
        require(hasRole(BURNER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have burner role to burn");
        super.burn(account, id, value);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory values) public override {
         require(hasRole(BURNER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have burner role to burn");
        super.burnBatch(account, ids, values);
    }
}
