import { useCallback, useEffect, useMemo, useState } from "react";
import { ITodo } from "../interfaces/iTodo.ts";
import TodosHttpService from "../services/todosHttpService.ts";
import { useNotifications } from "@toolpad/core";

export const useTodosState = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const notifications = useNotifications();

    useEffect(() => {
        const todosHttpService = new TodosHttpService();

        setIsLoading(true);

        const fetch = async () => {
            try {
                const todosData: ITodo[] = await todosHttpService.getTodos();
                setTodos(todosData);
            } catch (error) {
                console.error("Error fetching todos:", error);
                notifications.show('Error loading todos', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, [notifications]);

    const addTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => [todo, ...prev]);
    }, []);

    const updateTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => prev.map((t) => {
            if (t.id !== todo.id) {
                return t;
            }
            return { ...t, ...todo };
        }));
    }, []);

    const removeTodo = useCallback((todoId: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
    }, []);

    const memoizedTodos = useMemo(() => {
        return todos;
    }, [todos]);

    return { todos: memoizedTodos, setTodos, isLoading, addTodo, updateTodo, removeTodo };
};
