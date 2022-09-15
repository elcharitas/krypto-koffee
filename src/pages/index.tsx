import { FC, FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, debounce } from "@mui/material";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { HeroContent } from "src/sections";
import {
    ECreatorCategory,
    IPage,
    TEventResponse,
    TPageClaimedEvent,
} from "src/types";
import { useContract } from "src/hooks/useContract";
import { contract, denum, getContractEvents, pageContractAbi } from "src/utils";

const categories = denum(ECreatorCategory);

const Page: FC<IPage> = ({ network }) => {
    const pageContract = contract(
        String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
        pageContractAbi,
        true
    );

    const [pageId, setPageId] = useState<string | undefined>();
    const [category, setCategory] = useState<ECreatorCategory>();
    const [creators, setCreators] = useState<
        {
            name: string;
            address: string;
            category: ECreatorCategory;
        }[]
    >([]);

    const { mutate, loading } = useContract({
        contract: pageContract,
        method: "claim",
        skip: true,
    });
    const handleClaim = () => {
        if (pageId) mutate(pageId, category || ECreatorCategory.Other);
        else toast.error("Please, choose a unique name for your page first.");
    };
    const handlePageSearch: FormEventHandler = ({ target }) => {
        setPageId((target as HTMLInputElement)?.value);
    };

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
                setCreators(
                    data.result.map(
                        ({ data: { creator, category, pageId } }) => ({
                            name: pageId,
                            address: creator,
                            category,
                        })
                    )
                );
            })
            .catch(() => {});
    }, [network, loading]);

    return (
        <>
            <HeroContent
                isClaiming={loading}
                handleClaim={handleClaim}
                category={category}
                handleCategory={debounce((category) => {
                    setCategory(category as ECreatorCategory);
                }, 500)}
                handlePageSearch={debounce(handlePageSearch, 500)}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tabs
                    color="secondary"
                    tabs={categories.map(([label, category]) => ({
                        label,
                        content: (
                            <Carousel>
                                {creators
                                    .filter(
                                        (c) =>
                                            Number(c.category) ===
                                            Number(category)
                                    )
                                    .map((creator) => (
                                        <CreatorCard
                                            key={creator.address}
                                            creator={{
                                                ...creator,
                                                photoURL: "/assets/avatar.jpeg",
                                            }}
                                        />
                                    ))}
                            </Carousel>
                        ),
                    }))}
                />
            </Box>
        </>
    );
};

Page.displayName = "Home";

export default Page;
