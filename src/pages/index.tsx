import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content, Globe } from "src/components";

const Page: FC = () => (
    <>
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
                        variant="h1"
                        sx={{
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
                <Globe width={580} height={580} />
            </Stack>
        </Content>
    </>
);

Page.displayName = "Home";

export default Page;
