import { FC } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { TCallback } from "src/types";

interface IAccountsModal {
    isOpen: boolean;
    toggleAccounts: TCallback;
}
export const AccountsModal: FC<IAccountsModal> = ({
    isOpen,
    toggleAccounts,
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
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography
                id="accounts-modal-title"
                align="center"
                variant="h6"
                component="h2"
            >
                Connect Your Wallet
            </Typography>
        </Box>
    </Modal>
);
