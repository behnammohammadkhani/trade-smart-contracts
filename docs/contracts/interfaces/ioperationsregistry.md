# `IOperationsRegistry`

Interface to be implemented by any OperationRegistry logic contract use in the protocol.

## Functions:

- `tradingBalanceByOperation(address _user, bytes4 _operation) (external)`

- `setEurPriceFeed(address _eurPriceFeed) (external)`

- `allowAsset(address _asset) (external)`

- `disallowAsset(address _asset) (external)`

- `addTrade(address _user, bytes4 _operation, uint256 _amount) (external)`

### Function `tradingBalanceByOperation(address _user, bytes4 _operation) → uint256 external`

Gets the balance traded by `_user` for an `_operation`.

#### Parameters:

- `_user`: user's address

- `_operation`: msg.sig of the function considered an operation.

### Function `setEurPriceFeed(address _eurPriceFeed) external`

Sets `_eurPriceFeed` as the new EUR Price feed module.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `allowAsset(address _asset) external`

Sets `_asset` as allowed for calling `addTrade`.

#### Parameters:

- `_asset`: asset's address.

### Function `disallowAsset(address _asset) external`

Sets `_asset` as disallowed for calling `addTrade`.

#### Parameters:

- `_asset`: asset's address.

### Function `addTrade(address _user, bytes4 _operation, uint256 _amount) external`

Adds `_amount` converted to ERU to the balance traded by `_user` for an `_operation`.

#### Parameters:

- `_user`: user's address

- `_operation`: msg.sig of the function considered an operation.

- `_amount`: msg.sig of the function considered an operation.
