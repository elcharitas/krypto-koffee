import { FC } from "react";
import Image from "next/image";
import { Box, Button, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { TAuthWallet, TCallback, TColor } from "src/types";
import { EWallet } from "src/utils/network";

const wallets = {
    CoinBase: "info",
    MetaMask: "warning",
    WalletConnect: "primary",
};

interface IAccountsModal {
    isOpen: boolean;
    toggleAccounts: TCallback;
    authWallet: TAuthWallet;
    connectWallet: TCallback<void, EWallet>;
}
export const AccountsModal: FC<IAccountsModal> = ({
    isOpen,
    toggleAccounts,
    authWallet,
    connectWallet,
}) => (
    <Modal
        open={isOpen}
        onClose={toggleAccounts}
        aria-labelledby="accounts-modal-title"
        aria-describedby="accounts-modal-description"
    >
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                borderRadius: "8px",
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography id="accounts-modal-title" align="center" variant="h6">
                {authWallet.connected
                    ? "Connected Wallets"
                    : "Connect your Wallet"}
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                {Object.entries(wallets).map(([wallet, color]) => (
                    <Tooltip key={wallet} title={`Connect using ${wallet}`}>
                        <Button
                            sx={{ textTransform: "capitalize" }}
                            color={color as TColor}
                            variant="outlined"
                            onClick={() =>
                                connectWallet(wallet.toLowerCase() as EWallet)
                            }
                        >
                            <Image
                                src={`/assets/wallets/${wallet.toLowerCase()}.png`}
                                width={20}
                                height={20}
                                alt={wallet}
                            />
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    ml: 1,
                                }}
                            >
                                {wallet}
                            </Typography>
                        </Button>
                    </Tooltip>
                ))}
            </Stack>
        </Box>
    </Modal>
);
