import { ethers } from "ethers";
import { TCallback } from "src/types";
import { provider } from "./provider";

export const contract = (
    address: string,
    abi: string[],
    withSignerIfPossible = true
) => {
    const signerProvider = provider.ethers() || provider.ethersSync();
    const signer = withSignerIfPossible
        ? signerProvider.getSigner()
        : signerProvider;
    return new ethers.Contract(address, abi, signer);
};

export const debounce = <T extends TCallback>(fn: T, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};
