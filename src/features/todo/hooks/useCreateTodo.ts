import TodoHttpService from "../services/todoHttpService.ts";
import { ITodo } from "../interfaces/iTodo.ts";

export const useCreateTodo = () => {
    const todoHttpService = new TodoHttpService();

    return async (todo: Omit<ITodo, 'id'>): Promise<ITodo | null> => {
        try {
            return await todoHttpService.createTodo(todo);
        } catch (error) {
            console.error("Error creating todo:", error);
            return null;
        }
    };
};
