import { ethers } from "ethers";
import KryptoKoffee from "src/contracts/KryptoKoffee.json";
import PayWallet from "src/contracts/PayWallet.json";
import { ECreatorCategory, ICreator } from "src/types";
import { provider } from "./provider";
import { fetchJSON, resolveIpns } from "./storage";

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
export const payWalletContractAbi = PayWallet.abi;

export const getCreator = (
    ipns: string,
    creator: string,
    pageId: string
): Promise<ICreator> =>
    resolveIpns(ipns)
        .then((data) => fetchJSON<ICreator>(data.value))
        .then((data) => ({
            category: ECreatorCategory.Other,
            ...data,
            ipns,
            photoURL:
                data?.photoURL && !data.photoURL.match(/avatar/)
                    ? `https://${data.photoURL}.dweb.link/image.jpeg`
                    : "/assets/avatar.jpeg",
            address: creator,
            name: pageId,
        }));
