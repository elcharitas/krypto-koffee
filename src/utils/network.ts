import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

export enum EWallet {
    MetaMask = "metamask",
    Coinbase = "coinbase",
    WalletConnect = "walletconnect",
}

type TWalletOpts = {
    options: {
        url: string;
        appName?: string;
        rpc?: string[];
    };
    connector: typeof MetaMask | typeof CoinbaseWallet | typeof WalletConnect;
};
export const Wallet: Record<EWallet, TWalletOpts> = {
    metamask: {
        options: {
            url: "",
        },
        connector: MetaMask,
    },
    coinbase: {
        options: {
            url: "",
            appName: "",
        },
        connector: CoinbaseWallet,
    },
    walletconnect: {
        options: {
            url: "",
            rpc: [],
        },
        connector: WalletConnect,
    },
};

export const initConnector = (wallet: EWallet) => {
    const { connector, options } = Wallet[wallet];
    return initializeConnector(
        (actions) => new connector(actions as any, options)
    );
};