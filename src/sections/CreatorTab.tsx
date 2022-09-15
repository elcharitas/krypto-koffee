import { FC, useState, useEffect } from "react";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { ECreatorCategory, ICreator } from "src/types";
import { denum, fetchJSON, resolveIpns } from "src/utils";

const categories = denum(ECreatorCategory);

interface ICreatorContent {
    category: ECreatorCategory;
    creators: ICreator[];
}
const CreatorContent: FC<ICreatorContent> = ({ category, creators }) => (
    <Carousel>
        {creators
            .filter((c) => Number(c.category) === category)
            .map((creator) => (
                <CreatorCard key={creator.address} creator={creator} />
            ))}
    </Carousel>
);

interface ICreatorTab {
    creators: {
        name: string;
        address: string;
        ipns: string;
    }[];
}
export const CreatorTab: FC<ICreatorTab> = ({ creators }) => {
    const [parsedCreators, setParsedCreators] = useState<ICreator[]>([]);

    useEffect(() => {
        Promise.all(
            creators.map(({ address, name, ipns }) =>
                resolveIpns(ipns)
                    .then((data) => fetchJSON<ICreator>(data.value))
                    .then((data) => ({
                        category: ECreatorCategory.Other,
                        photoURL: "/assets/avatar.jpeg",
                        ...data,
                        address,
                        name,
                    }))
            )
        ).then(setParsedCreators);
    }, [creators]);
    return (
        <Tabs
            color="secondary"
            current={ECreatorCategory.Developer}
            tabs={categories.map(([label, category]) => ({
                label,
                content: (
                    <CreatorContent
                        category={Number(category)}
                        creators={parsedCreators}
                    />
                ),
            }))}
        />
    );
};
