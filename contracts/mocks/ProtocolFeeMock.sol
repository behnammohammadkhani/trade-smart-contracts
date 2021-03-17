pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "../balancer/ISwap.sol";



contract ProtocolFeeMock is ISwap {
    uint256 private _protocolFeeAmount;

    constructor(uint256 protocolFeeAmount) public {
        setPotocolFeeAmount(protocolFeeAmount);
    }

    function setPotocolFeeAmount(uint256 protocolFeeAmount) public {
        _protocolFeeAmount = protocolFeeAmount;
    }

    function batchFee(Swap[] memory, uint256) external view returns (uint256) {
        return _protocolFeeAmount;
    }

    function multihopBatch(Swap[][] memory, uint256) external view returns (uint256) {
        return _protocolFeeAmount;
    }
}
