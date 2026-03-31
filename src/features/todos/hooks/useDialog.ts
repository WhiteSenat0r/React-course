import { useState, useCallback } from 'react';

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    return { isOpen, openDialog, closeDialog };
};
