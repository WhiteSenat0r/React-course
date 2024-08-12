import {useState} from "react";

import {IUser} from "../../types/interfaces/iUser.ts";

export const useEditDialog = () => {
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

    return { isOpen, selectedUser, openDialog, closeDialog };
};