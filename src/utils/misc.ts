import { ethers } from "ethers";
import KryptoKoffee from "src/contracts/KryptoKoffee.json";
import { provider } from "./provider";

export const contract = (
    address: string,
    abi: ethers.ContractInterface,
    withSignerIfPossible = false
) => {
    const signerProvider = provider.ethers() || provider.ethersSync();
    const signer = withSignerIfPossible
        ? signerProvider.getSigner()
        : signerProvider;
    return new ethers.Contract(address, abi, signer);
};

export const pageContractAbi = KryptoKoffee.abi;
