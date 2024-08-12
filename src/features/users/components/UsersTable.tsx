import React from "react";
import { Box, Typography } from "@mui/material";
import useUsersTableColumns from "../hooks/table-columns/UseUsersTableColumns.tsx";
import UsersDataGrid from "./UsersDataGrid.tsx";
import {useFetchUsers} from "../hooks/useFetchUsers.ts";
import UserDialogs from "./dialogs/UserDialogs.tsx";
import {useUserDialogs} from "../hooks/useUserDialogs.ts";

const UsersTable: React.FC = () => {
    const { users, isLoading } = useFetchUsers();

    const {
        selectedUser,
        isDetailsDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        openDetailsDialog,
        openEditDialog,
        openDeleteDialog,
        handleConfirmDelete,
        closeAllDialogs
    } = useUserDialogs();

    const columns = useUsersTableColumns(openEditDialog, openDeleteDialog);

    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <UsersDataGrid
                rows={users}
                columns={columns}
                onRowClick={openDetailsDialog}
            />
            {!isLoading && (
                <UserDialogs
                    user={selectedUser}
                    isDetailsDialogOpen={isDetailsDialogOpen}
                    isEditDialogOpen={isEditDialogOpen}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    onClose={closeAllDialogs}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
        </Box>
    );
};

export default UsersTable;