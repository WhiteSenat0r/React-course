import TodoHttpService from "../services/todoHttpService.ts";
import { ITodo } from "../interfaces/iTodo.ts";

export const useEditTodo = () => {
    const todoHttpService = new TodoHttpService();

    return async (todo: ITodo): Promise<ITodo | null> => {
        try {
            return await todoHttpService.updateTodo(todo);
        } catch (error) {
            console.error("Error editing todo:", error);
            return null;
        }
    };
};
