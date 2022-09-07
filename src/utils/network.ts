import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";
import { ENetwork, EWallet, TCallback } from "src/types";
import { getRPCUrls } from "./rpc";

type TWalletConnector =
    | typeof MetaMask
    | typeof CoinbaseWallet
    | typeof WalletConnect;

const options = {
    appName: "PayMeMatic",
    url: `https://${process.env.NETX_PUBLIC_VERCEL_URL || `localhost:7000`}`,
    rpc: getRPCUrls(),
};
export const Wallet: Record<EWallet, TWalletConnector> = {
    metamask: MetaMask,
    coinbase: CoinbaseWallet,
    walletconnect: WalletConnect,
};

export const initConnector = (
    wallet: EWallet,
    network: ENetwork,
    onError: TCallback
) => {
    const connector = Wallet[wallet];
    return initializeConnector(
        (actions) =>
            new connector(
                /**
                 * web3-react is still in beta. Most connectors are not in sync
                 * This hack allows connectors to work regardless.
                 * TODO: replace this once package becomes stable
                 */
                {
                    ...actions,
                    actions,
                    options,
                    defaultChainId: network,
                    onError,
                } as any,
                options,
                true
            )
    );
};
