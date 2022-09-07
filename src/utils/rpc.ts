import { ENetwork } from "src/types";

type TNetworkNodes = Record<ENetwork, string>;

export const networkNodes: TNetworkNodes = {
    1: "mainnet",
    5: "goerli",
    137: "polygon-mainnet",
    80001: "polygon-mumbai",
};

export const getNetworkNode = (network: ENetwork) =>
    networkNodes[network] || networkNodes[ENetwork.Ethereum];

export const getRPCUrl = (network: ENetwork) =>
    `https://${getNetworkNode(network)}.infura.io/v3/${
        process.env.NEXT_PUBLIC_RPC_KEY
    }`;

export const getRPCUrls = () =>
    Object.keys(networkNodes).map(Number).map(getRPCUrl);
