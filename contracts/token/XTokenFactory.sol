//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./XToken.sol";
import "./XTokenWrapper.sol";
import "../authorization/IOperationsRegistry.sol";
import "../authorization/IEurPriceFeed.sol";

import "hardhat/console.sol";

/**
 * @title XTokenFactory
 * @author Protofire
 * @dev Contract module which provides an functionality deploying a registering new xToken contracts.
 *
 */
contract XTokenFactory is Ownable {
    /**
     * @dev Address of xToke Wrapper module.
     */
    address public xTokenWrapper;

    /**
     * @dev Address of Operations Registry module.
     */
    address public operationsRegistry;

    /**
     * @dev Address of EUR Price feed module.
     */
    address public eurPriceFeed;

    /**
     * @dev Emitted when `xTokenWrapper` address is setted.
     */
    event XTokenWrapperSetted(address indexed newXTokenWrapper);

    /**
     * @dev Emitted when `operationsRegistry` address is setted.
     */
    event OperationsRegistrySetted(address indexed newOperationsRegistry);

    /**
     * @dev Emitted when `eurPriceFeed` address is setted.
     */
    event EurPriceFeedSetted(address indexed newEurPriceFeed);

    /**
     * @dev Emitted when xToken is deployed.
     */
    event XTokenDeployed(address indexed xToken);

    /**
     * @dev Sets the values for {xTokenWrapper}, {operationsRegistry} and {eurPriceFeed}.
     *
     * Sets ownership to the account that deploys the contract.
     *
     */
    constructor(
        address _xTokenWrapper,
        address _operationsRegistry,
        address _eurPriceFeed
    ) public {
        _setXTokenWrapper(_xTokenWrapper);
        _setOperationsRegistry(_operationsRegistry);
        _setEurPriceFeed(_eurPriceFeed);
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_xTokenWrapper` should not be the zero address.
     *
     * @param _xTokenWrapper The address of the new xToken Wrapper module.
     */
    function setXTokenWrapper(address _xTokenWrapper) external onlyOwner returns (bool) {
        _setXTokenWrapper(_xTokenWrapper);
        return true;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_operationsRegistry` should not be the zero address.
     *
     * @param _operationsRegistry The address of the new Operations Registry module.
     */
    function setOperationsRegistry(address _operationsRegistry) external onlyOwner returns (bool) {
        _setOperationsRegistry(_operationsRegistry);
        return true;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_eurPriceFeed` should not be the zero address.
     *
     * @param _eurPriceFeed The address of the new EUR Price feed module.
     */
    function setEurPriceFeed(address _eurPriceFeed) external onlyOwner returns (bool) {
        _setEurPriceFeed(_eurPriceFeed);
        return true;
    }

    /**
     * @dev Deploys a new xToken.
     *      Register the new xToken in xTokenWrapper
     *      Register the new xToken as allowed asset in OperationRagistry
     *      Registrer the assetFeed for the new xToken in EurPriceFeed
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - xToken deployment requirement.
     * - xTokenWrapper registerToken function requirements.
     * - OperationsRegistry allowAsset function requirements.
     * - EurPriceFeed setAssetFeed function requirements.
     *
     * @param token_ The address of the ERC20 token the xToken represents.
     * @param name_ The name of the new xTokens.
     * @param symbol_ The symbol of the new xToken.
     * @param decimals_ The decimals of the new xToken.
     * @param kya_ The Know you asset of the new xToken.
     * @param authorization_ Address of the authorization module to be used by the new xToken.
     * @param assetFeed_ The address of the new assetFeed to be used in EurPriceFeed for the new xToken.
     */
    function deployXToken(
        address token_,
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        string memory kya_,
        address authorization_,
        address assetFeed_
    ) external onlyOwner returns (address) {
        XToken xToken = new XToken(name_, symbol_, decimals_, kya_, authorization_, operationsRegistry);
        xToken.setWrapper(xTokenWrapper);
        xToken.grantRole(xToken.DEFAULT_ADMIN_ROLE(), owner());

        XTokenWrapper(xTokenWrapper).registerToken(token_, address(xToken));
        IOperationsRegistry(operationsRegistry).allowAsset(address(xToken));
        IEurPriceFeed(eurPriceFeed).setAssetFeed(address(xToken), assetFeed_);

        emit XTokenDeployed(address(xToken));
        return address(xToken);
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_xTokenWrapper` should not be the zero address.
     *
     * @param _xTokenWrapper The address of the new xToken Wrapper module.
     */
    function _setXTokenWrapper(address _xTokenWrapper) internal {
        require(_xTokenWrapper != address(0), "xToken wrapper is the zero address");
        emit XTokenWrapperSetted(_xTokenWrapper);
        xTokenWrapper = _xTokenWrapper;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_operationsRegistry` should not be the zero address.
     *
     * @param _operationsRegistry The address of the new Operations Registry module.
     */
    function _setOperationsRegistry(address _operationsRegistry) internal {
        require(_operationsRegistry != address(0), "operations registry feed is the zero address");
        emit OperationsRegistrySetted(_operationsRegistry);
        operationsRegistry = _operationsRegistry;
    }

    /**
     * @dev Sets `_eurPriceFeed` as the new EUR Price feed module.
     *
     * Requirements:
     *
     * - the caller must be the owner.
     * - `_eurPriceFeed` should not be the zero address.
     *
     * @param _eurPriceFeed The address of the new EUR Price feed module.
     */
    function _setEurPriceFeed(address _eurPriceFeed) internal {
        require(_eurPriceFeed != address(0), "eur price feed is the zero address");
        emit EurPriceFeedSetted(_eurPriceFeed);
        eurPriceFeed = _eurPriceFeed;
    }
}