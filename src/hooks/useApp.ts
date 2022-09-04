import { useState } from "react";
import { useImmer, Updater } from "use-immer";
import { TAuthWallet, TCallback } from "src/types";

type TApp = {
    authWallet: TAuthWallet;
    toggleAccounts: TCallback;
    showAccounts: boolean;
    updateWallet: Updater<TAuthWallet>;
};
export const useApp = (): TApp => {
    const [authWallet, updateWallet] = useImmer<TAuthWallet>({
        address: "",
        shortAddress: "",
        connected: false,
        photoURL: "",
    });
    const [showAccounts, setShowAccounts] = useState(false);

    const toggleAccounts = () => setShowAccounts((show) => !show);

    return { authWallet, updateWallet, showAccounts, toggleAccounts };
};
