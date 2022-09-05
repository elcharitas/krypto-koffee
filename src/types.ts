export enum EWallet {
    MetaMask = "metamask",
    Coinbase = "coinbase",
    WalletConnect = "walletconnect",
}

export type TColor =
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";

export type TCallback<T = void, D = unknown> = (arg?: D) => T;

export type TAuthWallet = {
    address: string;
    shortAddress: string;
    accounts: string[];
    wallet: EWallet;
    photoURL: string;
    connected: boolean;
};

export enum ENetwork {
    Ethereum = 1,
    Goerli = 5,
    Polygon = 137,
    Mumbai = 80001,
}
