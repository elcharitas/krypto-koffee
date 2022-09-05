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
import { TAuthWallet } from "src/types";
import { AccountsModal } from "src/sections";
import { provider } from "src/utils/provider";
import { EWallet } from "src/utils/network";

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
            .connect(wallet, String(network), console.log)
            .then(() => provider.ethers()?.listAccounts())
            .then((accounts) => {
                if (accounts) {
                    const [account] = accounts;
                    updateWallet({
                        address: account,
                        shortAddress: account,
                        connected: true,
                        photoURL: "",
                    });
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("paymematic");
        if (savedWallet) updateWallet(savedWallet);

        return () => {
            Storage.setItem("paymematic", authWallet);
        };
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
            />
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
