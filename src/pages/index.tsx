import { FC, FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Box, debounce } from "@mui/material";
import { HeroContent, CreatorTab } from "src/sections";
import { IPage } from "src/types";
import { useContract, useCreators } from "src/hooks";
import { contract, createIpns, pageContractAbi } from "src/utils";

const Page: FC<IPage> = ({ network }) => {
    const pageContract = contract(
        String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
        pageContractAbi,
        true
    );

    const pageRef = useRef<{ id: string; key: string }>();
    const [pageId, setPageId] = useState<string | undefined>();
    const creators = useCreators({ network });

    const { mutate, loading } = useContract({
        contract: pageContract,
        method: "claim",
        skip: true,
        onResult: () => {
            toast.success("PayWall has been claimed successfully!");
            alert(pageRef.current);
        },
        onError: (error) => {
            toast.error(
                `Sorry, ${
                    error.reason || "we could not claim this page"
                }, please try again`
            );
        },
    });
    const handleClaim = () => {
        if (pageId) {
            createIpns("")
                .then(({ ipns, accessKey, publicKey }) => {
                    pageRef.current = { key: accessKey, id: ipns };
                    mutate(pageId, ipns, publicKey);
                })
                .catch(() => toast.error("Sorry, could not claim page"));
        } else toast.error("Please, choose a unique name for your page first.");
    };
    const handlePageSearch: FormEventHandler = ({ target }) => {
        setPageId((target as HTMLInputElement)?.value);
    };

    return (
        <>
            <HeroContent
                isClaiming={loading}
                handleClaim={handleClaim}
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
