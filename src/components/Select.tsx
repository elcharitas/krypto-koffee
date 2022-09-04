import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select as MUISelect,
    SxProps,
} from "@mui/material";
import { FC } from "react";

export type TSelectOption = {
    label?: string;
    value: string;
};

export interface ISelect {
    label: string;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    options: TSelectOption[];
    sx: SxProps;
}
export const Select: FC<ISelect> = ({
    sx,
    label,
    color,
    options = [],
    ...props
}) => (
    <Box sx={sx}>
        <FormControl fullWidth>
            <InputLabel color={color}>{label}</InputLabel>
            <MUISelect label={label} color={color} {...props}>
                {[{ value: "" }, ...options].map(({ value, label }, index) => (
                    <MenuItem key={index} color={color} value={value}>
                        {label || value}
                    </MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    </Box>
);
