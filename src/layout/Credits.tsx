import { useState } from "react";
import {
    Box,
    Container,
    Divider,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { HelpModal } from "src/sections";

export const Credits = () => {
    const [openHelp, setOpenHelp] = useState(false);
    return (
        <>
            <Divider />
            <Container>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2.5}
                    justifyContent="space-between"
                    sx={{ py: 3, textAlign: "center" }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "center", md: "start" },
                        }}
                    >
                        &copy; {new Date().getFullYear()}. Proudly Made in
                        <Box
                            sx={{ width: "1em", mx: 1 }}
                            component="svg"
                            viewBox="0 0 48 48"
                        >
                            <g>
                                <rect
                                    x="16"
                                    y="6"
                                    fill="#E6E6E6"
                                    width="16"
                                    height="36"
                                ></rect>{" "}
                                <path
                                    fill="#078754"
                                    d="M48,40c0,1.105-0.895,2-2,2H32V6h14c1.105,0,2,0.895,2,2V40z"
                                ></path>
                                <path
                                    fill="#078754"
                                    d="M16,42H2c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h14V42z"
                                ></path>
                            </g>
                        </Box>
                        By &nbsp;
                        <Link
                            sx={{ color: "#ED7D3A" }}
                            href="https://github.com/elcharitas"
                        >
                            Jonathan Irhodia
                        </Link>
                    </Typography>
                    <Stack direction="row" spacing={3} justifyContent="center">
                        <Link
                            sx={{ color: "#ED7D3A" }}
                            onClick={() => setOpenHelp(true)}
                        >
                            How it Works?
                        </Link>
                        <Link sx={{ color: "#ED7D3A" }} href="/elcharitas">
                            Support &#64;elcharitas
                        </Link>
                    </Stack>
                </Stack>
            </Container>
            <HelpModal
                isOpen={openHelp}
                toggleHelp={() => setOpenHelp(false)}
            />
        </>
    );
};
