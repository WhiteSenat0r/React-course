import UsersHttpService from "../services/usersHttpService.ts";
import {IUser} from "../types/interfaces/iUser.ts";

export const useEditUser = () => {
    const usersHttpService = new UsersHttpService();

    return async (user: IUser): Promise<boolean> => {
        try {
            return await usersHttpService.updateUser(user);
        } catch (error) {
            console.error("Error editing user:", error);
            return false;
        }
    };
};