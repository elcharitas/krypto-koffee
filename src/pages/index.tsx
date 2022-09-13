import { FC } from "react";
import { GetServerSideProps } from "next";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { HeroContent } from "src/sections";
import { ECreatorCategory } from "src/types";
import { denum } from "src/utils";

const categories = denum(ECreatorCategory);

export const getServerSideProps: GetServerSideProps = async () => {
    const creators = [
        {
            address: "0x123",
            category: ECreatorCategory.Art,
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

interface IHome {
    creators: {
        address: string;
        category: ECreatorCategory;
    }[];
}
const Page: FC<IHome> = ({ creators }) => {
    return (
        <>
            <HeroContent />
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
        </>
    );
};

Page.displayName = "Home";

export default Page;
