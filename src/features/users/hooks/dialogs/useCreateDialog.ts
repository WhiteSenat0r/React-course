import {useState} from "react";

import {IUser} from "../../types/interfaces/iUser.ts";

export const useCreateDialog = (users: IUser[], setUsers: (users: IUser[]) => void) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleConfirmCreate = (user: IUser) => {
        const newUserCollection = [...users, user];
        setUsers(newUserCollection);
        closeDialog();
    };

    return { isOpen, openDialog, closeDialog, handleConfirmCreate };
};