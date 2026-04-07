import React from "react";
import useUsersTableColumns from "../hooks/useUsersTableColumns.tsx";
import UsersDataGrid from "./UsersDataGrid.tsx";
import UserDetailsDialog from "./dialogs/UserDetailsDialog.tsx";
import UserEditDialog from "./dialogs/UserEditDialog.tsx";
import UserDeleteDialog from "./dialogs/UserDeleteDialog.tsx";
import UserCreateDialog from "./dialogs/UserCreateDialog.tsx";
import Button from "@mui/material/Button";
import {useUsersTableRows} from "../hooks/useUsersTableRows.ts";
import {useDialog} from "../hooks/useDialog.ts";
import {useUsersState} from "../hooks/useUsersState.ts";
import {IPaginationModel} from "../interfaces/iPaginationModel.ts";
import {useRole} from "../../../providers/role/hooks/useRole.ts";

const UsersTableContainer: React.FC = () => {
    const { permissions } = useRole();
    const [paginationModel, setPaginationModel] = React.useState<IPaginationModel>({
        page: 0,
        pageSize: 6,
        rowCount: 0
    });

    const {users, isLoading, setNewUser, setEditedUser, deleteUserFromState} = useUsersState(paginationModel, setPaginationModel);
    const { rows } = useUsersTableRows(users);

    const createDialog = useDialog();
    const detailsDialog = useDialog();
    const editDialog = useDialog();
    const deleteDialog = useDialog();

    // Safely access permissions with fallback
    const canEdit = permissions?.canEdit ?? false;
    const canDelete = permissions?.canDelete ?? false;
    const canCreate = permissions?.canCreate ?? false;

    const columns = useUsersTableColumns(
        editDialog.openDialogByClick,
        deleteDialog.openDialogByClick,
        canEdit,
        canDelete
    );

    return (
        <>
            <UserCreateDialog
                users={users}
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={setNewUser}
            />
            {canCreate && (
                <Button variant='contained' sx={{my:2}} onClick={createDialog.openDialog}>Create</Button>
            )}
            <UsersDataGrid
                loading={isLoading}
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
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
                        onConfirm={setEditedUser}
                    />
                )
            }
            {
                deleteDialog.isOpen && deleteDialog.selectedUserRow && (
                    <UserDeleteDialog
                        userId={deleteDialog.selectedUserRow?.id}
                        open={deleteDialog.isOpen}
                        onClose={deleteDialog.closeDialog}
                        onConfirm={deleteUserFromState}
                    />
                )
            }
        </>
    );
};

export default UsersTableContainer;