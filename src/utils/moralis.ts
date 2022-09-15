import Moralis from "moralis";

export const evmApi = Moralis.EvmApi;

export const { getContractEvents } = evmApi.events;
export const { getNativeBalance } = evmApi.balance;
export const { getTokenPrice, getWalletTokenBalances } = evmApi.token;
export const { resolveDomain } = evmApi.resolve;
