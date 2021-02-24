# `EurPriceFeed`

Contract module to retrieve EUR price per asset.

## Modifiers:

- `onlyFeedsManager()`

## Functions:

- `constructor(address _eurUsdFeed, address _ethUsdFeed, address[] _assets, address[] _feeds) (public)`

- `setFeedsManager(address _account) (external)`

- `setEurUsdFeed(address _eurUsdFeed) (public)`

- `setEthUsdFeed(address _ethUsdFeed) (public)`

- `setAssetsFeeds(address[] _assets, address[] _feeds) (external)`

- `setAssetFeed(address _asset, address _feed) (external)`

- `getPrice(address _asset) (external)`

- `calculateAmount(address _asset, uint256 _amount) (external)`

- `_setAssetsFeeds(address[] _assets, address[] _feeds) (internal)`

- `_setAssetFeed(address _asset, address _feed) (internal)`

- `_getPrice(address _asset) (internal)`

## Events:

- `EurUsdFeedSetted(address newEurUsdFeed)`

- `EthUsdFeedSetted(address newEthUsdFeed)`

- `AssetEthFeedSetted(address asset, address feed)`

### Modifier `onlyFeedsManager()`

Throws if called by some address with FEEDS_MANAGER_ROLE.

### Function `constructor(address _eurUsdFeed, address _ethUsdFeed, address[] _assets, address[] _feeds) public`

Sets the values for {eurUsdFeed}, {ethUsdFeed} and {assetUsdFeed}.

Grants the contract deployer the default admin role.

### Function `setFeedsManager(address _account) external`

Grants FEEDS_MANAGER_ROLE to `_account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `setEurUsdFeed(address _eurUsdFeed) public`

Sets `_eurUsdFeed` as the new ERU/USD feed.

Requirements:

- the caller must be the owner.

- `_eurUsdFeed` should not be the zero address.

#### Parameters:

- `_eurUsdFeed`: The address of the new ERU/USD feed.

### Function `setEthUsdFeed(address _ethUsdFeed) public`

Sets `_ethUsdFeed` as the new ERU/USD feed.

Requirements:

- the caller must be the owner.

- `_ethUsdFeed` should not be the zero address.

#### Parameters:

- `_ethUsdFeed`: The address of the new ERU/USD feed.

### Function `setAssetsFeeds(address[] _assets, address[] _feeds) external`

Sets feed addresses for a given group of assets.

Requirements:

- the caller must be the owner.

- `_assets` and `_feeds` lengths must match.

- every address in `_assets` should not be the zero address .

- every address in `_feeds` should not be the zero address .

#### Parameters:

- `_assets`: Array of assets addresses.

- `_feeds`: Array of asset/ETH price feeds.

### Function `setAssetFeed(address _asset, address _feed) external`

Sets feed addresses for a given assets.

Requirements:

- the caller must be the owner.

- `_asset` should not be the zero address .

- `_feed` should not be the zero address .

#### Parameters:

- `_asset`: Asset address.

- `_feed`: Asset/ETH price feed.

### Function `getPrice(address _asset) → uint256 external`

Gets the price 1 `_asset` in EUR.

#### Parameters:

- `_asset`: address of asset to get the price.

#### Return Values:

- price scaled by 1e8, denominated in EUR

e.g. 17568900000 => 175.689 EUR

### Function `calculateAmount(address _asset, uint256 _amount) → uint256 external`

Gets how many EUR represents the `_amount` of `_asset`.

#### Parameters:

- `_asset`: address of asset to get the price.

- `_amount`: amount of `_asset`.

### Function `_setAssetsFeeds(address[] _assets, address[] _feeds) internal`

### Function `_setAssetFeed(address _asset, address _feed) internal`

### Function `_getPrice(address _asset) → uint256 internal`

Gets the price 1 `_asset` in EUR.

#### Parameters:

- `_asset`: address of asset to get the price.

#### Return Values:

- price scaled by 1e18, denominated in EUR

### Event `EurUsdFeedSetted(address newEurUsdFeed)`

Emitted when `eurUsdFeed` address is setted.

### Event `EthUsdFeedSetted(address newEthUsdFeed)`

Emitted when `ethUsdFeed` address is setted.

### Event `AssetEthFeedSetted(address asset, address feed)`

Emitted when a feed address is setted for an asset.
