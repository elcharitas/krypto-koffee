import { FC } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Content, Globe } from "src/components";

export const HeroContent: FC = () => (
    <Content sx={{ background: "transparent", py: 8 }}>
        <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", md: "space-between" }}
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ textAlign: "center" }}
            >
                <Typography textTransform="uppercase">
                    Welcome to PayMeMatic
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: "3.5em", md: "5em" },
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                    }}
                >
                    Membership{" "}
                    <span style={{ color: "#ce93d8", font: "inherit" }}>
                        Subscription
                    </span>
                </Typography>
                <Typography sx={{ px: { xs: 2, md: 8 } }}>
                    PayMeMatic is a growing means of personalized donations and
                    member subscriptions built for a decentralized and
                    transparent world
                </Typography>

                <TextField
                    color="secondary"
                    variant="outlined"
                    placeholder="yourname"
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                        autoFocus: true,
                        sx: {
                            pl: 3,
                            borderRadius: "4em",
                            maxWidth: "400px",
                        },
                        startAdornment: (
                            <Typography fontWeight="bold">
                                paymematic.app/
                            </Typography>
                        ),
                        endAdornment: (
                            <Button
                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "5em",
                                    minWidth: "120px",
                                    color: "white",
                                }}
                                color="secondary"
                                variant="contained"
                            >
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "right",
                                    }}
                                >
                                    Claim PayPage
                                </Typography>
                            </Button>
                        ),
                    }}
                    sx={{ m: 1, alignItems: "center" }}
                />
                <Typography>
                    It&apos;s free to setup. All data is stored on blockchain
                </Typography>
            </Stack>
            <Box sx={{ display: { xs: "none", md: "flex" }, p: 8 }}>
                <Globe width={560} height={560} />
            </Box>
        </Stack>
    </Content>
);
