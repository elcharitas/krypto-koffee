import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useSWR from "swr";
import { parseArgs } from "util";

type TArg = number | string | Record<string, number | string>;
type TMethodOptions = {
    contract: ethers.Contract;
    method: string;
    args?: TArg[];
    skip: boolean;
};

export const useContract = <D extends TArg[]>({
    contract,
    method,
    args = [],
    skip = false,
}: TMethodOptions) => {
    const [data, setData] = useState<D | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const [loading, setLoading] = useState(true);

    const mutate = (...args: TArg[]) => {
        setLoading(true);
        contract.functions[method](...args)
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (skip) {
            return;
        }
        mutate(...args);
    });

    return {
        data,
        error,
        loading,
        mutate,
    };
};
