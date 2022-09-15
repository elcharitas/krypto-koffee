import { FC, ReactNode } from "react";
import NukaCarousel from "nuka-carousel";

interface ICarousel {
    slidesToShow?: number;
    slidesToScroll?: number;
    slideIndex?: number;
    speed?: number;
    children: ReactNode;
}
export const Carousel: FC<ICarousel> = ({ children, ...props }) => (
    <NukaCarousel {...props}>{children}</NukaCarousel>
);
