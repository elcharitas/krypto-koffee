import { ethers } from "ethers";
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
