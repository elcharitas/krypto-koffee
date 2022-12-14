import { FC, useState } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Content, CreatorCard } from "src/components";
import { IPage } from "src/types";
import { useCreators } from "src/hooks";

type TExploreCreators = IPage;
const Page: FC<TExploreCreators> = ({ network }) => {
    const creators = useCreators({ network });
    const [search, setSearch] = useState<string>("");

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
                        {creators.length}+
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
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                </Stack>
            </Content>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 3,
                    justifyContent: "space-around",
                }}
            >
                {creators
                    .filter((creator) => {
                        const query = new RegExp(search, "i");
                        return !search || query.test(creator.name || "");
                    })
                    .map((creator) => (
                        <CreatorCard key={creator.address} creator={creator} />
                    ))}
            </Grid>
        </>
    );
};

Page.displayName = "Explore Creators";

export default Page;
