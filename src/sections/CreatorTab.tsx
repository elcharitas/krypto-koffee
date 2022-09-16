import { FC } from "react";
import { Tabs, Carousel, CreatorCard } from "src/components";
import { ECreatorCategory, ICreator } from "src/types";
import { denum } from "src/utils";

const categories = denum(ECreatorCategory);

interface ICreatorTab {
    creators: ICreator[];
}
export const CreatorTab: FC<ICreatorTab> = ({ creators }) => (
    <Tabs
        color="secondary"
        current={ECreatorCategory.Influencer}
        tabs={categories.map(([label, category]) => ({
            label,
            content: (
                <Carousel slidesToShow={4}>
                    {creators
                        .filter((c) => Number(c.category) === Number(category))
                        .map((creator) => (
                            <CreatorCard
                                key={creator.address}
                                creator={creator}
                            />
                        ))}
                </Carousel>
            ),
        }))}
    />
);
