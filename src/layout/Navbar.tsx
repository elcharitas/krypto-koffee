import { FC } from "react";
import Image from "next/image";
import {
    AppBar,
    Button,
    Avatar,
    Container,
    Box,
    Typography,
    Toolbar,
    Tooltip,
    Stack,
    styled,
} from "@mui/material";
import {
    AccountBox,
    WalletRounded,
    AccountBalanceWalletRounded,
} from "@mui/icons-material";
import { TAuthWallet, TCallback } from "src/types";
import { Select } from "src/components/Select";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: theme.shadows[3],
}));

export interface INavbar {
    authWallet: TAuthWallet;
    toggleAccounts: TCallback;
}
export const Navbar: FC<INavbar> = ({ authWallet, toggleAccounts }) => (
    <>
        <NavbarRoot>
            <Toolbar
                disableGutters
                sx={{
                    minHeight: 44,
                    left: 0,
                    px: 2,
                    justifyContent: "space-around",
                    backgroundColor: "#111",
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    <Box sx={{ lineHeight: 0, position: "relative" }}>
                        <Tooltip title="PayMeMatic">
                            <Typography
                                sx={{
                                    ml: 1,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <WalletRounded sx={{ mr: 1 }} /> PayMeMatic
                            </Typography>
                        </Tooltip>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Select
                                placeholder="Select a Network"
                                options={[]}
                                sx={{ height: "32px" }}
                            />
                            {!authWallet.connected && (
                                <Tooltip
                                    title={
                                        !authWallet.connected
                                            ? "Connect Wallet"
                                            : `Disconnect ${authWallet.shortAddress}`
                                    }
                                >
                                    <Button
                                        sx={{ textTransform: "capitalize" }}
                                        color="secondary"
                                        variant="outlined"
                                        onClick={toggleAccounts}
                                    >
                                        {!authWallet.connected ? (
                                            <Typography
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                Connect Wallet
                                                <AccountBalanceWalletRounded
                                                    sx={{ ml: 1 }}
                                                />
                                            </Typography>
                                        ) : (
                                            authWallet.shortAddress
                                        )}
                                    </Button>
                                </Tooltip>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </NavbarRoot>
    </>
);
