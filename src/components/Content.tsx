import { FC, ReactNode } from "react";
import {
    Box,
    Card,
    CardTypeMap,
    CardContent,
    CardHeader,
    Divider,
} from "@mui/material";

interface IContent {
    title?: string;
    children: ReactNode;
}
export const Content: FC<IContent & CardTypeMap["props"]> = ({
    children,
    title,
    ...props
}) => (
    <Card {...props}>
        {title && (
            <>
                <CardHeader title={title} sx={{ fontSize: "small" }} />
                <Divider />
            </>
        )}
        <CardContent>
            <Box
                sx={{
                    minHeight: 300,
                    position: "relative",
                }}
            >
                {children}
            </Box>
        </CardContent>
    </Card>
);
