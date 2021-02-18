# `XTokenWrapper`

Contract module which provides an functionality for wrapping tokens into the corresponding XToken.

## Functions:

- `constructor(address _registryManager) (public)`

- `registerToken(address _token, address _xToken) (external)`

- `wrap(address _token, uint256 _amount) (external)`

- `unwrap(address _xToken, uint256 _amount) (external)`

## Events:

- `RegisterToken(address token, address xToken)`

### Function `constructor(address _registryManager) public`

Grants the contract deployer the default admin role.

### Function `registerToken(address _token, address _xToken) external`

Registers a new xToken associated to the ERC20 which it will be wrapping.

Requirements:

- the caller must have REGISTRY_MANAGER_ROLE.

- `_token` cannot be the zero address.

- `_xToken` cannot be the zero address.

#### Parameters:

- `_token`: The address of the ERC20 being wrapped.

- `_xToken`: The address of xToken.

### Function `wrap(address _token, uint256 _amount) → bool external`

Wraps `_token` into its associated xToken.

It requires prior approval.

It gets the ERC20 (or ETH) amount from the tx.origin and send the xToken to the msg.sender

allowing the use a UserProxy.

Requirements:

- `_token` should be registered.

#### Parameters:

- `_token`: The address of the ERC20 being wrapped.

              {ETH_TOKEN_ADDRESS} in case of wrapping ETH

- `_amount`: The amount to wrap.

### Function `unwrap(address _xToken, uint256 _amount) → bool external`

Unwraps `_xToken`.

It burns the xToken amount from the msg.sender and sends the associated ERC20 (or ETH)

to the tx.origin allowing the use a UserProxy.

Requirements:

- `_xToken` should be registered.

- `_amonut` should be gt 0.

#### Parameters:

- `_xToken`: The address of the ERC20 being wrapped.

- `_amount`: The amount to unwrap.

### Event `RegisterToken(address token, address xToken)`

Emitted when `asset` is disallowed.
