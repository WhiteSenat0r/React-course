import TodosHttpService from "../services/todosHttpService.ts";
import {ITodo} from "../interfaces/iTodo.ts";

export const useEditTodo = () => {
    const todosHttpService = new TodosHttpService();

    return async (id: string, updates: Partial<ITodo>): Promise<ITodo | null> => {
        try {
            return await todosHttpService.updateTodo(id, updates);
        } catch (error) {
            console.error("Error updating todo:", error);
            return null;
        }
    };
};
