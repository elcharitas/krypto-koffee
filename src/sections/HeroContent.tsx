import { FC, FormEventHandler } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { Content, Globe, ProgressButton } from "src/components";
import { TCallback } from "src/types";

interface IHeroContent {
    handleClaim: TCallback;
    handlePageSearch: FormEventHandler;
    isClaiming: boolean;
}
export const HeroContent: FC<IHeroContent> = ({
    handleClaim,
    handlePageSearch,
    isClaiming,
}) => (
    <Content sx={{ background: "transparent" }}>
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
                    Monetize
                    <span
                        style={{
                            display: "block",
                            color: "#ED7D3A",
                            font: "inherit",
                            fontSize: "0.7em",
                            marginTop: -10,
                        }}
                    >
                        Your Audience!
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
                    onChange={handlePageSearch}
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
                            <ProgressButton
                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "5em",
                                    minWidth: "140px",
                                    color: "white",
                                }}
                                color="secondary"
                                variant="contained"
                                onClick={handleClaim}
                                isSubmitting={isClaiming}
                            >
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "right",
                                    }}
                                >
                                    Claim PayPage
                                </Typography>
                            </ProgressButton>
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
