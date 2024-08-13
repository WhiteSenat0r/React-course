import {useMemo} from "react";
import {IUserTableRow} from "../types/interfaces/iUserTableRow.ts";
import {IUser} from "../types/interfaces/iUser.ts";

export const useUsersTableRows = (users: IUser[]) => {
    const rows: IUserTableRow[] = useMemo(() => {
        return users.map((u) => {
            return {
                id: u.id,
                firstName: u.first_name,
                lastName: u.last_name,
                email: u.email
            };
        });
    }, [users]);

    return {rows};
}