import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content, Globe } from "src/components";

export const HeroContent: FC = () => (
    <Content sx={{ background: "transparent", py: 8 }}>
        <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", md: "space-between" }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    "&:hover": {
                        transform: "scale(1.2)",
                        cursor: "pointer",
                    },
                }}
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
                    Personalized{" "}
                    <span style={{ color: "#ce93d8", font: "inherit" }}>
                        Donations!
                    </span>
                </Typography>
                <Typography sx={{ px: 4 }}>
                    PayMeMatic is a growing means of personalized donations
                    built for a decentralized and transparent world
                </Typography>

                <Button
                    sx={{ textTransform: "capitalize", my: 2 }}
                    color="secondary"
                    variant="outlined"
                >
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Get Started
                    </Typography>
                </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, p: 8 }}>
                <Globe width={560} height={560} />
            </Box>
        </Stack>
    </Content>
);
