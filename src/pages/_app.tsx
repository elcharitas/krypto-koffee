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

    const connectWallet = (wallet = EWallet.MetaMask) => {
        provider
            .connect(wallet, String(network || ENetwork.Ethereum), console.log)
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
                        wallet,
                        network,
                    };
                    updateWallet(newAuthWallet);
                    Storage.setItem("paymematic", newAuthWallet);
                }
            })
            .then(toggleAccounts)
            .catch(() => {});
    };

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

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("paymematic");
        if (savedWallet?.connected) {
            if (savedWallet.network) setNetwork(savedWallet.network);
            connectWallet(savedWallet.wallet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
