import {useState} from "react";

import {IUser} from "../../types/interfaces/iUser.ts";

export const useDetailsDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const openDialog = (user: IUser) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    return { isOpen, selectedUser, openDialog, closeDialog };
};