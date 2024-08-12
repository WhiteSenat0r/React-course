import UsersHttpService from "../services/usersHttpService.ts";

export const useDeleteUser = () => {
    const usersHttpService = new UsersHttpService();

    return async (userId: number): Promise<boolean> => {
        try {
            return await usersHttpService.deleteUser(userId);
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    };
};