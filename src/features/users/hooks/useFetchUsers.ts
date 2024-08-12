import { useState, useEffect } from 'react';

import { IUser } from '../types/interfaces/iUser';
import {IUserCollection} from "../types/interfaces/iUserCollection.ts";

import UsersHttpService from "../services/usersHttpService.ts";

export const useFetchUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const usersHttpService = new UsersHttpService();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userCollection: IUserCollection = await usersHttpService.getUsers();
                const userRows = userCollection.data as IUser[];
                setUsers(userRows);
            }
            finally {
                setIsLoading(!isLoading);
            }
        };

        fetchUsers();
    }, []);

    return users;
};