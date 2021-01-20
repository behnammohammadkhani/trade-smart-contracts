# `IAuthorization`

Interface to be implemented by any Authorization logic contract.

## Functions:

- `setPermissions(address _permissions) (external)`

- `setEurPriceFeed(address _eurPriceFeed) (external)`

- `setOperationsRegistry(address _operationsRegistry) (external)`

- `setTradingLimint(uint256 _tradingLimit) (external)`

- `isAuthorized(address _user, address _asset, bytes4 _operation, bytes _data) (external)`

### Function `setPermissions(address _permissions) → bool external`

Sets `_permissions` as the new Permissions module.

#### Parameters:

- `_permissions`: The address of the new Pemissions module.

### Function `setEurPriceFeed(address _eurPriceFeed) → bool external`

Sets `_eurPriceFeed` as the new EUR Price feed module.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `setOperationsRegistry(address _operationsRegistry) → bool external`

Sets `_operationsRegistry` as the new OperationsRegistry module.

#### Parameters:

- `_operationsRegistry`: The address of the new OperationsRegistry module.

### Function `setTradingLimint(uint256 _tradingLimit) → bool external`

Sets `_tradingLimit` as the new traiding limit.

#### Parameters:

- `_tradingLimit`: The value of the new traiding limit.

### Function `isAuthorized(address _user, address _asset, bytes4 _operation, bytes _data) → bool external`

Determins if a user is allowed to perform an operation.

#### Parameters:

- `_user`: msg.sender from function using Authorizable `onlyAuthorized` modifier.

- `_asset`: address of the contract using Authorizable `onlyAuthorized` modifier.

- `_operation`: msg.sig from function using Authorizable `onlyAuthorized` modifier.

- `_data`: msg.data from function using Authorizable `onlyAuthorized` modifier.

#### Return Values:

- a boolean signaling the authorization.
