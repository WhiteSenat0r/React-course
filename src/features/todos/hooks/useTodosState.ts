import {useCallback, useEffect, useMemo, useState} from "react";
import {ITodo} from "../interfaces/iTodo.ts";
import TodosHttpService from "../services/todosHttpService.ts";
import {ITodosResponse} from "../interfaces/iTodosResponse.ts";

export const useTodosState = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const todosHttpService = new TodosHttpService();

        setIsLoading(true);

        const fetch = async () => {
            try {
                const todoResponse: ITodosResponse = await todosHttpService.getTodos();
                setTodos(todoResponse.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    const setNewTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => [todo, ...prev]);
    }, []);

    const setEditedTodo = useCallback((todo: ITodo) => {
        setTodos((prev) => prev.map((t) => {
            if (t.id !== todo.id) {
                return t;
            }

            return {...t, ...todo};
        }));
    }, []);

    const deleteTodoFromState = useCallback((todoId: string) => {
        setTodos((prev) => prev.filter((t) => {
            return t.id !== todoId;
        }));
    }, []);

    const memoizedTodos = useMemo(() => {
        return todos;
    }, [todos]);

    return {todos: memoizedTodos, setTodos, isLoading, setNewTodo, setEditedTodo, deleteTodoFromState};
};
