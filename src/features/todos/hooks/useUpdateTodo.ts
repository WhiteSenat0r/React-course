import TodosHttpService from "../services/todosHttpService.ts";
import { ITodo } from "../interfaces/iTodo.ts";

export const useUpdateTodo = () => {
    const todosHttpService = new TodosHttpService();

    return async (todo: ITodo): Promise<boolean> => {
        try {
            return await todosHttpService.updateTodo(todo);
        } catch (error) {
            console.error("Error updating todo:", error);
            return false;
        }
    };
};
