# Krypto Koffee

> a web3fied buymeacoffee.com connecting helping creators receive support from their audience

Krypto Koffee is a decentralized payment bridge for web3 content creators. It is a web3fied version of buymeacoffee.com which allows content creators receive support from their audience in cypto(USDC)

Krypto Koffee is a decentralized crowd funding dApp designed to help creators monetize their audience, fans and followers. It will allow creators to grow and get rewarded for their effort in building a loyal community of connected users who share and engage with them on their platform.

## Tracks Submitted

-   Coinbase Challenge 1 x 2
-   IPFS/Filecoin integration
-   Storage Wizard
-   WorldCoin ID
-   Web3fy Web2 product

## Technologies Used

-   Coinbase Wallet integration
-   WorldID for zk verification
-   web3.storage and w3name for IPFS
-   React/NextJS for Frontend
-   MUI for UI Framework
-   ethers.js lib amongst many others

## Challenges encountered

-   Coinbase Wallet bugs at times when metamask is also installed(we had to uninstall metamask)
-   The world id docs is straightforward. we found an easy way to integrate it. Although, WorldID can be very slow in verification and at first, we thought it was a bug on our side. In future iterations, we intend to create a custom integration of WorldID.
-   Setting up IPFS for access only storage was a bit troublesome. We had to implement a accessKey generator. This access key could then be used by users to update their profile. WIthout an access key, updating profiles becomes impossible.
-   Issues also came up with saving files. We needed to save the files with specific file names. Thanks to Jenks whose code helped with this

## Team members

-   [@elcharitas](https://github.com/elcharitas)
-   [@Immortalitic](https://github.com/immortalitic)
