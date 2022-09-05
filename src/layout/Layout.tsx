import React, { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar, INavbar } from "./Navbar";
import { Credits } from "./Credits";

const LayoutRoot = styled("div")(() => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 64,
}));

interface IMainLayout extends INavbar {
    children: ReactNode;
}
export const MainLayout: FC<IMainLayout> = ({
    children,
    authWallet,
    toggleAccounts,
    network,
    setNetwork,
}) => (
    <>
        <LayoutRoot>
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    width: "100%",
                    minHeight: "85vh",
                    paddingTop: "8px",
                }}
            >
                <Container>{children}</Container>
            </Box>
        </LayoutRoot>
        <Navbar
            authWallet={authWallet}
            toggleAccounts={toggleAccounts}
            network={network}
            setNetwork={setNetwork}
        />
        <Credits />
    </>
);
