import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select as MUISelect,
    SxProps,
} from "@mui/material";
import { FC } from "react";
import { TCallback, TColor } from "src/types";

export type TSelectOption = {
    label?: string;
    value?: string | number;
};

export interface ISelect extends TSelectOption {
    placeholder?: string;
    color?: TColor;
    options: TSelectOption[];
    onChange?: TCallback<void, string | number>;
    sx?: SxProps;
}
export const Select: FC<ISelect> = ({
    sx,
    label,
    value,
    placeholder,
    color,
    options = [],
    onChange,
}) => (
    <Box>
        <FormControl fullWidth>
            {label && <InputLabel color={color}>{label}</InputLabel>}
            <MUISelect
                label={label}
                color={color}
                sx={sx}
                value={value || " "}
                onChange={(e) => {
                    if (onChange) onChange(e.target.value);
                }}
            >
                {[{ value: " ", label: placeholder }, ...options].map(
                    ({ value, label }, index) => (
                        <MenuItem key={index} color={color} value={value}>
                            {label || value}
                        </MenuItem>
                    )
                )}
            </MUISelect>
        </FormControl>
    </Box>
);
