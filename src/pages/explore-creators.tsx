import { FC, useEffect, useState } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Content, CreatorCard } from "src/components";
import {
    IPage,
    ECreatorCategory,
    TEventResponse,
    TPageClaimedEvent,
    ICreator,
} from "src/types";
import {
    denum,
    fetchJSON,
    getContractEvents,
    pageContractAbi,
    resolveIpns,
} from "src/utils";

type TExploreCreators = IPage;
const Page: FC<TExploreCreators> = ({ network }) => {
    const [creators, setCreators] = useState<
        {
            name: string;
            address: string;
            ipns: string;
        }[]
    >([]);

    useEffect(() => {
        getContractEvents({
            chain: network,
            address: String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
            abi: pageContractAbi.find(({ name }) => name === "PageClaimed"),
            topic: String(process.env.NEXT_PUBLIC_MANAGER_EVENT),
        })
            .then(
                (events) =>
                    (events as unknown) as TEventResponse<TPageClaimedEvent>
            )
            .then(({ data }) => {
                Promise.all(
                    data.result.map(({ data: { creator, ipns, pageId } }) =>
                        resolveIpns(ipns)
                            .then((data) => fetchJSON<ICreator>(data.value))
                            .then((data) => ({
                                category: ECreatorCategory.Other,
                                photoURL: "/assets/avatar.jpeg",
                                ...data,
                                ipns,
                                address: creator,
                                name: pageId,
                            }))
                    )
                ).then(setCreators);
            })
            .catch(() => {});
    }, [network]);

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
                spacing={1}
                sx={{
                    mt: 3,
                    justifyContent: "space-around",
                }}
            >
                {creators.map((creator) => (
                    <CreatorCard key={creator.address} creator={creator} />
                ))}
            </Grid>
        </>
    );
};

Page.displayName = "Explore Creators";

export default Page;
