import { FC } from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { TCallback } from "src/types";

interface IHelpModal {
    isOpen: boolean;
    toggleHelp: TCallback;
}
export const HelpModal: FC<IHelpModal> = ({ isOpen, toggleHelp }) => (
    <Modal
        open={isOpen}
        onClose={toggleHelp}
        aria-labelledby="accounts-modal-title"
        aria-describedby="accounts-modal-description"
    >
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 320,
                bgcolor: "background.paper",
                border: "2px solid #000",
                borderRadius: "8px",
                boxShadow: 24,
                p: 2,
            }}
        >
            <Typography id="accounts-modal-title" align="center" variant="h6">
                Help
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                Help
            </Stack>
        </Box>
    </Modal>
);
