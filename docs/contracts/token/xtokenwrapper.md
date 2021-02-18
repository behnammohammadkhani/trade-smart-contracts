# `XTokenWrapper`

Contract module which provides an functionality for wrapping tokens into the corresponding XToken.

## Functions:

- `constructor() (public)`

- `setRegistryManager(address _registryManager) (external)`

- `registerToken(address _token, address _xToken) (external)`

- `wrap(address _token, uint256 _amount) (external)`

- `unwrap(address _xToken, uint256 _amount) (external)`

## Events:

- `RegisterToken(address token, address xToken)`

### Function `constructor() public`

Grants the contract deployer the default admin role.

### Function `setRegistryManager(address _registryManager) external`

Grants REGISTRY_MANAGER_ROLE to `_registryManager`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `registerToken(address _token, address _xToken) external`

### Function `wrap(address _token, uint256 _amount) → bool external`

### Function `unwrap(address _xToken, uint256 _amount) → bool external`

### Event `RegisterToken(address token, address xToken)`

Emitted when `asset` is disallowed.
