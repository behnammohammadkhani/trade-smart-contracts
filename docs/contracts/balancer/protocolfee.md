# `ProtocolFee`

Module for protocol swap fee calculations.

## Functions:

- `constructor(uint256 _protocolFee, uint256 _minProtocolFee) (public)`

- `setProtocolFee(uint256 _protocolFee) (external)`

- `setMinProtocolFee(uint256 _minProtocolFee) (external)`

- `_setProtocolFee(uint256 _protocolFee) (internal)`

- `_setMinProtocolFee(uint256 _minProtocolFee) (internal)`

- `batchFee(struct ISwap.Swap[] swaps, uint256 totalAmountIn) (public)`

- `multihopBatch(struct ISwap.Swap[][] swapSequences, uint256 totalAmountIn) (public)`

- `getProtocolFeeAmount(uint256 poolFeeAmount) (internal)`

- `getPoolFeeAmount(address pool, uint256 swapAmount) (internal)`

## Events:

- `ProtocolFeeSet(uint256 protocolFee)`

- `MinProtocolFeeSet(uint256 minProtocolFee)`

### Function `constructor(uint256 _protocolFee, uint256 _minProtocolFee) public`

Sets the values for {protocolFee} and {minProtocolFee}.

Sets ownership to the account that deploys the contract.

### Function `setProtocolFee(uint256 _protocolFee) external`

Sets `_protocolFee` as the new protocolFee.

Requirements:

- the caller must be the owner.

- `_protocolFee` should not be the greater than or equal to MIN_FEE and lower than or equal to MAX_FEE.

#### Parameters:

- `_protocolFee`: The address of the registry.

### Function `setMinProtocolFee(uint256 _minProtocolFee) external`

Sets `_minProtocolFee` as the new minProtocolFee.

Requirements:

- the caller must be the owner.

- `_minProtocolFee` should not be the greater than or equal to MIN_FEE and lower than or equal to MAX_FEE.

#### Parameters:

- `_minProtocolFee`: The address of the registry.

### Function `_setProtocolFee(uint256 _protocolFee) internal`

Sets `_protocolFee` as the new protocolFee.

Requirements:

- `_protocolFee` should not be the greater than or equal to MIN_FEE and lower than or equal to MAX_FEE.

#### Parameters:

- `_protocolFee`: The address of the registry.

### Function `_setMinProtocolFee(uint256 _minProtocolFee) internal`

Sets `_minProtocolFee` as the new minProtocolFee.

Requirements:

- `_minProtocolFee` should not be the greater than or equal to MIN_FEE and lower than or equal to MAX_FEE.

#### Parameters:

- `_minProtocolFee`: The address of the registry.

### Function `batchFee(struct ISwap.Swap[] swaps, uint256 totalAmountIn) → uint256 public`

Calculates protocol swap fee for single-hop swaps.

#### Parameters:

- `swaps`: Array of single-hop swaps.

- `totalAmountIn`: Total amount in.

### Function `multihopBatch(struct ISwap.Swap[][] swapSequences, uint256 totalAmountIn) → uint256 public`

Calculates protocol swap fee for multi-hop swaps.

#### Parameters:

- `swapSequences`: multi-hop swaps sequence.

- `totalAmountIn`: Total amount in.

### Function `getProtocolFeeAmount(uint256 poolFeeAmount) → uint256 internal`

Retives protocol fee amount out of the pool fee amount.

#### Parameters:

- `poolFeeAmount`: Pool fee ammount.

### Function `getPoolFeeAmount(address pool, uint256 swapAmount) → uint256 internal`

Retives pool swap fee amount.

#### Parameters:

- `pool`: Pool address.

- `swapAmount`: Total amount in.

### Event `ProtocolFeeSet(uint256 protocolFee)`

Emitted when `protocolFee` is set.

### Event `MinProtocolFeeSet(uint256 minProtocolFee)`

Emitted when `minProtocolFee` is set.
