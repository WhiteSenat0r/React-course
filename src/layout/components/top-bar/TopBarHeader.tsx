import React from "react";

import Typography from "@mui/material/Typography";

export const TopBarHeader = () => {
    return (
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
        >
            React course
        </Typography>
    );
};