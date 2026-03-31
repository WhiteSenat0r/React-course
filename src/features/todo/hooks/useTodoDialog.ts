import { useCallback, useState } from "react";
import { ITodo } from "../interfaces/iTodo.ts";

export const useTodoDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

    const openDialog = useCallback((todo?: ITodo) => {
        if (todo) {
            setSelectedTodo(todo);
        }
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
        setSelectedTodo(null);
    }, []);

    return { isOpen, selectedTodo, openDialog, closeDialog };
};
