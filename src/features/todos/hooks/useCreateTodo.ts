import TodosHttpService from "../services/todosHttpService.ts";
import {ITodo} from "../interfaces/iTodo.ts";

export const useCreateTodo = () => {
    const todosHttpService = new TodosHttpService();

    return async (todo: Omit<ITodo, 'id' | 'createdAt'>): Promise<ITodo | null> => {
        try {
            return await todosHttpService.createTodo(todo);
        } catch (error) {
            console.error("Error creating todo:", error);
            return null;
        }
    };
};
