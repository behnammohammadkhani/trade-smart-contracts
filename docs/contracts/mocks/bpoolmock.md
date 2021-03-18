# `BPoolMock`

## Functions:

- `constructor(address[] tokens) (public)`

- `setExtactAmount(bool exact) (public)`

- `calcOutGivenIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountIn, uint256 swapFee) (external)`

- `calcInGivenOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountOut, uint256 swapFee) (external)`

- `getBalance(address token) (external)`

- `getDenormalizedWeight(address token) (external)`

- `getSwapFee() (external)`

- `swapExactAmountOut(address tokenIn, uint256 maxAmountIn, address tokenOut, uint256 tokenAmountOut, uint256 maxPrice) (external)`

- `swapExactAmountIn(address tokenIn, uint256 tokenAmountIn, address tokenOut, uint256 minAmountOut, uint256 maxPrice) (external)`

- `getCurrentTokens() (external)`

- `joinPool(uint256 poolAmountOut, uint256[] maxAmountsIn) (external)`

- `exitPool(uint256 poolAmountIn, uint256[] minAmountsOut) (external)`

- `joinswapExternAmountIn(address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) (external)`

- `joinswapPoolAmountOut(address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) (external)`

- `exitswapPoolAmountIn(address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) (external)`

- `exitswapExternAmountOut(address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) (external)`

### Function `constructor(address[] tokens) public`

### Function `setExtactAmount(bool exact) public`

### Function `calcOutGivenIn(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountIn, uint256 swapFee) → uint256 external`

### Function `calcInGivenOut(uint256 tokenBalanceIn, uint256 tokenWeightIn, uint256 tokenBalanceOut, uint256 tokenWeightOut, uint256 tokenAmountOut, uint256 swapFee) → uint256 external`

### Function `getBalance(address token) → uint256 external`

### Function `getDenormalizedWeight(address token) → uint256 external`

### Function `getSwapFee() → uint256 external`

### Function `swapExactAmountOut(address tokenIn, uint256 maxAmountIn, address tokenOut, uint256 tokenAmountOut, uint256 maxPrice) → uint256, uint256 external`

### Function `swapExactAmountIn(address tokenIn, uint256 tokenAmountIn, address tokenOut, uint256 minAmountOut, uint256 maxPrice) → uint256, uint256 external`

### Function `getCurrentTokens() → address[] tokens external`

### Function `joinPool(uint256 poolAmountOut, uint256[] maxAmountsIn) external`

### Function `exitPool(uint256 poolAmountIn, uint256[] minAmountsOut) external`

### Function `joinswapExternAmountIn(address tokenIn, uint256 tokenAmountIn, uint256 minPoolAmountOut) → uint256 poolAmountOut external`

### Function `joinswapPoolAmountOut(address tokenIn, uint256 poolAmountOut, uint256 maxAmountIn) → uint256 tokenAmountIn external`

### Function `exitswapPoolAmountIn(address tokenOut, uint256 poolAmountIn, uint256 minAmountOut) → uint256 tokenAmountOut external`

### Function `exitswapExternAmountOut(address tokenOut, uint256 tokenAmountOut, uint256 maxPoolAmountIn) → uint256 poolAmountIn external`
