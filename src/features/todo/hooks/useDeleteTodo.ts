import TodoHttpService from "../services/todoHttpService.ts";

export const useDeleteTodo = () => {
    const todoHttpService = new TodoHttpService();

    return async (id: number): Promise<boolean> => {
        try {
            return await todoHttpService.deleteTodo(id);
        } catch (error) {
            console.error("Error deleting todo:", error);
            return false;
        }
    };
};
