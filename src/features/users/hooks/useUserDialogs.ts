import { useState } from 'react';
import { IUser } from '../types/interfaces/iUser';

export const useUserDialogs = () => {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const openDetailsDialog = (user: IUser) => {
        setSelectedUser(user);
        setIsDetailsDialogOpen(true);
    };

    const openEditDialog = (event: React.MouseEvent, user: IUser) => {
        event.stopPropagation();
        setSelectedUser(user);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (event: React.MouseEvent, user: IUser) => {
        event.stopPropagation();
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            setIsDeleteDialogOpen(false);
            setSelectedUser(null);
        }
    };

    const closeAllDialogs = () => {
        setIsDetailsDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
    };

    return {
        selectedUser,
        isDetailsDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        openDetailsDialog,
        openEditDialog,
        openDeleteDialog,
        closeAllDialogs,
        handleConfirmDelete
    };
};