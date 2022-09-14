import { FC } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Content, CreatorCard } from "src/components";
import { IPage, ECreatorCategory } from "src/types";
import { denum } from "src/utils";

const categories = denum(ECreatorCategory);

type TExploreCreators = IPage;
const Page: FC<TExploreCreators> = () => {
    return (
        <>
            <Content
                sx={{
                    display: "flex",
                    minHeight: "300px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#060606",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                        mb: 3,
                    }}
                >
                    Explore{" "}
                    <Typography
                        component="span"
                        color="secondary"
                        sx={{ font: "inherit" }}
                    >
                        500,000+
                    </Typography>{" "}
                    creators!
                </Typography>
                <Stack alignItems="center">
                    <TextField
                        color="secondary"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            sx: {
                                borderRadius: "5em",
                                minWidth: "280px",
                            },
                            startAdornment: (
                                <Search fontSize="small" sx={{ mr: 1 }} />
                            ),
                        }}
                        placeholder="Search by name, address, or category"
                    />
                </Stack>
            </Content>
            <Grid
                container
                spacing={3}
                sx={{
                    mt: 3,
                    justifyContent: "center",
                }}
            >
                <CreatorCard creator={{ address: "0x0" }} />
            </Grid>
        </>
    );
};

Page.displayName = "Explore Creators";

export default Page;
