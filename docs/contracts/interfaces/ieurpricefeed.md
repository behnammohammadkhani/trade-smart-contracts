# `IEurPriceFeed`

Interface to be implemented by any EurPriceFeed logic contract used in the protocol.

## Functions:

- `getPrice(address _asset) (external)`

- `calculateAmount(address _asset, uint256 _amount) (external)`

- `setAssetsFeeds(address[] _assets, address[] _feeds) (external)`

- `setAssetFeed(address _asset, address _feed) (external)`

### Function `getPrice(address _asset) → uint256 external`

Gets the price a `_asset` in EUR.

#### Parameters:

- `_asset`: address of asset to get the price.

### Function `calculateAmount(address _asset, uint256 _amount) → uint256 external`

Gets how many EUR represents the `_amount` of `_asset`.

#### Parameters:

- `_asset`: address of asset to get the price.

- `_amount`: amount of `_asset`.

### Function `setAssetsFeeds(address[] _assets, address[] _feeds) external`

Sets feed addresses for a given group of assets.

#### Parameters:

- `_assets`: Array of assets addresses.

- `_feeds`: Array of asset/ETH price feeds.

### Function `setAssetFeed(address _asset, address _feed) external`

Sets feed addresse for a given asset.

#### Parameters:

- `_asset`: Assets address.

- `_feed`: Asset/ETH price feed.
