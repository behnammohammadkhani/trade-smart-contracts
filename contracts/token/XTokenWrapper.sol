//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./IXToken.sol";

import "hardhat/console.sol";

/**
 * @title XTokenWrapper
 * @author Protofire
 * @dev Contract module which provides an functionality for wrapping tokens into the corresponding XToken.
 *
 */
contract XTokenWrapper is AccessControl {
    using SafeERC20 for IERC20;

    address public constant ETH_TOKEN_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    bytes32 public constant REGISTRY_MANAGER_ROLE = keccak256("REGISTRY_MANAGER_ROLE");

    /**
     * @dev Token to xToken registry.
     */
    mapping(address => address) public tokenToXToken;

    /**
     * @dev xToken to Token registry.
     */
    mapping(address => address) public xTokenToToken;

    /**
     * @dev Emitted when `asset` is disallowed.
     */
    event RegisterToken(address indexed token, address indexed xToken);

    /**
     * @dev Grants the contract deployer the default admin role.
     *
     */
    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Grants REGISTRY_MANAGER_ROLE to `_registryManager`.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function setRegistryManager(address _registryManager) external {
        grantRole(REGISTRY_MANAGER_ROLE, _registryManager);
    }

    function registerToken(address _token, address _xToken) external {
        require(hasRole(REGISTRY_MANAGER_ROLE, _msgSender()), "must have registry manager role");
        require(_token != address(0), "token is the zero address");
        require(_xToken != address(0), "xToken is the zero address");

        emit RegisterToken(_token, _xToken);
        tokenToXToken[_token] = _xToken;
        xTokenToToken[_xToken] = _token;
    }

    function wrap(address _token, uint256 _amount) external payable returns (bool) {
        address xTokenAddress = tokenToXToken[_token];
        require(xTokenAddress != address(0), "token is not registered");

        if (_token != ETH_TOKEN_ADDRESS) {
            // It uses tx.origin because user may use a CPK for interacting with the protocol.
            // This way it saves having to transfer first the tokens to the CPK

            // solhint-disable-next-line avoid-tx-origin
            IERC20(_token).safeTransferFrom(tx.origin, address(this), _amount);
        }

        uint256 amount = _token != ETH_TOKEN_ADDRESS ? _amount : msg.value;

        require(amount > 0, "amount to wrap should be positive");

        // Mint - if user is calling this through its CPK then the xTokens are sended to the CPK
        // but user address is used for authorizing the operation
        IXToken(xTokenAddress).mint(_msgSender(), amount);

        return true;
    }

    function unwrap(address _xToken, uint256 _amount) external returns (bool) {
        address tokenAddress = xTokenToToken[_xToken];
        require(tokenAddress != address(0), "xToken is not registered");
        require(_amount > 0, "amount to wrap should be positive");

        // BurnFrom - if user is calling this through its CPK then the xTokens are burned from the CPK
        // but user address is used for authorizing the operation
        IXToken(_xToken).burnFrom(_msgSender(), _amount);

        // It uses tx.origin because user may use a CPK for interacting with the
        // protocol so collateral is sended to the user
        if (tokenAddress != ETH_TOKEN_ADDRESS) {
            // solhint-disable-next-line avoid-tx-origin
            IERC20(tokenAddress).safeTransfer(tx.origin, _amount);
        } else {
            // solhint-disable-next-line
            (bool sent, ) = tx.origin.call{ value: _amount }("");
            require(sent, "Failed to send Ether");
        }

        return true;
    }
}
