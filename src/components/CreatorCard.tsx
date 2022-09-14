import { FC } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { TCreator } from "src/types";
import { Content } from "./Content";
import { formatAddress } from "src/utils";

interface ICreatorCard {
    creator: TCreator;
}
export const CreatorCard: FC<ICreatorCard> = ({ creator }) => {
    return (
        <Content sx={{ maxWidth: 170 }}>
            {creator.photoURL && (
                <Image src={creator.photoURL} width="150px" height="150px" />
            )}
            <Typography variant="body1" gutterBottom={!!creator.bio}>
                {creator.name ? (
                    <>
                        <strong>{creator.name}</strong> (
                        {formatAddress(creator.address)})
                    </>
                ) : (
                    formatAddress(creator.address)
                )}
            </Typography>
            {creator.bio && (
                <Typography variant="body2">{creator.bio}</Typography>
            )}
        </Content>
    );
};
