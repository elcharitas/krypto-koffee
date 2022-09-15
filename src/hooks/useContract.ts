import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

type TArg = number | string | Record<string, number | string> | BigNumber;
type TMethodOptions = {
    contract: ethers.Contract;
    method: string;
    args?: TArg[];
    skip: boolean;
    onResult?: (result: unknown) => void;
    onError?: (error: { reason?: string }) => void;
};

export const useContract = <D extends TArg[]>({
    contract,
    method,
    args = [],
    skip = false,
    onResult,
    onError,
}: TMethodOptions) => {
    const [data, setData] = useState<D | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const [loading, setLoading] = useState(false);

    const mutate = (...args: TArg[]) => {
        setLoading(true);
        contract.functions[method](...args)
            .then(async (result) => {
                if (result.wait) {
                    await result.wait();
                }
                onResult?.(result);
                setData(result);
            })
            .catch((error) => {
                onError?.(error);
                setError(error);
            })
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
