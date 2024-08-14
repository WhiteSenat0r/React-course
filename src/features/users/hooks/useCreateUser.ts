import UsersHttpService from "../services/usersHttpService.ts";
import {IUser} from "../interfaces/iUser.ts";

export const useCreateUser = () => {
    const usersHttpService = new UsersHttpService();

    return async (user: IUser): Promise<boolean> => {
        try {
            return await usersHttpService.createUser(user);
        } catch (error) {
            console.error("Error creating user:", error);
            return false;
        }
    };
};