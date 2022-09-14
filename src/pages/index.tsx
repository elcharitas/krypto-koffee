import { FC, FormEventHandler, useEffect, useState } from "react";
import { Box, debounce } from "@mui/material";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { HeroContent } from "src/sections";
import {
    ECreatorCategory,
    IPage,
    TEventResponse,
    TPageClaimedEvent,
} from "src/types";
import { contract, denum, getContractEvents, pageContractAbi } from "src/utils";
import { useContract } from "src/hooks/useContract";

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
            address: string;
            category: ECreatorCategory;
        }[]
    >([]);

    const { send, isValidating } = useContract({
        contract: pageContract,
        method: "claim",
        skip: true,
    });
    const handleClaim = () => {
        if (pageId) send([pageId]);
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
                    data.result.map(({ data: { creator, category } }) => ({
                        address: creator,
                        category,
                    }))
                );
            })
            .catch(() => {});
    }, [network]);

    return (
        <>
            <HeroContent
                isClaiming={isValidating}
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
