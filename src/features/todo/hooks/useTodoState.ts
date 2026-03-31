import { useCallback, useEffect, useMemo, useState } from "react";
import { ITodo } from "../interfaces/iTodo.ts";
import TodoHttpService from "../services/todoHttpService.ts";

export const useTodoState = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTodos = useCallback(async () => {
        const todoHttpService = new TodoHttpService();
        setIsLoading(true);

        try {
            const fetchedTodos = await todoHttpService.getTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const setNewTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => [...prev, todo]);
    }, []);

    const setEditedTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => prev.map((t) => {
            if (t.id !== todo.id) {
                return t;
            }
            return { ...t, ...todo };
        }));
    }, []);

    const deleteTodoFromState = useCallback((todoId: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
    }, []);

    const memoizedTodos = useMemo(() => {
        return todos;
    }, [todos]);

    return {
        todos: memoizedTodos,
        setTodos,
        isLoading,
        setNewTodo,
        setEditedTodo,
        deleteTodoFromState,
        refetchTodos: fetchTodos
    };
};
