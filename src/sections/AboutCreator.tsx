import { FC } from "react";
import { Typography } from "@mui/material";
import { Content } from "src/components";
import { ICreator } from "src/types";
import { Facebook, Twitter, GitHub, Link } from "@mui/icons-material";

const icons = {
    facebook: Facebook,
    twitter: Twitter,
    github: GitHub,
    link: Link,
};

interface IAboutCreator {
    creator: ICreator;
}
export const AboutCreator: FC<IAboutCreator> = ({ creator }) => {
    return (
        <Content title="About Me" sx={{ maxWidth: 340 }}>
            <Typography variant="body1" paragraph gutterBottom>
                {creator.description}
            </Typography>
            {creator.links?.map((link) => {
                const uri = new URL(link);
                const icon = uri.hostname
                    .replace(/www\./, "")
                    .split(".")[0] as keyof typeof icons;
                const Social = icons[icon] || icons.link;
                return (
                    <Social
                        key={link}
                        onClick={() => window.open(link, "_blank")}
                    />
                );
            })}
        </Content>
    );
};
