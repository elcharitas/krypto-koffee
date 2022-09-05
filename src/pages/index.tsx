import { FC } from "react";
import { Carousel } from "src/components";
import { HeroContent } from "src/sections";

const Page: FC = () => (
    <>
        <Carousel>
            <HeroContent />
        </Carousel>
    </>
);

Page.displayName = "Home";

export default Page;
