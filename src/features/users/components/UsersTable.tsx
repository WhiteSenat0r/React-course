import React from "react";

import { Box, Typography } from "@mui/material";

import {useFetchUsers} from "../hooks/useFetchUsers.ts";

import UsersTableContainer from "./UsersTableContainer.tsx";
import Button from "@mui/material/Button";
import {useCreateDialog} from "../hooks/dialogs/useCreateDialog.ts";
import UserCreateDialog from "./dialogs/UserCreateDialog.tsx";

const UsersTable: React.FC = () => {
    const users  = useFetchUsers();
    const createDialog = useCreateDialog(users.users, users.setUsers);

    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <UserCreateDialog
                users={users.users}
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={createDialog.handleConfirmCreate}
            />
            <Button variant='contained' sx={{ml:0.5, my:2}} onClick={createDialog.openDialog}>Create</Button>
            <UsersTableContainer users={users.users} setUsers={users.setUsers} />
        </Box>
    );
};

export default UsersTable;