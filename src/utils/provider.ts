import { providers } from "ethers";
import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { TCallback } from "src/types";
import { EWallet, initConnector } from "./network";

interface IWalletProvider {
    chainId: string;
    connector?: Connector;
    rpcNode?: providers.JsonRpcProvider;
    connect(
        wallet: EWallet,
        chainId: string,
        reject: TCallback
    ): Promise<Web3ReactHooks | null>;
    disconnect(): void | Promise<void> | undefined;
    ethersSync(uri: string): providers.JsonRpcProvider;
}

export const provider: IWalletProvider = {
    chainId: "1",
    async connect(wallet, chainId, reject) {
        const [connector, hooks] = initConnector(wallet);
        if (!this.connector) {
            this.chainId = chainId;
            this.connector = connector;
            await connector.activate().catch(reject);
        }
        return hooks;
    },
    disconnect() {
        return this.connector?.deactivate?.call([]);
    },
    ethersSync(uri) {
        if (!this.rpcNode) {
            this.rpcNode = new providers.JsonRpcProvider(uri);
        }
        return this.rpcNode;
    },
};
