import { FC } from "react";
import Image from "next/image";
import {
    AppBar,
    Button,
    Avatar,
    Box,
    Typography,
    Toolbar,
    Tooltip,
    styled,
} from "@mui/material";
import { SupervisedUserCircle, WalletRounded } from "@mui/icons-material";
import { TAuthWallet, TCallback } from "src/types";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

export interface INavbar {
    authWallet: TAuthWallet;
    toggleAccount: TCallback;
}
export const Navbar: FC<INavbar> = ({ authWallet, toggleAccount }) => (
    <>
        <NavbarRoot>
            <Toolbar
                disableGutters
                sx={{
                    minHeight: 64,
                    left: 0,
                    px: 2,
                }}
            >
                <Tooltip title="Token Manager">
                    <Typography sx={{ ml: 1 }}>
                        <Image
                            src="/images/logo.png"
                            alt="Token Manager"
                            width="40"
                            height="40"
                        />
                    </Typography>
                </Tooltip>

                <Box sx={{ flexGrow: 1 }} />

                {!authWallet.connected && (
                    <Tooltip
                        title={
                            !authWallet.connected
                                ? "Connect Non-Custodial Wallet"
                                : `Disconnect ${authWallet.shortAddress}`
                        }
                    >
                        <Button
                            sx={{ textTransform: "capitalize" }}
                            color="warning"
                            variant="outlined"
                            onClick={toggleAccount}
                        >
                            {!authWallet.connected ? (
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: "none",
                                                md: "inline",
                                            },
                                        }}
                                    >
                                        Connect Wallet <WalletRounded />
                                    </Typography>
                                </Typography>
                            ) : (
                                authWallet.shortAddress
                            )}
                        </Button>
                    </Tooltip>
                )}
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                        ml: 1,
                        border: "0.7px solid",
                    }}
                    src={authWallet.photoURL}
                >
                    <SupervisedUserCircle fontSize="small" />
                </Avatar>
            </Toolbar>
        </NavbarRoot>
    </>
);
