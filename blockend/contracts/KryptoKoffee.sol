// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./PayWallet.sol";

/**
 * @dev KryptoKoffee is a contract that allows users
 * to receive donations and optionally swap them for MATIC
 * withdraw tokens from the contract.
 */
contract KryptoKoffee {
    // router address
    address private immutable router;
    // the address of the wallet
    mapping(string => address) paypage;

    constructor(address _router) {
        router = _router;
    }

    function claim(string memory _pageId, uint256 _category) external {
        paypage[_pageId] = address(
            new PayWallet(msg.sender, _category, router)
        );
    }
}
