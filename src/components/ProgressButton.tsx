import { FC, ReactNode } from "react";
import {
    Button,
    ButtonTypeMap,
    CircularProgress,
    CircularProgressProps,
} from "@mui/material";
import { TCallback } from "src/types";

type TMUIButton = ButtonTypeMap["props"];
interface IProgressButton extends TMUIButton {
    onClick?: TCallback;
    progressProps?: CircularProgressProps;
    isSubmitting?: boolean;
    children: ReactNode;
}
export const ProgressButton: FC<IProgressButton> = ({
    children,
    isSubmitting,
    progressProps,
    onClick,
    ...props
}) => {
    return (
        <Button onClick={onClick} {...props}>
            {isSubmitting ? (
                <CircularProgress
                    size="1.5em"
                    sx={{ marginRight: "0.5em", color: "white" }}
                    {...progressProps}
                />
            ) : null}
            {children}
        </Button>
    );
};
