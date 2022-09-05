import { FC, ReactNode } from "react";
import NukaCarousel from "nuka-carousel";

interface ICarousel {
    children: ReactNode;
}
export const Carousel: FC<ICarousel> = ({ children }) => (
    <NukaCarousel>{children}</NukaCarousel>
);
