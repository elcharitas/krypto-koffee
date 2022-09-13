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
    wallet: EWallet | undefined;
    network: ENetwork | undefined;
    photoURL: string;
    connected: boolean;
};

export type TCreator = {
    name?: string;
    bio?: string;
    address: string;
    photoURL: string;
};

export enum ENetwork {
    Ethereum = 1,
    Goerli = 5,
    Polygon = 137,
    Mumbai = 80001,
}
