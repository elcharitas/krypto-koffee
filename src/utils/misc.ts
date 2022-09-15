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

export const USDC_CONTRACT = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

export const pageContractAbi = KryptoKoffee.abi;
export const payWalletContractAbi = PayWallet.abi;

export const imgCIDToUrl = (cid: string) =>
    cid && !cid.match(/avatar/)
        ? `https://ipfs.io/ipfs/${cid}/image.jpeg`
        : cid;

export const getCreator = (
    ipns: string,
    creator: string,
    pageId: string
): Promise<ICreator> =>
    resolveIpns(ipns)
        .then((data) => fetchJSON<ICreator>(data.value))
        .then((data) => ({
            category: ECreatorCategory.Other,
            photoURL: "/assets/avatar.jpeg",
            ...data,
            ipns,
            address: creator,
            name: pageId,
        }));
