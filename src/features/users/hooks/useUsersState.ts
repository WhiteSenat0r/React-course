import {useCallback, useEffect, useState} from "react";
import {IUser} from "../types/interfaces/iUser.ts";
import UsersHttpService from "../services/usersHttpService.ts";
import {IUserResponse} from "../types/interfaces/iUserResponse.ts";
import {useNotifications} from "@toolpad/core";

export const useUsersState = (notifications: ReturnType<typeof useNotifications>) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const usersHttpService = new UsersHttpService();

        setIsLoading(true);

        const fetch = async () => {
            try {
                const users: IUserResponse = await usersHttpService.getUsers();
                setUsers(users.data);
            }
            finally {
                setIsLoading(false);
                notifications.show('Users were successfully loaded!', {
                    severity: 'info',
                    autoHideDuration: 3000,
                });
            }
        };

        fetch();
    }, []);

    const setNewUser = useCallback((user: IUser) => {
        setUsers((prev) => [...prev, user]);
    }, []);

    const setEditedUser = useCallback((user: IUser) => {
        setUsers((prev) => prev.map((u) => {
            if (u.id !== user.id) {
                return u;
            }

            return {...u, ...user};
        }));
    }, []);

    const deleteUserFromState = useCallback((userId: number) => {
        setUsers((prev) => prev.filter((u) => {
            return u.id !== userId;
        }));
    }, []);

    return {users, setUsers, isLoading, setNewUser, setEditedUser, deleteUserFromState};
}