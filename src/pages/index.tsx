import { FC, FormEventHandler, useState } from "react";
import { GetServerSideProps } from "next";
import { Box, debounce } from "@mui/material";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { HeroContent } from "src/sections";
import { ECreatorCategory, IPage } from "src/types";
import { contract, denum, pageContractAbi } from "src/utils";
import { useContract } from "src/hooks/useContract";

const categories = denum(ECreatorCategory);

export const getServerSideProps: GetServerSideProps = async () => {
    const creators = [
        {
            address: "0x123",
            category: ECreatorCategory.Educator,
        },
        {
            address: "0x456",
            category: ECreatorCategory.Developer,
        },
    ];
    return {
        props: {
            creators,
        },
    };
};

interface IHome extends IPage {
    creators: {
        address: string;
        category: ECreatorCategory;
    }[];
}
const Page: FC<IHome> = ({ creators }) => {
    const pageContract = contract("", pageContractAbi, true);
    const [pageId, setPageId] = useState<string | undefined>();
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

    return (
        <>
            <HeroContent
                isClaiming={isValidating}
                handleClaim={handleClaim}
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
                                    .filter((c) => c.category === category)
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
