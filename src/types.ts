export type TCallback<T = void, D = unknown> = (arg?: D) => T;

export type TAuthWallet = {
    address: string;
    shortAddress: string;
    photoURL: string;
    connected: boolean;
};
