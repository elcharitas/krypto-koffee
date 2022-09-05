import { FC, useEffect } from "react";
import { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MainLayout } from "src/layout";
import { useApp } from "src/hooks";
import { Storage } from "src/utils/storage";
import { TAuthWallet } from "src/types";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        fontFamily: "Nunito",
    },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const { authWallet, updateWallet, toggleAccounts } = useApp();

    useEffect(() => {
        const savedWallet = Storage.getItem<TAuthWallet>("paymematic");
        if (savedWallet) updateWallet(savedWallet);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NextProgress color="#ce93d8" />
            <MainLayout toggleAccounts={toggleAccounts} authWallet={authWallet}>
                <Component {...pageProps} />
            </MainLayout>
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
