# `BPoolProxy`

Forwarding proxy that allows users to batch execute swaps and join/exit pools.

User should interact with pools through this contracts as it is the one that charge

the protocol swap fee, and wrap/unwrap pool tokens into/from xPoolToken.

This code is based on Balancer ExchangeProxy contract

https://docs.balancer.finance/smart-contracts/exchange-proxy

(https://etherscan.io/address/0x3E66B66Fd1d0b02fDa6C811Da9E0547970DB2f21#code)

## Functions:

- `constructor(address _registry, address _protocolFee, address _feeReceiver, address _xTokenWrapper, address _utilityToken, address _utilityTokenFeed) (public)`

- `setRegistry(address _registry) (external)`

- `setProtocolFee(address _protocolFee) (external)`

- `setFeeReceiver(address _feeReceiver) (external)`

- `setXTokenWrapper(address _xTokenWrapper) (external)`

- `setUtilityToken(address _utilityToken) (external)`

- `setUtilityTokenFeed(address _utilityTokenFeed) (external)`

- `_setRegistry(address _registry) (internal)`

- `_setProtocolFee(address _protocolFee) (internal)`

- `_setFeeReceiver(address _feeReceiver) (internal)`

- `_setXTokenWrapper(address _xTokenWrapper) (internal)`

- `_setUtilityToken(address _utilityToken) (internal)`

- `_setUtilityTokenFeed(address _utilityTokenFeed) (internal)`

- `batchSwapExactIn(struct ISwap.Swap[] swaps, contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, bool useUtilityToken) (public)`

- `batchSwapExactOut(struct ISwap.Swap[] swaps, contract IXToken tokenIn, contract IXToken tokenOut, uint256 maxTotalAmountIn, bool useUtilityToken) (public)`

- `multihopBatchSwapExactIn(struct ISwap.Swap[][] swapSequences, contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, bool useUtilityToken) (public)`

- `multihopBatchSwapExactOut(struct ISwap.Swap[][] swapSequences, contract IXToken tokenIn, contract IXToken tokenOut, uint256 maxTotalAmountIn, bool useUtilityToken) (public)`

- `smartSwapExactIn(contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, uint256 nPools, bool useUtilityToken) (public)`

- `smartSwapExactOut(contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountOut, uint256 maxTotalAmountIn, uint256 nPools, bool useUtilityToken) (public)`

- `joinPool(address pool, uint256 poolAmountOut, uint256[] maxAmountsIn) (public)`

- `exitPool(address pool, uint256 poolAmountIn, uint256[] minAmountsOut) (external)`

- `joinswapExternAmountIn(address pool, address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) (external)`

- `joinswapPoolAmountOut(address pool, address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) (external)`

- `exitswapPoolAmountIn(address pool, address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) (external)`

- `exitswapExternAmountOut(address pool, address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) (external)`

- `viewSplitExactIn(address tokenIn, address tokenOut, uint256 swapAmount, uint256 nPools) (public)`

- `viewSplitExactOut(address tokenIn, address tokenOut, uint256 swapAmount, uint256 nPools) (public)`

- `getPoolData(address tokenIn, address tokenOut, address poolAddress) (internal)`

- `calcEffectiveLiquidity(uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut) (internal)`

- `calcTotalOutExactIn(uint256[] bestInputAmounts, struct BPoolProxy.Pool[] bestPools) (internal)`

- `calcTotalOutExactOut(uint256[] bestInputAmounts, struct BPoolProxy.Pool[] bestPools) (internal)`

- `transferFrom(contract IXToken token, uint256 amount) (internal)`

- `transferFeeFrom(contract IXToken token, uint256 amount, bool useUtitlityToken) (internal)`

- `getBalance(contract IXToken token) (internal)`

- `transfer(contract IXToken token, uint256 amount) (internal)`

## Events:

- `RegistrySet(address registry)`

- `ProtocolFeeSet(address protocolFee)`

- `FeeReceiverSet(address feeReceiver)`

- `XTokenWrapperSet(address xTokenWrapper)`

- `UtilityTokenSet(address utilityToken)`

- `UtilityTokenFeedSet(address utilityTokenFeed)`

### Function `constructor(address _registry, address _protocolFee, address _feeReceiver, address _xTokenWrapper, address _utilityToken, address _utilityTokenFeed) public`

Sets the values for {registry}, {protocolFee}, {feeReceiver},

{xTokenWrapper}, {utilityToken} and {utilityTokenFeed}.

Sets ownership to the account that deploys the contract.

### Function `setRegistry(address _registry) external`

Sets `_registry` as the new registry.

Requirements:

- the caller must be the owner.

- `_registry` should not be the zero address.

#### Parameters:

- `_registry`: The address of the registry.

### Function `setProtocolFee(address _protocolFee) external`

Sets `_protocolFee` as the new protocolFee.

Requirements:

- the caller must be the owner.

- `_protocolFee` should not be the zero address.

#### Parameters:

- `_protocolFee`: The address of the protocolFee.

### Function `setFeeReceiver(address _feeReceiver) external`

Sets `_feeReceiver` as the new feeReceiver.

Requirements:

- the caller must be the owner.

- `_feeReceiver` should not be the zero address.

#### Parameters:

- `_feeReceiver`: The address of the feeReceiver.

### Function `setXTokenWrapper(address _xTokenWrapper) external`

Sets `_xTokenWrapper` as the new xTokenWrapper.

Requirements:

- the caller must be the owner.

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the xTokenWrapper.

### Function `setUtilityToken(address _utilityToken) external`

Sets `_utilityToken` as the new utilityToken.

Requirements:

- the caller must be the owner.

#### Parameters:

- `_utilityToken`: The address of the utilityToken.

### Function `setUtilityTokenFeed(address _utilityTokenFeed) external`

Sets `_utilityTokenFeed` as the new utilityTokenFeed.

Requirements:

- the caller must be the owner.

#### Parameters:

- `_utilityTokenFeed`: The address of the utilityTokenFeed.

### Function `_setRegistry(address _registry) internal`

Sets `_registry` as the new registry.

Requirements:

- `_registry` should not be the zero address.

#### Parameters:

- `_registry`: The address of the registry.

### Function `_setProtocolFee(address _protocolFee) internal`

Sets `_protocolFee` as the new protocolFee.

Requirements:

- `_protocolFee` should not be the zero address.

#### Parameters:

- `_protocolFee`: The address of the protocolFee.

### Function `_setFeeReceiver(address _feeReceiver) internal`

Sets `_feeReceiver` as the new feeReceiver.

Requirements:

- `_feeReceiver` should not be the zero address.

#### Parameters:

- `_feeReceiver`: The address of the feeReceiver.

### Function `_setXTokenWrapper(address _xTokenWrapper) internal`

Sets `_xTokenWrapper` as the new xTokenWrapper.

Requirements:

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the xTokenWrapper.

### Function `_setUtilityToken(address _utilityToken) internal`

Sets `_utilityToken` as the new utilityToken.

#### Parameters:

- `_utilityToken`: The address of the utilityToken.

### Function `_setUtilityTokenFeed(address _utilityTokenFeed) internal`

Sets `_utilityTokenFeed` as the new utilityTokenFeed.

Requirements:

- the caller must be the owner.

#### Parameters:

- `_utilityTokenFeed`: The address of the utilityTokenFeed.

### Function `batchSwapExactIn(struct ISwap.Swap[] swaps, contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, bool useUtilityToken) → uint256 totalAmountOut public`

Execute single-hop swaps for swapExactIn trade type. Used for swaps

returned from viewSplit function and legacy off-chain SOR.

#### Parameters:

- `swaps`: Array of single-hop swaps.

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `totalAmountIn`: Total amount of tokenIn.

- `minTotalAmountOut`: Minumum amount of tokenOut.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `batchSwapExactOut(struct ISwap.Swap[] swaps, contract IXToken tokenIn, contract IXToken tokenOut, uint256 maxTotalAmountIn, bool useUtilityToken) → uint256 totalAmountIn public`

Execute single-hop swaps for swapExactOut trade type. Used for swaps

returned from viewSplit function and legacy off-chain SOR.

#### Parameters:

- `swaps`: Array of single-hop swaps.

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `maxTotalAmountIn`: Maximum total amount of tokenIn.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `multihopBatchSwapExactIn(struct ISwap.Swap[][] swapSequences, contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, bool useUtilityToken) → uint256 totalAmountOut public`

Execute multi-hop swaps returned from off-chain SOR for swapExactIn trade type.

#### Parameters:

- `swapSequences`: multi-hop swaps sequence.

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `totalAmountIn`: Total amount of tokenIn.

- `minTotalAmountOut`: Minumum amount of tokenOut.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `multihopBatchSwapExactOut(struct ISwap.Swap[][] swapSequences, contract IXToken tokenIn, contract IXToken tokenOut, uint256 maxTotalAmountIn, bool useUtilityToken) → uint256 totalAmountIn public`

Execute multi-hop swaps returned from off-chain SOR for swapExactOut trade type.

#### Parameters:

- `swapSequences`: multi-hop swaps sequence.

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `maxTotalAmountIn`: Maximum total amount of tokenIn.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `smartSwapExactIn(contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountIn, uint256 minTotalAmountOut, uint256 nPools, bool useUtilityToken) → uint256 totalAmountOut public`

Used for swaps returned from viewSplit function.

#### Parameters:

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `totalAmountIn`: Total amount of tokenIn.

- `minTotalAmountOut`: Minumum amount of tokenOut.

- `nPools`: Maximum mumber of pools.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `smartSwapExactOut(contract IXToken tokenIn, contract IXToken tokenOut, uint256 totalAmountOut, uint256 maxTotalAmountIn, uint256 nPools, bool useUtilityToken) → uint256 totalAmountIn public`

Used for swaps returned from viewSplit function.

#### Parameters:

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `maxTotalAmountIn`: Maximum total amount of tokenIn.

- `nPools`: Maximum mumber of pools.

- `useUtilityToken`: Flag to determine if the protocol swap fee is paid using UtilityToken or TokenIn.

### Function `joinPool(address pool, uint256 poolAmountOut, uint256[] maxAmountsIn) public`

Join the `pool`, getting `poolAmountOut` pool tokens. This will pull some of each of the currently

trading tokens in the pool, meaning you must have called approve for each token for this pool. These

values are limited by the array of `maxAmountsIn` in the order of the pool tokens.

#### Parameters:

- `pool`: Pool address.

- `poolAmountOut`: Exact pool amount out.

- `maxAmountsIn`: Maximum amounts in.

### Function `exitPool(address pool, uint256 poolAmountIn, uint256[] minAmountsOut) external`

Exit the pool, paying poolAmountIn pool tokens and getting some of each of the currently trading

tokens in return. These values are limited by the array of minAmountsOut in the order of the pool tokens.

#### Parameters:

- `pool`: Pool address.

- `poolAmountIn`: Exact pool amount int.

- `minAmountsOut`: Minumum amounts out.

### Function `joinswapExternAmountIn(address pool, address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) → uint256 poolAmountOut external`

Pay `tokenAmountIn` of token `tokenIn` to join the pool, getting `poolAmountOut` of the pool shares.

#### Parameters:

- `pool`: Pool address.

- `tokenIn`: Input token.

- `tokenAmountIn`: Exact amount of tokenIn to pay.

- `minPoolAmountOut`: Minumum amount of pool shares to get.

### Function `joinswapPoolAmountOut(address pool, address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) → uint256 tokenAmountIn external`

Specify `poolAmountOut` pool shares that you want to get, and a token `tokenIn` to pay with.

This costs `tokenAmountIn` tokens (these went into the pool).

#### Parameters:

- `pool`: Pool address.

- `tokenIn`: Input token.

- `poolAmountOut`: Exact amount of pool shares to get.

- `maxAmountIn`: Minumum amount of tokenIn to pay.

### Function `exitswapPoolAmountIn(address pool, address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) → uint256 tokenAmountOut external`

Pay `poolAmountIn` pool shares into the pool, getting `tokenAmountOut` of the given

token `tokenOut` out of the pool.

#### Parameters:

- `pool`: Pool address.

- `tokenOut`: Input token.

- `poolAmountIn`: Exact amount of pool shares to pay.

- `minAmountOut`: Minumum amount of tokenIn to get.

### Function `exitswapExternAmountOut(address pool, address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) → uint256 poolAmountIn external`

Specify tokenAmountOut of token tokenOut that you want to get out of the pool.

This costs poolAmountIn pool shares (these went into the pool).

#### Parameters:

- `pool`: Pool address.

- `tokenOut`: Input token.

- `tokenAmountOut`: Exact amount of of tokenIn to get.

- `maxPoolAmountIn`: Maximum amount of pool shares to pay.

### Function `viewSplitExactIn(address tokenIn, address tokenOut, uint256 swapAmount, uint256 nPools) → struct ISwap.Swap[] swaps, uint256 totalOutput public`

View function that calculates most optimal swaps (exactIn swap type) across a max of nPools.

Returns an array of `Swaps` and the total amount out for swap.

#### Parameters:

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `swapAmount`: Amount of tokenIn.

- `nPools`: Maximum mumber of pools.

### Function `viewSplitExactOut(address tokenIn, address tokenOut, uint256 swapAmount, uint256 nPools) → struct ISwap.Swap[] swaps, uint256 totalInput public`

View function that calculates most optimal swaps (exactOut swap type) across a max of nPools.

Returns an array of Swaps and the total amount in for swap.

#### Parameters:

- `tokenIn`: Input token.

- `tokenOut`: Output token.

- `swapAmount`: Amount of tokenIn.

- `nPools`: Maximum mumber of pools.

### Function `getPoolData(address tokenIn, address tokenOut, address poolAddress) → struct BPoolProxy.Pool internal`

### Function `calcEffectiveLiquidity(uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut) → uint256 effectiveLiquidity internal`

### Function `calcTotalOutExactIn(uint256[] bestInputAmounts, struct BPoolProxy.Pool[] bestPools) → uint256 totalOutput internal`

### Function `calcTotalOutExactOut(uint256[] bestInputAmounts, struct BPoolProxy.Pool[] bestPools) → uint256 totalOutput internal`

### Function `transferFrom(contract IXToken token, uint256 amount) internal`

Trtansfers `token` from the sender to this conteract.

### Function `transferFeeFrom(contract IXToken token, uint256 amount, bool useUtitlityToken) internal`

Trtansfers protocol swap fee from the sender to this `feeReceiver`.

### Function `getBalance(contract IXToken token) → uint256 internal`

### Function `transfer(contract IXToken token, uint256 amount) internal`

### Event `RegistrySet(address registry)`

Emitted when `registry` address is set.

### Event `ProtocolFeeSet(address protocolFee)`

Emitted when `protocolFee` address is set.

### Event `FeeReceiverSet(address feeReceiver)`

Emitted when `feeReceiver` address is set.

### Event `XTokenWrapperSet(address xTokenWrapper)`

Emitted when `xTokenWrapper` address is set.

### Event `UtilityTokenSet(address utilityToken)`

Emitted when `utilityToken` address is set.

### Event `UtilityTokenFeedSet(address utilityTokenFeed)`

Emitted when `utilityTokenFeed` address is set.
