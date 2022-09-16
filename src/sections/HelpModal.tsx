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
                bgcolor: "background.paper",
                border: "2px solid #000",
                borderRadius: "8px",
                boxShadow: 24,
                p: 2,
            }}
        >
            <Box
                component="iframe"
                src="https://www.youtube.com/embed/L4DUksdmA3Y"
                allow="autoplay; encrypted-media"
                allowFullScreen
                sx={{ width: { xs: "320px", md: "800px" }, height: "400px" }}
            />
        </Box>
    </Modal>
);
