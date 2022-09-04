import { Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export const Credits = () => (
    <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                    Ingeniously Crafted with &nbsp;
                    <Box sx={{ display: "inline" }} color="error">
                        ❤️
                    </Box>
                    &nbsp; by &nbsp;
                    <Link
                        sx={{ color: "orange" }}
                        href="https://github.com/elcharitas"
                    >
                        elcharitas
                    </Link>
                </Typography>
            </Box>
        </Box>
    </>
);
