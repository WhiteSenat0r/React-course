import TodosHttpService from "../services/todosHttpService.ts";

export const useDeleteTodo = () => {
    const todosHttpService = new TodosHttpService();

    return async (id: string): Promise<boolean> => {
        try {
            return await todosHttpService.deleteTodo(id);
        } catch (error) {
            console.error("Error deleting todo:", error);
            return false;
        }
    };
};
