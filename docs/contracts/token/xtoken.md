# `XToken`

ERC20 token used for wrapping tokens with the purpose of applying an authorization layer.

## Modifiers:

- `onlyAdmin()`

- `onlyWrapper()`

## Functions:

- `constructor(string name_, string symbol_, uint8 decimals_, string kya_, address authorization_, address operationsRegistry_) (public)`

- `setWrapper(address account) (public)`

- `pause() (public)`

- `unpause() (public)`

- `setAuthorization(address authorization_) (public)`

- `setOperationsRegistry(address operationsRegistry_) (public)`

- `setKya(string kya_) (public)`

- `_setKya(string kya_) (internal)`

- `transfer(address recipient, uint256 amount) (public)`

- `transferFrom(address sender, address recipient, uint256 amount) (public)`

- `mint(address account, uint256 amount) (public)`

- `burnFrom(address account, uint256 amount) (public)`

## Events:

- `KyaSetted(string newKya)`

- `OperationsRegistrySetted(address newOperationsRegistry)`

### Modifier `onlyAdmin()`

Throws if called by any account with no admin role.

### Modifier `onlyWrapper()`

Throws if called by any account with no wrapper role.

### Function `constructor(string name_, string symbol_, uint8 decimals_, string kya_, address authorization_, address operationsRegistry_) public`

Sets the values for {name}, {symbol}, {decimals}, {kya}, {authorization} and {operationsRegistry}.

Grants the contract deployer the default admin role.

### Function `setWrapper(address account) public`

Grants WRAPPER role to `account`.

Requirements:

- the caller must have ``role``'s admin role.

### Function `pause() public`

Triggers stopped state.

Requirements:

- the caller must have ``role``'s admin role.

- the contract must not be paused.

### Function `unpause() public`

Returns to normal state.

Requirements:

- the caller must have ``role``'s admin role.

- the contract must be paused.

### Function `setAuthorization(address authorization_) public`

Sets authorization.

Requirements:

- the caller must have ``role``'s admin role.

### Function `setOperationsRegistry(address operationsRegistry_) public`

Sets operationsRegistry.

Requirements:

- the caller must have ``role``'s admin role.

### Function `setKya(string kya_) public`

Sets kya.

Requirements:

- the caller must have ``role``'s admin role.

### Function `_setKya(string kya_) internal`

Sets kya.

### Function `transfer(address recipient, uint256 amount) → bool public`

See {IERC20-transfer}.

Adds the `amount` being tranfered to the `sender`'s accumulated in

{bytes4(keccak256("transfer(address,uint256)"))} operation.

This is not required by the EIP.

Requirements:

- the operation should be authorized.

- `recipient` cannot be the zero address.

- the caller must have a balance of at least `amount`.

### Function `transferFrom(address sender, address recipient, uint256 amount) → bool public`

See {IERC20-transferFrom}.

Adds the `amount` being tranfered to the `msg.sender`'s accumulated in

{bytes4(keccak256("transfer(address,uint256)"))} operation.

This is not required by the EIP.

Requirements:

- the operation should be authorized.

- `sender` and `recipient` cannot be the zero address.

- `sender` must have a balance of at least `amount`.

- the caller must have allowance for ``sender``'s tokens of at least

`amount`.

### Function `mint(address account, uint256 amount) public`

Creates `amount` tokens and assigns them to `account`, increasing

the total supply.

Adds the `amount` being minted to the `account`'s accumulated in

{bytes4(keccak256("mint(address,uint256)"))} operation.

This is not required by the EIP.

Requirements:

- the caller must have WRAPPER_ROLE.

- the operation should be authorized.

- `to` cannot be the zero address.

### Function `burnFrom(address account, uint256 amount) public`

Destroys `amount` tokens from `account`, reducing the

total supply.

Adds the `amount` being burned to the `account`'s accumulated in

{bytes4(keccak256("burnFrom(address,uint256)"))} operation.

This is not required by the EIP.

Requirements:

- the caller must have WRAPPER_ROLE.

- the operation should be authorized.

- `account` cannot be the zero address.

- `account` must have at least `amount` tokens.

### Event `KyaSetted(string newKya)`

Emitted when `operationsRegistry` address is setted.

### Event `OperationsRegistrySetted(address newOperationsRegistry)`

Emitted when `operationsRegistry` address is setted.
