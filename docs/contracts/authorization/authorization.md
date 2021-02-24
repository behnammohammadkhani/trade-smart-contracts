# `Authorization`

Contract module which provides an authorization mechanism.

This contract should be called by an Authorizable contract through its `onlyAuthorized` modifier.

## Functions:

- `initialize(address _permissions, address _eurPriceFeed, address _operationsRegistry, uint256 _tradingLimit, bool _paused) (public)`

- `setPermissions(address _permissions) (public)`

- `setEurPriceFeed(address _eurPriceFeed) (public)`

- `setTradingLimint(uint256 _tradingLimit) (public)`

- `setOperationsRegistry(address _operationsRegistry) (public)`

- `pause() (external)`

- `unpause() (external)`

- `isAuthorized(address _user, address _asset, bytes4 _operation, bytes _data) (public)`

- `checkPermissions(address _user, address _asset, bytes4 _operation, uint256 amount) (internal)`

## Events:

- `PermissionsSetted(address newPermissions)`

- `OperationsRegistrySetted(address newOperationsRegistry)`

- `TradingLimitSetted(uint256 newLimit)`

- `EurPriceFeedSetted(address newEurPriceFeed)`

- `Paused(address account)`

- `Unpaused(address account)`

### Function `initialize(address _permissions, address _eurPriceFeed, address _operationsRegistry, uint256 _tradingLimit, bool _paused) public`

Initalize the contract.

Sets ownership to the account that deploys the contract.

#### Parameters:

- `_permissions`: Permissions module address

- `_eurPriceFeed`: EurPriceFeed module address

- `_operationsRegistry`: OperationsRegistry address

- `_tradingLimit`: Traiding limit value

- `_paused`: Pause protocol

### Function `setPermissions(address _permissions) → bool public`

Sets `_permissions` as the new Permissions module.

Requirements:

- the caller must have be the owner.

- `_permissions` should not be the zero address.

#### Parameters:

- `_permissions`: The address of the new Pemissions module.

### Function `setEurPriceFeed(address _eurPriceFeed) → bool public`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must have be the owner.

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `setTradingLimint(uint256 _tradingLimit) → bool public`

Sets `_tradingLimit` as the new traiding limit for T1 users.

Requirements:

- the caller must have be the owner.

- `_tradingLimit` should not be 0.

#### Parameters:

- `_tradingLimit`: The value of the new traiding limit for T1 users.

### Function `setOperationsRegistry(address _operationsRegistry) → bool public`

Sets `_operationsRegistry` as the new OperationsRegistry module.

Requirements:

- the caller must have be the owner.

- `_operationsRegistry` should not be the zero address.

#### Parameters:

- `_operationsRegistry`: The address of the new OperationsRegistry module.

### Function `pause() external`

Triggers stopped state.

Requirements:

- The contract must not be paused.

### Function `unpause() external`

Returns to normal state.

Requirements:

- The contract must be paused.

### Function `isAuthorized(address _user, address _asset, bytes4 _operation, bytes _data) → bool public`

Determins if a user is allowed to perform an operation.

#### Parameters:

- `_user`: msg.sender from function using Authorizable `onlyAuthorized` modifier.

- `_asset`: address of the contract using Authorizable `onlyAuthorized` modifier.

- `_operation`: msg.sig from function using Authorizable `onlyAuthorized` modifier.

- `_data`: msg.data from function using Authorizable `onlyAuthorized` modifier.

#### Return Values:

- a boolean signaling the authorization.

### Function `checkPermissions(address _user, address _asset, bytes4 _operation, uint256 amount) → bool internal`

Checks user permissions logic.

#### Parameters:

- `_user`: user's address.

- `_asset`: address of the contract where `_operation` comes from.

- `_operation`: operation to authorized.

- `amount`: operation amount.

### Event `PermissionsSetted(address newPermissions)`

Emitted when `permissions` address is setted.

### Event `OperationsRegistrySetted(address newOperationsRegistry)`

Emitted when `operationsRegistry` address is setted.

### Event `TradingLimitSetted(uint256 newLimit)`

Emitted when `tradingLimit` value is setted.

### Event `EurPriceFeedSetted(address newEurPriceFeed)`

Emitted when `eurPriceFeed` address is setted.

### Event `Paused(address account)`

Emitted when the pause is triggered by `account`.

### Event `Unpaused(address account)`

Emitted when the pause is lifted by `account`.
