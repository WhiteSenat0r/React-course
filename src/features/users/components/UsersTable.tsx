import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import UserDetailsDialog from "./dialogs/UserDetailsDialog.tsx";
import UserEditDialog from "./dialogs/UserEditDialog.tsx";
import {IUser} from "../types/interfaces/iUser.ts";
import useUsersTableColumns from "../hooks/table-columns/UseUsersTableColumns.tsx";
import UserDeleteDialog from "./dialogs/UserDeleteDialog.tsx";
import UsersDataGrid from "./UsersDataGrid.tsx";

const rows: IUser[] = [
    { id: 1, first_name: 'Test1', last_name: 'SurTest1', email: 'test1@gmail.com' },
    { id: 2, first_name: 'Test2', last_name: 'SurTest2', email: 'test2@gmail.com' },
    { id: 3, first_name: 'Test3', last_name: 'SurTest3', email: 'test3@gmail.com' },
    { id: 4, first_name: 'Test4', last_name: 'SurTest4', email: 'test4@gmail.com' },
    { id: 5, first_name: 'Test5', last_name: 'SurTest5', email: 'test5@gmail.com' },
    { id: 6, first_name: 'Test6', last_name: 'SurTest6', email: 'test6@gmail.com' },
];

const UsersTable: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleRowClick = (params: GridRowModel) => {
        setSelectedUser(params.row as IUser);
        setIsDetailsDialogOpen(prevState => !prevState);
    };

    const handleEditClick = (event: React.MouseEvent, user: IUser) => {
        event.stopPropagation();
        setSelectedUser(user);
        setIsEditDialogOpen(prevState => !prevState);
    };

    const handleDeleteClick = (event: React.MouseEvent, user: User) => {
        event.stopPropagation();
        setSelectedUser(user);
        setIsDeleteDialogOpen(prevState => !prevState);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            setIsDeleteDialogOpen(prevState => !prevState);
            setSelectedUser(null);
        }
    };

    const columns = useUsersTableColumns(handleEditClick, handleDeleteClick);

    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <UsersDataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
            />
            {selectedUser && (
                <>
                    <UserDetailsDialog
                        user={selectedUser}
                        open={isDetailsDialogOpen}
                        onClose={() => setIsDetailsDialogOpen(false)}
                    />
                    <UserEditDialog
                        user={selectedUser}
                        open={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                    />
                    <UserDeleteDialog
                        user={selectedUser}
                        open={isDeleteDialogOpen}
                        onClose={() => setIsDeleteDialogOpen(false)}
                        onConfirm={handleConfirmDelete}
                    />
                </>
            )}
        </Box>
    );
};

export default UsersTable;