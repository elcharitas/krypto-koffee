import { providers } from "ethers";
import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { ENetwork, EWallet, TCallback } from "src/types";
import { initConnector } from "./network";
import { getRPCUrl } from "./rpc";

interface IWalletProvider {
    chainId: ENetwork;
    connector?: Connector;
    rpcNode?: providers.JsonRpcProvider;
    connect(
        wallet: EWallet,
        chainId: ENetwork,
        reject: TCallback<void, Error>
    ): Promise<Web3ReactHooks | null>;
    disconnect(): Promise<void>;
    ethers(): providers.Web3Provider | undefined;
    ethersSync(network: ENetwork): providers.JsonRpcProvider;
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
    chainId: ENetwork.Ethereum,
    async connect(wallet, chainId, reject) {
        const [connector, hooks] = initConnector(wallet, chainId, reject);
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
    ethersSync(network) {
        if (!this.rpcNode) {
            const rpcUrl = getRPCUrl(network);
            this.rpcNode = new providers.JsonRpcProvider(rpcUrl);
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
