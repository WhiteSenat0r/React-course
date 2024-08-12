import {useState} from "react";

import {IUser} from "../../types/interfaces/iUser.ts";

export const useEditDialog = (users: IUser[], setUsers: (users: IUser[]) => void) => {
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

    const handleConfirmEdit = (updatedUser: IUser) => {
        if (selectedUser) {
            const newUserCollection = users.map(user =>
                user.id === selectedUser.id ? updatedUser : user
            );
            setUsers(newUserCollection);
            setSelectedUser(updatedUser);
            closeDialog();
        }
    };

    return { isOpen, selectedUser, openDialog, closeDialog, handleConfirmEdit };
};