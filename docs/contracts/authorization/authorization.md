# `Authorization`

Contract module which provides an authorization mechanism.

This contract should be called by an Authorizable contract through its `onlyAuthorized` modifier.

## Functions:

- `initialize(address _permissions, address _eurPriceFeed, address _operationsRegistry, address _poolFactory, address _xTokenWrapper, uint256 _tradingLimit, bool _paused) (public)`

- `setPermissions(address _permissions) (public)`

- `setEurPriceFeed(address _eurPriceFeed) (public)`

- `setTradingLimint(uint256 _tradingLimit) (public)`

- `setOperationsRegistry(address _operationsRegistry) (public)`

- `setPoolFactory(address _poolFactory) (public)`

- `setXTokenWrapper(address _xTokenWrapper) (public)`

- `_setPermissions(address _permissions) (internal)`

- `_setEurPriceFeed(address _eurPriceFeed) (internal)`

- `_setTradingLimint(uint256 _tradingLimit) (internal)`

- `_setOperationsRegistry(address _operationsRegistry) (internal)`

- `_setPoolFactory(address _poolFactory) (internal)`

- `_setXTokenWrapper(address _xTokenWrapper) (internal)`

- `pause() (external)`

- `unpause() (external)`

- `isAuthorized(address _user, address _asset, bytes4 _operation, bytes _data) (public)`

- `checkERC20Permissions(address _sender, address _user, address _asset, bytes4 _operation, uint256 _amount) (internal)`

- `checkBFactoryPermissions(address _user) (internal)`

- `checkByTier(address _user, address _asset, bytes4 _operation, uint256 _amount, uint256[] _permissionsBlance) (internal)`

- `checkRejected(bytes4 _operation) (internal)`

- `checkProtocolContract(bytes4 _operation, uint256 _permissionUser, uint256 _permissionSender) (internal)`

- `isERC20Operation(bytes4 _operation) (internal)`

- `isBFactoryOperation(bytes4 _operation) (internal)`

## Events:

- `PermissionsSetted(address newPermissions)`

- `OperationsRegistrySetted(address newOperationsRegistry)`

- `TradingLimitSetted(uint256 newLimit)`

- `EurPriceFeedSetted(address newEurPriceFeed)`

- `PoolFactorySetted(address poolFactory)`

- `XTokenWrapperSetted(address xTokenWrapper)`

- `Paused(address account)`

- `Unpaused(address account)`

### Function `initialize(address _permissions, address _eurPriceFeed, address _operationsRegistry, address _poolFactory, address _xTokenWrapper, uint256 _tradingLimit, bool _paused) public`

Initalize the contract.

Sets ownership to the account that deploys the contract.

#### Parameters:

- `_permissions`: Permissions module address

- `_eurPriceFeed`: EurPriceFeed module address

- `_operationsRegistry`: OperationsRegistry address

- `_poolFactory`: Balancer BFactory address

- `_xTokenWrapper`: XTokenWrapper address

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

### Function `setPoolFactory(address _poolFactory) → bool public`

Sets `_poolFactory` as the new BFactory module.

Requirements:

- the caller must have be the owner.

- `_poolFactory` should not be the zero address.

#### Parameters:

- `_poolFactory`: The address of the new Balance BFactory module.

### Function `setXTokenWrapper(address _xTokenWrapper) → bool public`

Sets `_xTokenWrapper` as the new XTokenWrapper module.

Requirements:

- the caller must have be the owner.

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the new XTokenWrapper module.

### Function `_setPermissions(address _permissions) → bool internal`

Sets `_permissions` as the new Permissions module.

Requirements:

- `_permissions` should not be the zero address.

#### Parameters:

- `_permissions`: The address of the new Pemissions module.

### Function `_setEurPriceFeed(address _eurPriceFeed) → bool internal`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `_setTradingLimint(uint256 _tradingLimit) → bool internal`

Sets `_tradingLimit` as the new traiding limit for T1 users.

Requirements:

- `_tradingLimit` should not be 0.

#### Parameters:

- `_tradingLimit`: The value of the new traiding limit for T1 users.

### Function `_setOperationsRegistry(address _operationsRegistry) → bool internal`

Sets `_operationsRegistry` as the new OperationsRegistry module.

Requirements:

- `_operationsRegistry` should not be the zero address.

#### Parameters:

- `_operationsRegistry`: The address of the new OperationsRegistry module.

### Function `_setPoolFactory(address _poolFactory) → bool internal`

Sets `_poolFactory` as the new BFactory module.

Requirements:

- `_poolFactory` should not be the zero address.

#### Parameters:

- `_poolFactory`: The address of the new Balance BFactory module.

### Function `_setXTokenWrapper(address _xTokenWrapper) → bool internal`

Sets `_xTokenWrapper` as the new XTokenWrapper module.

Requirements:

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the new XTokenWrapper module.

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

### Function `checkERC20Permissions(address _sender, address _user, address _asset, bytes4 _operation, uint256 _amount) → bool internal`

Checks user permissions logic for ERC20 operations.

#### Parameters:

- `_sender`: address executing the operation.

- `_user`: user's address.

- `_asset`: address of the contract where `_operation` comes from.

- `_operation`: operation to authorized.

- `_amount`: operation amount.

### Function `checkBFactoryPermissions(address _user) → bool internal`

Checks user permissions logic for BFactory operations.

#### Parameters:

- `_user`: user's address.

### Function `checkByTier(address _user, address _asset, bytes4 _operation, uint256 _amount, uint256[] _permissionsBlance) → bool internal`

Checks user permissions by Tier logic.

#### Parameters:

- `_user`: user's address.

- `_asset`: address of the contract where `_operation` comes from.

- `_operation`: operation to authorized.

- `_amount`: operation amount.

- `_permissionsBlance`: user's permissions.

### Function `checkRejected(bytes4 _operation) → bool internal`

Checks user permissions when rejected.

#### Parameters:

- `_operation`: operation to authorized.

### Function `checkProtocolContract(bytes4 _operation, uint256 _permissionUser, uint256 _permissionSender) → bool internal`

Checks protocol contract type permissions .

#### Parameters:

- `_operation`: operation to authorized.

- `_permissionUser`: user's protocol contract permission.

- `_permissionSender`: sender's protocol contract permission.

### Function `isERC20Operation(bytes4 _operation) → bool internal`

Returns `true` if `_operation` is an ERC20 method.

#### Parameters:

- `_operation`: Method sig.

### Function `isBFactoryOperation(bytes4 _operation) → bool internal`

Returns `true` if `_operation` is a BFatory method.

#### Parameters:

- `_operation`: Method sig.

### Event `PermissionsSetted(address newPermissions)`

Emitted when `permissions` address is setted.

### Event `OperationsRegistrySetted(address newOperationsRegistry)`

Emitted when `operationsRegistry` address is setted.

### Event `TradingLimitSetted(uint256 newLimit)`

Emitted when `tradingLimit` value is setted.

### Event `EurPriceFeedSetted(address newEurPriceFeed)`

Emitted when `eurPriceFeed` address is setted.

### Event `PoolFactorySetted(address poolFactory)`

Emitted when `eurPriceFeed` address is setted.

### Event `XTokenWrapperSetted(address xTokenWrapper)`

Emitted when `eurPriceFeed` address is setted.

### Event `Paused(address account)`

Emitted when the pause is triggered by `account`.

### Event `Unpaused(address account)`

Emitted when the pause is lifted by `account`.
