import {useState} from "react";

import {IUserTableRow} from "../types/interfaces/iUserTableRow.ts";

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserRow, setSelectedUserRow] = useState<IUserTableRow | null>(null);

    const openDialog = (userRow: IUserTableRow) => {
        setSelectedUserRow(userRow);
        setIsOpen(true);
    };

    const openDialogByClick = (event: React.MouseEvent, userRow: IUserTableRow) => {
        event.stopPropagation();
        setSelectedUserRow(userRow);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setSelectedUserRow(null);
    };

    return { isOpen, selectedUserRow, openDialog, openDialogByClick, closeDialog };
};