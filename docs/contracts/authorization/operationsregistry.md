# `OperationsRegistry`

Contract module to keep track of the EUR amount being tradded for each user by operation.

## Modifiers:

- `onlyAllowedAsset()`

- `onlyAssetsManager()`

## Functions:

- `constructor(address _eurPriceFeed) (public)`

- `setFeedManager(address _account) (external)`

- `setAssetsManager(address _account) (external)`

- `setEurPriceFeed(address _eurPriceFeed) (public)`

- `allowAsset(address _asset) (public)`

- `disallowAsset(address _asset) (public)`

- `addTrade(address _user, bytes4 _operation, uint256 _amount) (public)`

## Events:

- `EurPriceFeedSet(address newEurPriceFeed)`

- `AssetAllowed(address asset)`

- `AssetDisallowed(address asset)`

### Modifier `onlyAllowedAsset()`

Throws if called by any asset not allowed.

### Modifier `onlyAssetsManager()`

Throws if called by some address with ASSETS_MANAGER_ROLE.

### Function `constructor(address _eurPriceFeed) public`

Sets the values for {eurPriceFeed}.

Grants the contract deployer the default admin role.

### Function `setFeedManager(address _account) external`

Grants FEED_MANAGER_ROLE to `_account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `setAssetsManager(address _account) external`

Grants ASSETS_MANAGER_ROLE to `_account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `setEurPriceFeed(address _eurPriceFeed) public`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must have FEED_MANAGER_ROLE.

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `allowAsset(address _asset) public`

Sets `_asset` as allowed for calling `addTrade`.

Requirements:

- the caller must have ASSETS_MANAGER.

- `_asset` should not be the zero address.

#### Parameters:

- `_asset`: asset's address.

### Function `disallowAsset(address _asset) public`

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

### Event `EurPriceFeedSet(address newEurPriceFeed)`

Emitted when `eurPriceFeed` address is set.

### Event `AssetAllowed(address asset)`

Emitted when `asset` is allowed.

### Event `AssetDisallowed(address asset)`

Emitted when `asset` is disallowed.
