import { Container, Divider, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";

export const Credits = () => (
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
                        sx={{ color: "#ce93d8" }}
                        href="https://github.com/elcharitas"
                    >
                        Jonathan Irhodia
                    </Link>
                </Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Link sx={{ color: "#ce93d8" }}>How it Works?</Link>
                    <Link sx={{ color: "#ce93d8" }} href="/elcharitas">
                        Pay &#64;elcharitas
                    </Link>
                </Stack>
            </Stack>
        </Container>
    </>
);
