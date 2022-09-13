import { FC, ReactNode } from "react";
import {
    Button,
    ButtonTypeMap,
    CircularProgress,
    CircularProgressProps,
} from "@mui/material";

type TMUIButton = ButtonTypeMap["props"];
interface IProgressButton extends TMUIButton {
    progressProps?: CircularProgressProps;
    isSubmitting?: boolean;
    children: ReactNode;
}
export const ProgressButton: FC<IProgressButton> = ({
    children,
    isSubmitting,
    progressProps,
    ...props
}) => {
    return (
        <Button {...props}>
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
