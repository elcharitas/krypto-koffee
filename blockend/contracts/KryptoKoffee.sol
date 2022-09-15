// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

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
    mapping(string => address) public paypage;

    event PageClaimed(
        string pageId,
        bytes _ipns,
        address indexed creator,
        address indexed paypage
    );

    constructor(address _router) {
        router = _router;
    }

    /**
     * Claiming a page is free.
     * The creator of the page only has topay for Gas
     */
    function claim(string memory _pageId, bytes memory _ipns) external {
        require(paypage[_pageId] == address(0), "page already claimed");
        paypage[_pageId] = address(new PayWallet(msg.sender, _ipns, router));
        emit PageClaimed(_pageId, _ipns, msg.sender, paypage[_pageId]);
    }
}
