# `PermissionManager`

Provide tier based permissions asignments and revoking functions

## Functions:

- `initialize(address _permissionItems) (public)`

- `setPermissionItems(address _permissionItems) (public)`

- `assingTier1(address _user) (public)`

- `assingTier2(address _user) (public)`

- `suspendUser(address _user) (public)`

- `revokeTier1(address _user) (public)`

- `revokeTier2(address _user) (public)`

- `unsuspendUser(address _user) (public)`

- `_hasItem(address _user, uint256 itemId) (internal)`

- `hasTier1(address _user) (public)`

- `hasTier2(address _user) (public)`

- `isSuspended(address _user) (public)`

## Events:

- `PermissionItemsSetted(address newPermissions)`

### Function `initialize(address _permissionItems) public`

Initalize the contract.

Sets ownership to the account that deploys the contract.

Requirements:

- `_permissionItems` should not be the zero address.

#### Parameters:

- `_permissionItems`: The address of the new Pemissions module.

### Function `setPermissionItems(address _permissionItems) → bool public`

Sets `_permissionItems` as the new permissionItems module.

Requirements:

- the caller must be the owner.

- `_permissionItems` should not be the zero address.

#### Parameters:

- `_permissionItems`: The address of the new Pemissions module.

### Function `assingTier1(address _user) public`

assign Tier1 permission to `_user`.

Requirements:

- the caller must be the owner.

- `_user` should not have Tier1 already assigned.

#### Parameters:

- `_user`: The address of the user.

### Function `assingTier2(address _user) public`

assign Tier2 permission to `_user`.

Requirements:

- the caller must be the owner.

- `_user` should not have Tier2 already assigned.

#### Parameters:

- `_user`: The address of the user.

### Function `suspendUser(address _user) public`

suspend pemissions effects on `_user`.

Requirements:

- the caller must be the owner.

- `_user` should not be already suspended.

#### Parameters:

- `_user`: The address of the user.

### Function `revokeTier1(address _user) public`

remove Tier1 permission from `_user`.

Requirements:

- the caller must be the owner.

- `_user` should have Tier1 assigned.

#### Parameters:

- `_user`: The address of the user.

### Function `revokeTier2(address _user) public`

remove Tier2 permission from `_user`.

Requirements:

- the caller must be the owner.

- `_user` should have Tier2 assigned.

#### Parameters:

- `_user`: The address of the user.

### Function `unsuspendUser(address _user) public`

re-activate pemissions effects on `_user`.

Requirements:

- the caller must be the owner.

- `_user` should be suspended.

#### Parameters:

- `_user`: The address of the user.

### Function `_hasItem(address _user, uint256 itemId) → bool internal`

### Function `hasTier1(address _user) → bool public`

Returns `true` if `_user` has been assigned Tier1 permission.

#### Parameters:

- `_user`: The address of the user.

### Function `hasTier2(address _user) → bool public`

Returns `true` if `_user` has been assigned Tier2 permission .

#### Parameters:

- `_user`: The address of the user.

### Function `isSuspended(address _user) → bool public`

Returns `true` if `_user` has been Suspended.

#### Parameters:

- `_user`: The address of the user.

### Event `PermissionItemsSetted(address newPermissions)`

Emitted when `permissionItems` address is setted.
