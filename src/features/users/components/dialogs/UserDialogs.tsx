import {IUser} from "../../types/interfaces/iUser.ts";

import React from "react";

import UserDetailsDialog from "./UserDetailsDialog.tsx";
import UserEditDialog from "./UserEditDialog.tsx";
import UserDeleteDialog from "./UserDeleteDialog.tsx";

interface UserDialogsProps {
    user: IUser | null;
    isDetailsDialogOpen: boolean;
    isEditDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
}

const UserDialogs: React.FC<UserDialogsProps> = (
{
    user,
    isDetailsDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    onClose,
    onConfirmDelete,
}) => {
    if (user) {
        return (
            <>
                <UserDetailsDialog
                    userId={user.id}
                    open={isDetailsDialogOpen}
                    onClose={onClose}
                />
                <UserEditDialog
                    userId={user.id}
                    open={isEditDialogOpen}
                    onClose={onClose}
                />
                <UserDeleteDialog
                    userId={user.id}
                    open={isDeleteDialogOpen}
                    onClose={onClose}
                    onConfirm={onConfirmDelete}
                />
            </>
        );
    }
};

export default UserDialogs;