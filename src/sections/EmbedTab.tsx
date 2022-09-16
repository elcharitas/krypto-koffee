import { FC } from "react";
import NextLink from "next/link";
import { Typography } from "@mui/material";
import { Content } from "src/components";
import { ICreator } from "src/types";
import Image from "next/image";
import toast from "react-hot-toast";

interface IEmbedTab {
    creator: ICreator;
}
export const EmbedTab: FC<IEmbedTab> = ({ creator }) => {
    const embedCode = `
        <a href="https://krypto-koffee.vercel.app/${creator.name}" target="_blank" rel="noreferrer">
            <img src="https://krypto-koffee.vercel.app/assets/koffee-button.png" alt="" />
        </a>
    `;
    return (
        <Content sx={{ maxWidth: 440 }}>
            <Typography variant="body1" gutterBottom>
                Place the code snippet below in your blog post or add a link
                directly to your PayWall:
            </Typography>
            <NextLink href={`/${creator.name}`}>
                <Image
                    src="/assets/koffee-button.png"
                    width={160}
                    height={50}
                />
            </NextLink>
            <Typography
                variant="body1"
                sx={{
                    background: "#333",
                    border: "1px solid #fff",
                    borderRadius: "8px",
                    padding: "8px",
                    marginBottom: "8px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    navigator.clipboard.writeText(embedCode);
                    toast.success("Embed code has been copied to clipboard");
                }}
            >
                {embedCode}
            </Typography>
        </Content>
    );
};
