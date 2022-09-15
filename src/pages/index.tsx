import { FC, FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, debounce } from "@mui/material";
import { HeroContent, CreatorTab } from "src/sections";
import {
    ECreatorCategory,
    IPage,
    TEventResponse,
    TPageClaimedEvent,
} from "src/types";
import { useContract } from "src/hooks/useContract";
import {
    contract,
    createIpns,
    getContractEvents,
    pageContractAbi,
} from "src/utils";

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
            ipns: string;
        }[]
    >([]);

    const { mutate, loading } = useContract({
        contract: pageContract,
        method: "claim",
        skip: true,
    });
    const handleClaim = () => {
        if (pageId)
            createIpns("")
                .then(({ ipns, publicKey }) => mutate(pageId, ipns, publicKey))
                .catch((e) => toast.error("Sorry, could not claim page"));
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
                    data.result.map(({ data: { creator, ipns, pageId } }) => ({
                        name: pageId,
                        address: creator,
                        ipns,
                    }))
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
                <CreatorTab creators={creators} />
            </Box>
        </>
    );
};

Page.displayName = "Home";

export default Page;
