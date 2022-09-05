import { Dispatch, useState } from "react";
import { useImmer, Updater } from "use-immer";
import { ENetwork, TAuthWallet, TCallback } from "src/types";

type TApp = {
    network: ENetwork | undefined;
    setNetwork: Dispatch<ENetwork>;
    authWallet: TAuthWallet;
    toggleAccounts: TCallback;
    showAccounts: boolean;
    updateWallet: Updater<TAuthWallet>;
};
export const useApp = (): TApp => {
    const [network, setNetwork] = useState<ENetwork>();
    const [showAccounts, setShowAccounts] = useState(false);
    const [authWallet, updateWallet] = useImmer<TAuthWallet>({
        address: "",
        shortAddress: "",
        connected: false,
        photoURL: "",
        accounts: [],
        wallet: undefined,
    });

    const toggleAccounts = () => setShowAccounts((show) => !show);

    return {
        network,
        setNetwork,
        authWallet,
        updateWallet,
        showAccounts,
        toggleAccounts,
    };
};
