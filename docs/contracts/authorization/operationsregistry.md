# `OperationsRegistry`

Contract module to keep track of the EUR amount being tradded for each user by operation.

## Modifiers:

- `onlyAllowedAsset()`

## Functions:

- `constructor(address _eurPriceFeed) (public)`

- `setEurPriceFeed(address _eurPriceFeed) (public)`

- `allowAsset(address _asset) (public)`

- `disallowAsset(address _asset) (public)`

- `addTrade(address _user, bytes4 _operation, uint256 _amount) (public)`

## Events:

- `EurPriceFeedSetted(address newEurPriceFeed)`

- `AssetAllowed(address asset)`

- `AssetDisallowed(address asset)`

### Modifier `onlyAllowedAsset()`

Throws if called by any asset not allowed.

### Function `constructor(address _eurPriceFeed) public`

Sets the values for {eurPriceFeed}.

Sets ownership to the account that deploys the contract.

### Function `setEurPriceFeed(address _eurPriceFeed) → bool public`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `allowAsset(address _asset) → bool public`

Sets `_asset` as allowed for calling `addTrade`.

Requirements:

- the caller mustbe the owner.

- `_asset` should not be the zero address.

#### Parameters:

- `_asset`: asset's address.

### Function `disallowAsset(address _asset) → bool public`

Sets `_asset` as disallowed for calling `addTrade`.

Requirements:

- the caller mustbe the owner.

- `_asset` should not be the zero address.

#### Parameters:

- `_asset`: asset's address.

### Function `addTrade(address _user, bytes4 _operation, uint256 _amount) public`

Adds `_amount` converted to ERU to the balance traded by `_user` for an `_operation`

Requirements:

- the caller must be an allowed asset.

#### Parameters:

- `_user`: user's address

- `_operation`: msg.sig of the function considered an operation.

- `_amount`: asset amount which is converted to EUR and added to balance traded by `_user` for `_operation`.

### Event `EurPriceFeedSetted(address newEurPriceFeed)`

Emitted when `eurPriceFeed` address is setted.

### Event `AssetAllowed(address asset)`

Emitted when `asset` is allowed.

### Event `AssetDisallowed(address asset)`

Emitted when `asset` is disallowed.
