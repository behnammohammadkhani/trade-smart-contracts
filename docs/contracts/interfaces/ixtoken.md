# `IXToken`

XToken Interface.

## Functions:

- `pause() (external)`

- `unpause() (external)`

- `setAuthorization(address authorization_) (external)`

- `setOperationsRegistry(address operationsRegistry_) (external)`

- `setKya(string kya_) (external)`

- `mint(address account, uint256 amount) (external)`

- `burnFrom(address account, uint256 amount) (external)`

### Function `pause() external`

Triggers stopped state.

### Function `unpause() external`

Returns to normal state.

### Function `setAuthorization(address authorization_) external`

Sets authorization.

### Function `setOperationsRegistry(address operationsRegistry_) external`

Sets operationsRegistry.

### Function `setKya(string kya_) external`

Sets kya.

### Function `mint(address account, uint256 amount) external`

Creates `amount` tokens and assigns them to `account`, increasing

the total supply.

### Function `burnFrom(address account, uint256 amount) external`

Destroys `amount` tokens from `account`, reducing the

total supply.
