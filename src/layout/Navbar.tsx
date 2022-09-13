import { Dispatch, FC } from "react";
import {
    AppBar,
    Button,
    Container,
    Box,
    Typography,
    Toolbar,
    Tooltip,
    Stack,
    styled,
} from "@mui/material";
import {
    WalletRounded,
    AccountBalanceWalletRounded,
} from "@mui/icons-material";
import { ENetwork, TAuthWallet, TCallback } from "src/types";
import { Select } from "src/components/Select";
import Image from "next/image";
import NextLink from "next/link";
import { denum } from "src/utils";

const networks = denum(ENetwork).map(([label, value]) => ({
    label,
    value,
}));

const NavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: theme.shadows[3],
}));

export interface INavbar {
    network: ENetwork | string | undefined;
    setNetwork: Dispatch<ENetwork>;
    authWallet: TAuthWallet;
    toggleAccounts: TCallback;
}
export const Navbar: FC<INavbar> = ({
    network,
    authWallet,
    toggleAccounts,
    setNetwork,
}) => (
    <>
        <NavbarRoot>
            <Toolbar
                disableGutters
                sx={{
                    minHeight: 60,
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
                        <NextLink href="/" passHref>
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
                        </NextLink>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Select
                                options={networks}
                                value={network}
                                onChange={(netW) => setNetwork(Number(netW))}
                                sx={{
                                    height: "32px",
                                    display: { xs: "none", md: "flex" },
                                }}
                                placeholder="Select a Network"
                            />
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
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {!authWallet.connected ? (
                                            <>
                                                Connect Wallet
                                                <AccountBalanceWalletRounded
                                                    sx={{ ml: 1 }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {authWallet.shortAddress} &nbsp;
                                                <Image
                                                    src={`/assets/wallets/${authWallet.wallet?.toLowerCase()}.png`}
                                                    width={18}
                                                    height={18}
                                                    alt={authWallet.wallet}
                                                />
                                            </>
                                        )}
                                    </Typography>
                                </Button>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </NavbarRoot>
    </>
);
