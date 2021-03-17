# `IBPool`

Balancer BPool contract interface.

## Functions:

- `isPublicSwap() (external)`

- `isFinalized() (external)`

- `isBound(address t) (external)`

- `getNumTokens() (external)`

- `getCurrentTokens() (external)`

- `getFinalTokens() (external)`

- `getDenormalizedWeight(address token) (external)`

- `getTotalDenormalizedWeight() (external)`

- `getNormalizedWeight(address token) (external)`

- `getBalance(address token) (external)`

- `getSwapFee() (external)`

- `getController() (external)`

- `setSwapFee(uint256 swapFee) (external)`

- `setController(address manager) (external)`

- `setPublicSwap(bool public_) (external)`

- `finalize() (external)`

- `bind(address token, uint256 balance, uint256 denorm) (external)`

- `rebind(address token, uint256 balance, uint256 denorm) (external)`

- `unbind(address token) (external)`

- `gulp(address token) (external)`

- `getSpotPrice(address tokenIn, address tokenOut) (external)`

- `getSpotPriceSansFee(address tokenIn, address tokenOut) (external)`

- `joinPool(uint256 poolAmountOut, uint256[] maxAmountsIn) (external)`

- `exitPool(uint256 poolAmountIn, uint256[] minAmountsOut) (external)`

- `swapExactAmountIn(address tokenIn, uint256 tokenAmountIn, address tokenOut, uint256 minAmountOut, uint256 maxPrice) (external)`

- `swapExactAmountOut(address tokenIn, uint256 maxAmountIn, address tokenOut, uint256 tokenAmountOut, uint256 maxPrice) (external)`

- `joinswapExternAmountIn(address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) (external)`

- `joinswapPoolAmountOut(address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) (external)`

- `exitswapPoolAmountIn(address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) (external)`

- `exitswapExternAmountOut(address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) (external)`

- `totalSupply() (external)`

- `balanceOf(address whom) (external)`

- `allowance(address src, address dst) (external)`

- `approve(address dst, uint256 amt) (external)`

- `transfer(address dst, uint256 amt) (external)`

- `transferFrom(address src, address dst, uint256 amt) (external)`

- `calcSpotPrice(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 swapFee) (external)`

- `calcOutGivenIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountIn, uint256 swapFee) (external)`

- `calcInGivenOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountOut, uint256 swapFee) (external)`

- `calcPoolOutGivenSingleIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountIn, uint256 swapFee) (external)`

- `calcSingleInGivenPoolOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountOut, uint256 swapFee) (external)`

- `calcSingleOutGivenPoolIn(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountIn, uint256 swapFee) (external)`

- `calcPoolInGivenSingleOut(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountOut, uint256 swapFee) (external)`

### Function `isPublicSwap() → bool external`

### Function `isFinalized() → bool external`

### Function `isBound(address t) → bool external`

### Function `getNumTokens() → uint256 external`

### Function `getCurrentTokens() → address[] tokens external`

### Function `getFinalTokens() → address[] tokens external`

### Function `getDenormalizedWeight(address token) → uint256 external`

### Function `getTotalDenormalizedWeight() → uint256 external`

### Function `getNormalizedWeight(address token) → uint256 external`

### Function `getBalance(address token) → uint256 external`

### Function `getSwapFee() → uint256 external`

### Function `getController() → address external`

### Function `setSwapFee(uint256 swapFee) external`

### Function `setController(address manager) external`

### Function `setPublicSwap(bool public_) external`

### Function `finalize() external`

### Function `bind(address token, uint256 balance, uint256 denorm) external`

### Function `rebind(address token, uint256 balance, uint256 denorm) external`

### Function `unbind(address token) external`

### Function `gulp(address token) external`

### Function `getSpotPrice(address tokenIn, address tokenOut) → uint256 spotPrice external`

### Function `getSpotPriceSansFee(address tokenIn, address tokenOut) → uint256 spotPrice external`

### Function `joinPool(uint256 poolAmountOut, uint256[] maxAmountsIn) external`

### Function `exitPool(uint256 poolAmountIn, uint256[] minAmountsOut) external`

### Function `swapExactAmountIn(address tokenIn, uint256 tokenAmountIn, address tokenOut, uint256 minAmountOut, uint256 maxPrice) → uint256 tokenAmountOut, uint256 spotPriceAfter external`

### Function `swapExactAmountOut(address tokenIn, uint256 maxAmountIn, address tokenOut, uint256 tokenAmountOut, uint256 maxPrice) → uint256 tokenAmountIn, uint256 spotPriceAfter external`

### Function `joinswapExternAmountIn(address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) → uint256 poolAmountOut external`

### Function `joinswapPoolAmountOut(address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) → uint256 tokenAmountIn external`

### Function `exitswapPoolAmountIn(address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) → uint256 tokenAmountOut external`

### Function `exitswapExternAmountOut(address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) → uint256 poolAmountIn external`

### Function `totalSupply() → uint256 external`

### Function `balanceOf(address whom) → uint256 external`

### Function `allowance(address src, address dst) → uint256 external`

### Function `approve(address dst, uint256 amt) → bool external`

### Function `transfer(address dst, uint256 amt) → bool external`

### Function `transferFrom(address src, address dst, uint256 amt) → bool external`

### Function `calcSpotPrice(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 swapFee) → uint256 spotPrice external`

### Function `calcOutGivenIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountIn, uint256 swapFee) → uint256 tokenAmountOut external`

### Function `calcInGivenOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountOut, uint256 swapFee) → uint256 tokenAmountIn external`

### Function `calcPoolOutGivenSingleIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountIn, uint256 swapFee) → uint256 poolAmountOut external`

### Function `calcSingleInGivenPoolOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountOut, uint256 swapFee) → uint256 tokenAmountIn external`

### Function `calcSingleOutGivenPoolIn(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 poolAmountIn, uint256 swapFee) → uint256 tokenAmountOut external`

### Function `calcPoolInGivenSingleOut(uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 poolSupply, uint256 totalWeight, uint256 tokenAmountOut, uint256 swapFee) → uint256 poolAmountIn external`
