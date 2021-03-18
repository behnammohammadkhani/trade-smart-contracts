# `IUTokenPriceFeed`

Interface to be implemented by any UtilityToken price feed logic contract used in the protocol.

## Functions:

- `getPrice(address _asset) (external)`

- `calculateAmount(address _asset, uint256 _amount) (external)`

### Function `getPrice(address _asset) → uint256 external`

Gets the price a `_asset` in UtilityToken.

#### Parameters:

- `_asset`: address of asset to get the price.

### Function `calculateAmount(address _asset, uint256 _amount) → uint256 external`

Gets how many UtilityToken represents the `_amount` of `_asset`.

#### Parameters:

- `_asset`: address of asset to get the amount.

- `_amount`: amount of `_asset`.
