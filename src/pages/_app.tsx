import { FC, useEffect } from "react";
import { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MainLayout } from "src/layout";
import { useApp } from "src/hooks";
import { Storage } from "src/utils/storage";
import { TAuthWallet } from "src/types";

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const { authWallet, updateWallet, toggleAccounts } = useApp();

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("paymematic");
        if (savedWallet) updateWallet(savedWallet);
    }, []);

    return (
        <ThemeProvider theme="dark">
            <CssBaseline />
            <NextProgress />
            <MainLayout toggleAccounts={toggleAccounts} authWallet={authWallet}>
                <Component {...pageProps} />
            </MainLayout>
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
