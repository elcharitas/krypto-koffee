import { useState } from "react";
import { ethers } from "ethers";
import useSWR from "swr";

type TArg = number | string | Record<string, number | string>;
type TMethodOptions = {
    contract: ethers.Contract;
    method: string;
    skip: boolean;
};

export const useContract = <D extends TArg>({
    contract,
    method,
    skip = false,
}: TMethodOptions) => {
    const [args, send] = useState<TArg[]>([]);
    const response = useSWR<D, Error>(args, (args: TArg[]) => {
        if (!skip) {
            return contract.functions[method](...args);
        }
        return Promise.resolve();
    });
    return { ...response, send };
};
