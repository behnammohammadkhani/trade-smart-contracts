# `PermissionManager`

Provide tier based permissions assignments and revoking functions

## Functions:

- `initialize(address _permissionItems) (public)`

- `setPermissionItems(address _permissionItems) (public)`

- `assingTier1(address[] _accounts) (public)`

- `assingTier2(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `suspendUser(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `rejectUser(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `revokeTier1(address[] _accounts) (public)`

- `revokeTier2(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `unsuspendUser(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `unrejectUser(struct PermissionManager.UserProxy[] _usersProxies) (public)`

- `_hasItem(address _user, uint256 itemId) (internal)`

- `hasTier1(address _account) (public)`

- `hasTier2(address _account) (public)`

- `isSuspended(address _account) (public)`

- `isRejected(address _account) (public)`

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

### Function `assingTier1(address[] _accounts) public`

assigns Tier1 permission to the list `_accounts`.

Requirements:

- the caller must be the owner.

- each address in `_accounts` should not have Tier1 already assigned.

#### Parameters:

- `_accounts`: The addresses to assign Tier1.

### Function `assingTier2(struct PermissionManager.UserProxy[] _usersProxies) public`

assigns Tier2 permission to a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should not have Tier2 already assigned.

- All proxy addresses in `_usersProxies` should not have Tier2 already assigned.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where user and proxy are bout required.

### Function `suspendUser(struct PermissionManager.UserProxy[] _usersProxies) public`

suspends pemissions effects to a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should not be already suspended.

- All proxy addresses in `_usersProxies` should not be already suspended.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where is required

                     but proxy can be optional if it is set to zero address.

### Function `rejectUser(struct PermissionManager.UserProxy[] _usersProxies) public`

Assigns Reject permission to a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should not be already rejected.

- All proxy addresses in `_usersProxies` should not be already rejected.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where is required

                     but proxy can be optional if it is set to zero address.

### Function `revokeTier1(address[] _accounts) public`

removes Tier1 permission from the list `_accounts`.

Requirements:

- the caller must be the owner.

- each address in `_accounts` should have Tier1 assigned.

#### Parameters:

- `_accounts`: The addresses to revoke Tier1.

### Function `revokeTier2(struct PermissionManager.UserProxy[] _usersProxies) public`

removes Tier2 permission from a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should have Tier2 assigned.

- All proxy addresses in should have Tier2 assigned.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where user and proxy are bout required.

### Function `unsuspendUser(struct PermissionManager.UserProxy[] _usersProxies) public`

re-activates pemissions effects on a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should be suspended.

- All proxy addresses in `_usersProxies` should be suspended.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where is required

                     but proxy can be optional if it is set to zero address.

### Function `unrejectUser(struct PermissionManager.UserProxy[] _usersProxies) public`

Removes Reject permission from a list of users and proxies.

Requirements:

- the caller must be the owner.

- All user addresses in `_usersProxies` should be rejected.

- All proxy addresses in `_usersProxies` should be rejected.

#### Parameters:

- `_usersProxies`: The addresses of the users and proxies.

                     An array of the struct UserProxy where is required

                     but proxy can be optional if it is set to zero address.

### Function `_hasItem(address _user, uint256 itemId) → bool internal`

### Function `hasTier1(address _account) → bool public`

Returns `true` if `_account` has been assigned Tier1 permission.

#### Parameters:

- `_account`: The address of the user.

### Function `hasTier2(address _account) → bool public`

Returns `true` if `_account` has been assigned Tier2 permission.

#### Parameters:

- `_account`: The address of the user.

### Function `isSuspended(address _account) → bool public`

Returns `true` if `_account` has been Suspended.

#### Parameters:

- `_account`: The address of the user.

### Function `isRejected(address _account) → bool public`

Returns `true` if `_account` has been Rejected.

#### Parameters:

- `_account`: The address of the user.

### Event `PermissionItemsSetted(address newPermissions)`

Emitted when `permissionItems` address is setted.