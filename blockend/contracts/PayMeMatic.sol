// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./PayMeWallet.sol";

/**
 * @dev PayMeMatic is a contract that allows users
 * to receive donations and optionally swap them for MATIC
 * withdraw tokens from the contract.
 */
contract PayMeMatic {
    // router address
    address private immutable router;
    // the address of the wallet
    mapping(string => address) paypage;

    constructor(address _router) {
        router = _router;
    }

    function claim(string memory _pageId) external {
        paypageOwner[_pageId] = address(PayMeWallet(msg.sender, router));
    }
}
