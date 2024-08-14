import React from "react";
import useUsersTableColumns from "../hooks/useUsersTableColumns.tsx";
import UsersDataGrid from "./UsersDataGrid.tsx";
import UserDetailsDialog from "./dialogs/UserDetailsDialog.tsx";
import UserEditDialog from "./dialogs/UserEditDialog.tsx";
import UserDeleteDialog from "./dialogs/UserDeleteDialog.tsx";
import UserCreateDialog from "./dialogs/UserCreateDialog.tsx";
import Button from "@mui/material/Button";
import {useUsersState} from "../hooks/useUsersState.ts";
import {useUsersTableRows} from "../hooks/useUsersTableRows.ts";
import {useDialog} from "../hooks/useDialog.ts";
import {useNotifications} from "@toolpad/core";

const pageSizeOptions: number[] = [5, 10, 25];

const UsersTableContainer: React.FC = () => {
    const notifications = useNotifications();
    const users = useUsersState(notifications);
    const { rows } = useUsersTableRows(users.users);

    const createDialog = useDialog();
    const detailsDialog = useDialog();
    const editDialog = useDialog();
    const deleteDialog = useDialog();

    const columns = useUsersTableColumns(editDialog.openDialogByClick, deleteDialog.openDialogByClick);

    return (
        <>
            <UserCreateDialog
                users={users.users}
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={users.setNewUser}
                notifications={notifications}
            />
            <Button variant='contained' sx={{ml:0.5, my:2}} onClick={createDialog.openDialog}>Create</Button>
            <UsersDataGrid
                loading={users.isLoading}
                rows={rows}
                columns={columns}
                pageSizeOptions={pageSizeOptions}
                onRowClick={detailsDialog.openDialog}
            />
            {
                detailsDialog.isOpen && detailsDialog.selectedUserRow && (
                    <UserDetailsDialog
                        userRow={detailsDialog.selectedUserRow}
                        open={detailsDialog.isOpen}
                        onClose={detailsDialog.closeDialog}
                    />
                )
            }
            {
                editDialog.isOpen && editDialog.selectedUserRow && (
                    <UserEditDialog
                        userRow={editDialog.selectedUserRow}
                        open={editDialog.isOpen}
                        onClose={editDialog.closeDialog}
                        onConfirm={users.setEditedUser}
                        notifications={notifications}
                    />
                )
            }
            {
                deleteDialog.isOpen && deleteDialog.selectedUserRow && (
                    <UserDeleteDialog
                        userId={deleteDialog.selectedUserRow?.id}
                        open={deleteDialog.isOpen}
                        onClose={deleteDialog.closeDialog}
                        onConfirm={users.deleteUserFromState}
                        notifications={notifications}
                    />
                )
            }
        </>
    );
};

export default UsersTableContainer;