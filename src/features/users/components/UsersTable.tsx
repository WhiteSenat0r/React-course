import React from "react";

import { Box, Typography } from "@mui/material";

import {useFetchUsers} from "../hooks/useFetchUsers.ts";

import UsersTableContainer from "./UsersTableContainer.tsx";

const UsersTable: React.FC = () => {
    const users  = useFetchUsers();

    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <UsersTableContainer users={users} />
        </Box>
    );
};

export default UsersTable;