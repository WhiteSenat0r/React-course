import {useCallback, useState} from "react";

import {IUserTableRow} from "../interfaces/iUserTableRow.ts";

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserRow, setSelectedUserRow] = useState<IUserTableRow | null>(null);

    const openDialog = useCallback((userRow: IUserTableRow) => {
        setSelectedUserRow(userRow);
        setIsOpen(true);
    }, []);

    const openDialogByClick = useCallback((event: React.MouseEvent, userRow: IUserTableRow) => {
        event.stopPropagation();
        setSelectedUserRow(userRow);
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        setSelectedUserRow(null);
    }, []);

    return { isOpen, selectedUserRow, openDialog, openDialogByClick, closeDialog };
};