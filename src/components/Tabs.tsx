import { useState, FC, SyntheticEvent, ReactNode } from "react";
import { Tabs as MUITabs, TabsTypeMap, Tab, Box } from "@mui/material";
import { TColor } from "src/types";

type TTabs = TabsTypeMap["props"];
interface ITabs extends TTabs {
    color?: "secondary" | "primary";
    tabs: {
        label: ReactNode;
        content: ReactNode;
    }[];
}
export const Tabs: FC<ITabs> = ({ tabs, color, ...props }) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
        >
            <MUITabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                textColor={color}
                indicatorColor={color}
                {...props}
            >
                {tabs.map(({ label }, index) => (
                    <Tab key={String(index)} label={label} />
                ))}
            </MUITabs>
            <Box sx={{ mt: 1 }}>{tabs[value]?.content}</Box>
        </Box>
    );
};
