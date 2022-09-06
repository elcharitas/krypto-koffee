import { providers } from "ethers";
import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { EWallet, TCallback } from "src/types";
import { initConnector } from "./network";

interface IWalletProvider {
    chainId: string;
    connector?: Connector;
    rpcNode?: providers.JsonRpcProvider;
    connect(
        wallet: EWallet,
        chainId: string,
        reject: TCallback
    ): Promise<Web3ReactHooks | null>;
    disconnect(): Promise<void>;
    ethers(): providers.Web3Provider | undefined;
    ethersSync(uri: string): providers.JsonRpcProvider;
    send<T = unknown>(
        method: string,
        params?: Record<string, string | string[]>
    ): Promise<T>;
    on<T = string[]>(ev: string, cb: TCallback<void, T>): IWalletProvider;
    removeListener<T = string[]>(
        ev: string,
        cb: TCallback<void, T>
    ): IWalletProvider;
}

export const provider: IWalletProvider = {
    chainId: "1",
    async connect(wallet, chainId, reject) {
        const [connector, hooks] = initConnector(wallet);
        this.chainId = chainId;
        this.connector = connector;
        await connector.activate().catch(reject);
        return hooks;
    },
    disconnect() {
        return Promise.resolve(this.connector?.deactivate?.call([]));
    },
    ethers() {
        if (!this.connector?.provider) return undefined;
        return new providers.Web3Provider(this.connector.provider);
    },
    ethersSync(uri) {
        if (!this.rpcNode) {
            this.rpcNode = new providers.JsonRpcProvider(uri);
        }
        return this.rpcNode;
    },
    send<T = unknown>(
        method: string,
        params?: Record<string, string | string[]>
    ) {
        return Promise.resolve<T>(
            this.connector?.provider?.request({ method, params }) as Promise<T>
        );
    },
    on<T = string[]>(ev: string, cb: TCallback<void, T>) {
        this.connector?.provider?.on(ev, cb);
        return this;
    },
    removeListener<T = string[]>(ev: string, cb: TCallback<void, T>) {
        this.connector?.provider?.removeListener(ev, cb);
        return this;
    },
};
