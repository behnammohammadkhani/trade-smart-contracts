# `EurPriceFeed`

Contract module to retrieve EUR price per asset.

## Functions:

- `constructor(address _eurUsdFeed, address _ethUsdFeed, address[] _assets, address[] _feeds) (public)`

- `setEurUsdFeed(address _eurUsdFeed) (public)`

- `setEthUsdFeed(address _ethUsdFeed) (public)`

- `setAssetsFeeds(address[] _assets, address[] _feeds) (external)`

- `getPrice(address _asset) (external)`

- `calculateAmount(address _asset, uint256 _amount) (external)`

- `_setAssetsFeeds(address[] _assets, address[] _feeds) (internal)`

- `_getPrice(address _asset) (internal)`

## Events:

- `EurUsdFeedSetted(address newEurUsdFeed)`

- `EthUsdFeedSetted(address newEthUsdFeed)`

- `AssetEthFeedSetted(address asset, address feed)`

### Function `constructor(address _eurUsdFeed, address _ethUsdFeed, address[] _assets, address[] _feeds) public`

Sets the values for {eurUsdFeed}, {ethUsdFeed} and {assetUsdFeed}.

Sets ownership to the account that deploys the contract.

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
