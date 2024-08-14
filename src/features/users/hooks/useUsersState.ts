import {useCallback, useEffect, useMemo, useState} from "react";
import {IUser} from "../interfaces/iUser.ts";
import UsersHttpService from "../services/usersHttpService.ts";
import {IUserResponse} from "../interfaces/iUserResponse.ts";
import {useNotifications} from "@toolpad/core";
import {IPaginationModel} from "../interfaces/iPaginationModel.ts";

export const useUsersState = (paginationModel : IPaginationModel, setPaginationModel: (paginationModel : IPaginationModel) => void) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const usersHttpService = new UsersHttpService();

        setIsLoading(true);

        const fetch = async () => {
            const userResponse: IUserResponse = await usersHttpService.getUsers(paginationModel);
            setUsers(userResponse.data);

            const updatedPaginationModel: IPaginationModel = {
                page: paginationModel.page,
                pageSize: paginationModel.pageSize,
                rowCount: userResponse.total
            };
            setPaginationModel(updatedPaginationModel)
            setIsLoading(false);
        };

        fetch();
    }, [paginationModel.page, paginationModel.pageSize]);

    const setNewUser = useCallback((user: IUser) => {
        setUsers((prev) => [user, ...prev]);
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

    const memoizedUser = useMemo(() => {
        return users;
    }, [users]);

    return {users: memoizedUser, setUsers, isLoading, setNewUser, setEditedUser, deleteUserFromState};
}