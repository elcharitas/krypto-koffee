import { ethers } from "ethers";
import PayMeMatic from "src/contracts/PayMeMatic.json";
import { provider } from "./provider";

export const contract = (
    address: string,
    abi: ethers.ContractInterface,
    withSignerIfPossible = true
) => {
    const signerProvider = provider.ethers() || provider.ethersSync();
    const signer = withSignerIfPossible
        ? signerProvider.getSigner()
        : signerProvider;
    return new ethers.Contract(address, abi, signer);
};

export const pageContractAbi: ethers.ContractInterface = PayMeMatic.abi;
