# `IXTokenWrapper`

XTokenWrapper Interface.

## Functions:

- `tokenToXToken(address _token) (external)`

- `xTokenToToken(address _xToken) (external)`

- `wrap(address _token, uint256 _amount) (external)`

- `unwrap(address _xToken, uint256 _amount) (external)`

### Function `tokenToXToken(address _token) → address external`

Token to xToken registry.

### Function `xTokenToToken(address _xToken) → address external`

xToken to Token registry.

### Function `wrap(address _token, uint256 _amount) → bool external`

Wraps `_token` into its associated xToken.

### Function `unwrap(address _xToken, uint256 _amount) → bool external`

Unwraps `_xToken`.
