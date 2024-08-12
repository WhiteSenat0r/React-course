import {useEffect, useState} from "react";
import {IUser} from "../types/interfaces/iUser.ts";
import UsersHttpService from "../services/usersHttpService.ts";
import {IUserCollection} from "../types/interfaces/iUserCollection.ts";

export const useFetchUser = (userId: number) => {
    const [fetchedUser, setFetchedUser] = useState<IUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const usersHttpService = new UsersHttpService();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userCollection: IUserCollection = await usersHttpService.getUser(userId);
                const userRow = userCollection.data as IUser;
                setFetchedUser(userRow);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { fetchedUser, isLoading };
};