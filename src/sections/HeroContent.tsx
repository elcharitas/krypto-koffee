import { FC, FormEventHandler } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { Content, Globe, ProgressButton, Select } from "src/components";
import { ECreatorCategory, TCallback } from "src/types";
import { denum } from "src/utils";

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
                    Krypto Koffee is a growing means of personalized donations
                    and member subscriptions built for a decentralized and
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
                            pl: { xs: 1, md: 3 },
                            borderRadius: "4em",
                            maxWidth: "400px",
                        },
                        startAdornment: (
                            <Typography
                                fontWeight="bold"
                                sx={{ width: "inherit" }}
                            >
                                krypto-koffee.app/
                            </Typography>
                        ),
                        endAdornment: (
                            <ProgressButton
                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "5em",
                                    minWidth: "65px",
                                    color: "white",
                                    display: { xs: "none", md: "flex" },
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
                                    Claim
                                </Typography>
                            </ProgressButton>
                        ),
                    }}
                    sx={{ m: 1, alignItems: "center" }}
                />
                <Select
                    value={ECreatorCategory.Other}
                    options={denum(ECreatorCategory).map(([label, value]) => ({
                        label,
                        value,
                    }))}
                    placeholder="Select a creator category"
                    sx={{
                        width: "100%",
                        minWidth: "300px",
                        borderRadius: "4em",
                        height: "40px",
                    }}
                />

                <ProgressButton
                    sx={{
                        display: { xs: "flex", md: "none" },
                        textTransform: "capitalize",
                        borderRadius: "5em",
                        minWidth: "80%",
                        color: "white",
                        py: 1.4,
                        mb: 2,
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
                        Claim Wall
                    </Typography>
                </ProgressButton>
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
