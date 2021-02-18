# `XTokenFactory`

Contract module which provides an functionality deploying a registering new xToken contracts.

## Functions:

- `constructor(address _xTokenWrapper, address _operationsRegistry, address _eurPriceFeed) (public)`

- `setXTokenWrapper(address _xTokenWrapper) (external)`

- `setOperationsRegistry(address _operationsRegistry) (external)`

- `setEurPriceFeed(address _eurPriceFeed) (external)`

- `deployXToken(address token_, string name_, string symbol_, uint8 decimals_, string kya_, address authorization_, address assetFeed_) (external)`

- `_setXTokenWrapper(address _xTokenWrapper) (internal)`

- `_setOperationsRegistry(address _operationsRegistry) (internal)`

- `_setEurPriceFeed(address _eurPriceFeed) (internal)`

## Events:

- `XTokenWrapperSetted(address newXTokenWrapper)`

- `OperationsRegistrySetted(address newOperationsRegistry)`

- `EurPriceFeedSetted(address newEurPriceFeed)`

- `XTokenDeployed(address xToken)`

### Function `constructor(address _xTokenWrapper, address _operationsRegistry, address _eurPriceFeed) public`

Sets the values for {xTokenWrapper}, {operationsRegistry} and {eurPriceFeed}.

Sets ownership to the account that deploys the contract.

### Function `setXTokenWrapper(address _xTokenWrapper) → bool external`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the new xToken Wrapper module.

### Function `setOperationsRegistry(address _operationsRegistry) → bool external`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_operationsRegistry` should not be the zero address.

#### Parameters:

- `_operationsRegistry`: The address of the new Operations Registry module.

### Function `setEurPriceFeed(address _eurPriceFeed) → bool external`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Function `deployXToken(address token_, string name_, string symbol_, uint8 decimals_, string kya_, address authorization_, address assetFeed_) → address external`

Deploys a new xToken.

     Register the new xToken in xTokenWrapper

     Register the new xToken as allowed asset in OperationRagistry

     Registrer the assetFeed for the new xToken in EurPriceFeed

Requirements:

- the caller must be the owner.

- xToken deployment requirement.

- xTokenWrapper registerToken function requirements.

- OperationsRegistry allowAsset function requirements.

- EurPriceFeed setAssetFeed function requirements.

#### Parameters:

- `token_`: The address of the ERC20 token the xToken represents.

- `name_`: The name of the new xTokens.

- `symbol_`: The symbol of the new xToken.

- `decimals_`: The decimals of the new xToken.

- `kya_`: The Know you asset of the new xToken.

- `authorization_`: Address of the authorization module to be used by the new xToken.

- `assetFeed_`: The address of the new assetFeed to be used in EurPriceFeed for the new xToken.

### Function `_setXTokenWrapper(address _xTokenWrapper) internal`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_xTokenWrapper` should not be the zero address.

#### Parameters:

- `_xTokenWrapper`: The address of the new xToken Wrapper module.

### Function `_setOperationsRegistry(address _operationsRegistry) internal`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_operationsRegistry` should not be the zero address.

#### Parameters:

- `_operationsRegistry`: The address of the new Operations Registry module.

### Function `_setEurPriceFeed(address _eurPriceFeed) internal`

Sets `_eurPriceFeed` as the new EUR Price feed module.

Requirements:

- the caller must be the owner.

- `_eurPriceFeed` should not be the zero address.

#### Parameters:

- `_eurPriceFeed`: The address of the new EUR Price feed module.

### Event `XTokenWrapperSetted(address newXTokenWrapper)`

Emitted when `xTokenWrapper` address is setted.

### Event `OperationsRegistrySetted(address newOperationsRegistry)`

Emitted when `operationsRegistry` address is setted.

### Event `EurPriceFeedSetted(address newEurPriceFeed)`

Emitted when `eurPriceFeed` address is setted.

### Event `XTokenDeployed(address xToken)`

Emitted when xToken is deployed.
