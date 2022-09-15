import { FC, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Moralis from "moralis";
import NextProgress from "next-progress";
import toast, { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MainLayout } from "src/layout";
import { useApp } from "src/hooks";
import { Storage, provider, formatAddress } from "src/utils";
import { ENetwork, EWallet, TAuthWallet } from "src/types";
import { AccountsModal } from "src/sections";

const theme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: "#ED7D3A",
        },
    },
    typography: {
        fontFamily: "Nunito",
    },
});

/** start Moralis */
if (process.env.NEXT_PUBLIC_MORALIS_API_KEY)
    Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });

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
        provider
            .disconnect()
            .then(() => {
                toast.success("Your Wallet has been disconnected successfully");
            })
            .catch(() => {
                toast.error("Sorry, wallet disconnection incomplete");
            })
            .finally(() => {
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
                Storage.setItem("crypto-coffee", newAuthWallet);
            });
    };

    const connectWallet = (wallet = EWallet.MetaMask) => {
        const chainId = network || ENetwork.Goerli;
        provider
            .connect(wallet, chainId, (e) => {
                if (e?.message) toast.error(e.message);
            })
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
                    Storage.setItem("crypto-coffee", newAuthWallet);
                }
            })
            .then(toggleAccounts)
            .catch(() => {
                disconnectWallet();
                toast.error("Sorry, Wallet connection failed");
            });
    };

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("crypto-coffee");
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
            <NextProgress color="#ED7D3A" />
            <MainLayout
                network={network}
                setNetwork={setNetwork}
                toggleAccounts={toggleAccounts}
                authWallet={authWallet}
            >
                <Head>
                    <title>
                        {String(Component.displayName || "🤔")} | KryptoKoffee
                    </title>
                </Head>
                <Component
                    network={network}
                    authWallet={authWallet}
                    {...pageProps}
                />
            </MainLayout>
            <AccountsModal
                isOpen={showAccounts}
                authWallet={authWallet}
                toggleAccounts={toggleAccounts}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
            />
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: "6px",
                        background: "#333",
                        padding: "8px 12px",
                        fontFamily: "Nunito",
                        color: "#fff",
                    },
                }}
            />
        </ThemeProvider>
    );
};

export default App;
