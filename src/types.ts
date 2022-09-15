export enum EWallet {
    MetaMask = "metamask",
    Coinbase = "coinbase",
    WalletConnect = "walletconnect",
}

export enum ENetwork {
    // Ethereum = 1,
    Goerli = 5,
    // Polygon = 137,
    // Mumbai = 80001,
}

export enum ECreatorCategory {
    Influencer = 1,
    Developer,
    YouTuber,
    Educator,
    Blogger,
    Coach,
    Other,
}

export interface IPage {
    authWallet: TAuthWallet;
    network: ENetwork;
}

export interface ICreator {
    name?: string;
    bio?: string;
    description?: string;
    address: string;
    category?: ECreatorCategory;
    photoURL?: string;
    links?: string[];
    coffeePrice?: string;
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
    photoURL?: string;
    address: string;
};

export type TEventResponse<T = unknown> = {
    data: TEventData<T>;
};

export type TEvent<T> = {
    address: string;
    transaction_hash: string;
    block_number: number;
    block_timestamp: number;
    block_hash: string;
    data: T;
};

export type TEventData<T> = {
    total: number;
    page: number;
    page_size: number;
    result: TEvent<T>[];
};

export type TPageClaimedEvent = {
    creator: string;
    pageId: string;
    ipns: string;
    paypage: string;
};
