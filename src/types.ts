export type TCallback<T = void> = () => T;

export type TAuthWallet = {
    address: string;
    shortAddress: string;
    photoURL: string;
    connected: boolean;
};

export enum EWallet {
    Connect,
    Disconnect,
}
