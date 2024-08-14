import React from "react";

import { Box, Typography } from "@mui/material";

import UsersTableContainer from "./UsersTableContainer.tsx";

const UsersPage: React.FC = () => {
    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <UsersTableContainer />
        </Box>
    );
};

export default UsersPage;