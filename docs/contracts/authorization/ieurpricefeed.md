# `IEurPriceFeed`

Interface to be implemented by any EurPriceFeed logic contract use in the protocol.

## Functions:

- `getPrice(address _asset) (external)`

- `calculateAmount(address _asset, uint256 _amount) (external)`

### Function `getPrice(address _asset) → uint256 external`

Gets the price a `_asset` in EUR.

#### Parameters:

- `_asset`: address of asset to get the price.

### Function `calculateAmount(address _asset, uint256 _amount) → uint256 external`

Gets how many EUR represents the `_amount` of `_asset`.

#### Parameters:

- `_asset`: address of asset to get the price.

- `_amount`: amount of `_asset`.
