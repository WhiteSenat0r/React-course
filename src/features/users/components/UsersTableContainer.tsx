import React from "react";
import useUsersTableColumns from "../hooks/table-columns/UseUsersTableColumns.tsx";
import UsersDataGrid from "./UsersDataGrid.tsx";
import {IUser} from "../types/interfaces/iUser.ts";
import {useDetailsDialog} from "../hooks/dialogs/useDetailsDialog.ts";
import {useEditDialog} from "../hooks/dialogs/useEditDialog.ts";
import {useDeleteDialog} from "../hooks/dialogs/useDeleteDialog.ts";
import UserDetailsDialog from "./dialogs/UserDetailsDialog.tsx";
import UserEditDialog from "./dialogs/UserEditDialog.tsx";
import UserDeleteDialog from "./dialogs/UserDeleteDialog.tsx";

interface UsersTableContentProps {
    users: IUser[]
    setUsers: (users: IUser[]) => void
}

const pageSizeOptions: number[] = [5, 10, 25];

const UsersTableContainer: React.FC<UsersTableContentProps> = ({users, setUsers}) => {
    const detailsDialog = useDetailsDialog();
    const editDialog = useEditDialog();
    const deleteDialog = useDeleteDialog(users, setUsers);

    const columns = useUsersTableColumns(editDialog.openDialog, deleteDialog.openDialog);

    return (
        <>
            <UsersDataGrid
                rows={users}
                columns={columns}
                pageSizeOptions={pageSizeOptions}
                onRowClick={detailsDialog.openDialog}
            />
            {
                detailsDialog.isOpen && detailsDialog.selectedUser && (
                    <UserDetailsDialog
                        userId={detailsDialog.selectedUser.id}
                        open={detailsDialog.isOpen}
                        onClose={detailsDialog.closeDialog}
                    />
                )
            }
            {
                editDialog.isOpen && editDialog.selectedUser && (
                    <UserEditDialog
                        userId={editDialog.selectedUser.id}
                        open={editDialog.isOpen}
                        onClose={editDialog.closeDialog}
                    />
                )
            }
            {
                deleteDialog.isOpen && deleteDialog.selectedUser && (
                    <UserDeleteDialog
                        userId={deleteDialog.selectedUser.id}
                        open={deleteDialog.isOpen}
                        onClose={deleteDialog.closeDialog}
                        onConfirm={deleteDialog.handleConfirmDelete}
                    />
                )
            }
        </>
    );
};

export default UsersTableContainer;