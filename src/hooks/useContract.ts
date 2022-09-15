import { useEffect, useState } from "react";
import { ethers } from "ethers";

type TArg = number | string | Record<string, number | string>;
type TMethodOptions = {
    contract: ethers.Contract;
    method: string;
    args?: TArg[];
    skip: boolean;
    onResult?: (result: unknown, prevData: unknown) => void;
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
            .then((result) =>
                setData((prevData) => {
                    onResult?.(result, prevData);
                    return result;
                })
            )
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
