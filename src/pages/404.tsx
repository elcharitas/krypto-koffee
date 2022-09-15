import { FC } from "react";
import NextLink from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import { IPage } from "src/types";

type TError = IPage;
const Page: FC<TError> = () => {
    return (
        <Stack
            sx={{ minHeight: "90vh" }}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                fontFamily="Poppins"
                gutterBottom
            >
                404 - No PayWall!
            </Typography>
            <Typography sx={{ my: 1 }}>
                This paywall could still be available
            </Typography>
            <NextLink href="/" passHref>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white" }}
                >
                    Claim PayWall
                </Button>
            </NextLink>
        </Stack>
    );
};

Page.displayName = "Not Found!";

export default Page;
