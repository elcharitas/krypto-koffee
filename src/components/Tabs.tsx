import { useState, FC, SyntheticEvent, ReactNode } from "react";
import { Tabs as MUITabs, TabsTypeMap, Tab, Box } from "@mui/material";

type TTabs = TabsTypeMap["props"];
interface ITabs extends TTabs {
    color?: "secondary" | "primary";
    current?: number;
    tabs: {
        label: ReactNode;
        content: ReactNode;
    }[];
}
export const Tabs: FC<ITabs> = ({ tabs, current, color, ...props }) => {
    const [value, setValue] = useState(current || 0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                maxWidth: { xs: 320, sm: 800 },
                bgcolor: "background.paper",
            }}
        >
            <MUITabs
                value={value < tabs.length ? value : 0}
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
            <Box sx={{ my: 1 }}>
                {tabs[value < tabs.length ? value : 0]?.content}
            </Box>
        </Box>
    );
};
