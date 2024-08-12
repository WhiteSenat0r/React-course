import {useState} from "react";

import {IUser} from "../../types/interfaces/iUser.ts";

export const useDeleteDialog = (users: IUser[], setUsers: (users: IUser[]) => void) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const openDialog = (event: React.MouseEvent, user: IUser) => {
        event.stopPropagation();
        setSelectedUser(user);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            const newUserCollection = users.filter(user => user.id !== selectedUser.id);
            setUsers(newUserCollection);
            closeDialog();
        }
    };

    return { isOpen, selectedUser, openDialog, closeDialog, handleConfirmDelete };
};