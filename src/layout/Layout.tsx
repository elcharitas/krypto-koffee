import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar, INavbar } from "./Navbar";

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
    toggleAccount,
}) => (
    <>
        <LayoutRoot>
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                {children}
            </Box>
        </LayoutRoot>
        <Navbar authWallet={authWallet} toggleAccount={toggleAccount} />
    </>
);