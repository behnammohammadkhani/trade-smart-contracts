# `BRegistry`

Stores a registry of Balancer Pool addresses for a given token address pair. Pools can be

sorted in order of liquidity and queried via view functions. Used in combination with the Exchange

Proxy swaps can be sourced and exectured entirely on-chain.

This code is based on Balancer On Chain Registry contract

https://docs.balancer.finance/smart-contracts/on-chain-registry

(https://etherscan.io/address/0x7226DaaF09B3972320Db05f5aB81FF38417Dd687#code)

## Functions:

- `constructor(address _bfactory) (public)`

- `getPairInfo(address pool, address fromToken, address destToken) (external)`

- `getPoolsWithLimit(address fromToken, address destToken, uint256 offset, uint256 limit) (public)`

- `getBestPools(address fromToken, address destToken) (external)`

- `getBestPoolsWithLimit(address fromToken, address destToken, uint256 limit) (public)`

- `addPoolPair(address pool, address token1, address token2) (public)`

- `addPools(address[] pools, address token1, address token2) (external)`

- `sortPools(address[] tokens, uint256 lengthLimit) (external)`

- `sortPoolsWithPurge(address[] tokens, uint256 lengthLimit) (external)`

- `_createKey(address token1, address token2) (internal)`

- `_getEffectiveLiquidityForPools(address token1, address token2, address[] pools) (internal)`

- `_getEffectiveLiquidityForPoolsPurge(address token1, address token2, address[] pools) (public)`

- `bdiv(uint256 a, uint256 b) (internal)`

- `bmul(uint256 a, uint256 b) (internal)`

- `_buildSortIndices(uint256[] effectiveLiquidity) (internal)`

## Events:

- `PoolTokenPairAdded(address pool, address token1, address token2)`

- `IndicesUpdated(address token1, address token2, bytes32 oldIndices, bytes32 newIndices)`

### Function `constructor(address _bfactory) public`

### Function `getPairInfo(address pool, address fromToken, address destToken) → uint256 weight1, uint256 weight2, uint256 swapFee external`

### Function `getPoolsWithLimit(address fromToken, address destToken, uint256 offset, uint256 limit) → address[] result public`

### Function `getBestPools(address fromToken, address destToken) → address[] pools external`

### Function `getBestPoolsWithLimit(address fromToken, address destToken, uint256 limit) → address[] pools public`

### Function `addPoolPair(address pool, address token1, address token2) → uint256 listed public`

### Function `addPools(address[] pools, address token1, address token2) → uint256[] listed external`

### Function `sortPools(address[] tokens, uint256 lengthLimit) external`

### Function `sortPoolsWithPurge(address[] tokens, uint256 lengthLimit) external`

### Function `_createKey(address token1, address token2) → bytes32 internal`

### Function `_getEffectiveLiquidityForPools(address token1, address token2, address[] pools) → uint256[] effectiveLiquidity internal`

### Function `_getEffectiveLiquidityForPoolsPurge(address token1, address token2, address[] pools) → uint256[] effectiveLiquidity public`

### Function `bdiv(uint256 a, uint256 b) → uint256 internal`

### Function `bmul(uint256 a, uint256 b) → uint256 internal`

### Function `_buildSortIndices(uint256[] effectiveLiquidity) → bytes32 internal`

### Event `PoolTokenPairAdded(address pool, address token1, address token2)`

### Event `IndicesUpdated(address token1, address token2, bytes32 oldIndices, bytes32 newIndices)`
