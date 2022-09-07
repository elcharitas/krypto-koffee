import { FC, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import NextProgress from "next-progress";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MainLayout } from "src/layout";
import { useApp } from "src/hooks";
import { Storage } from "src/utils/storage";
import { ENetwork, EWallet, TAuthWallet } from "src/types";
import { AccountsModal } from "src/sections";
import { provider } from "src/utils/provider";
import { formatAddress } from "src/utils/formats";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: "Nunito",
    },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const {
        authWallet,
        updateWallet,
        showAccounts,
        toggleAccounts,
        network,
        setNetwork,
    } = useApp();

    const disconnectWallet = () => {
        provider.disconnect().then(() => {
            const newAuthWallet = {
                accounts: [],
                address: "",
                shortAddress: "",
                connected: false,
                photoURL: "",
                wallet: undefined,
                network: undefined,
            };
            updateWallet(newAuthWallet);
            Storage.setItem("paymematic", newAuthWallet);
        });
    };

    const connectWallet = (wallet = EWallet.MetaMask) => {
        const chainId = network || ENetwork.Ethereum;
        provider
            .connect(wallet, chainId, console.log)
            .then(() => provider.send<string[]>("eth_requestAccounts"))
            .then((accounts) => {
                if (accounts) {
                    const [account] = accounts;
                    const newAuthWallet = {
                        accounts,
                        address: account,
                        shortAddress: formatAddress(account),
                        connected: true,
                        photoURL: "",
                        network: chainId,
                        wallet,
                    };
                    setNetwork(chainId);
                    updateWallet(newAuthWallet);
                    Storage.setItem("paymematic", newAuthWallet);
                }
            })
            .then(toggleAccounts)
            .catch(() => {
                disconnectWallet();
            });
    };

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("paymematic");
        if (savedWallet?.connected) {
            if (savedWallet.network) setNetwork(savedWallet.network);
            connectWallet(savedWallet.wallet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const accountsChanged = (accounts?: string[]) => {
            if (!accounts || accounts.length === 0) disconnectWallet();
        };
        const chainChanged = (chainId?: number) => {
            if (chainId) setNetwork(chainId);
        };
        provider.on("accountsChanged", accountsChanged);
        provider.on<number>("chainChanged", chainChanged);
        return () => {
            provider.removeListener("accountsChanged", accountsChanged);
            provider.removeListener<number>("chainChanged", chainChanged);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authWallet.connected === true]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NextProgress color="#ce93d8" />
            <MainLayout
                network={network}
                setNetwork={setNetwork}
                toggleAccounts={toggleAccounts}
                authWallet={authWallet}
            >
                <Head>
                    <title>
                        {String(Component.displayName || "🤔")} | PayMeMatic
                    </title>
                </Head>
                <Component {...pageProps} />
            </MainLayout>
            <AccountsModal
                isOpen={showAccounts}
                authWallet={authWallet}
                toggleAccounts={toggleAccounts}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
            />
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
