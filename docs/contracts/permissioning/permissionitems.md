# `PermissionItems`

Contract module which provides a permissioning mechanism.

It inherits from standar ERC1155 and extends functionality for

role based acces control and makes tokens non-transferables.

## Functions:

- `constructor() (public)`

- `setAdmin(address account) (public)`

- `revokeAdmin(address account) (public)`

- `mint(address to, uint256 id, uint256 amount, bytes data) (public)`

- `mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) (public)`

- `burn(address account, uint256 id, uint256 value) (public)`

- `burnBatch(address account, uint256[] ids, uint256[] values) (public)`

- `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) (public)`

- `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) (public)`

### Function `constructor() public`

Grants the contract deployer the default admin role.

### Function `setAdmin(address account) public`

Grants TRANSFER role to `account`.

Grants MINTER role to `account`.

Grants BURNER role to `account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `revokeAdmin(address account) public`

Revokes TRANSFER role to `account`.

Revokes MINTER role to `account`.

Revokes BURNER role to `account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `mint(address to, uint256 id, uint256 amount, bytes data) public`

Creates `amount` tokens of token type `id`, and assigns them to `account`.

Emits a {TransferSingle} event.

Requirements:

- the caller must have MINTER role.

- `account` cannot be the zero address.

- If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the

acceptance magic value.

### Function `mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) public`

xref:ROOT:erc1155.adoc#batch-operations[Batched] variant of {mint}.

Requirements:

- `ids` and `amounts` must have the same length.

### Function `burn(address account, uint256 id, uint256 value) public`

Destroys `amount` tokens of token type `id` from `account`

Requirements:

- the caller must have BURNER role.

- `account` cannot be the zero address.

- `account` must have at least `amount` tokens of token type `id`.

### Function `burnBatch(address account, uint256[] ids, uint256[] values) public`

xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {burn}.

Requirements:

- `ids` and `amounts` must have the same length.

### Function `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) public`

Disabled safeTransferFrom function.

### Function `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) public`

Disabled safeBatchTransferFrom function.
