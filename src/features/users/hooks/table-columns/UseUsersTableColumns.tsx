import React, {useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import {TableColumns} from "./TableColumns.tsx";
import {IUser} from "../../types/interfaces/iUser.ts";


const useUsersTableColumns = (handleEditClick: (event: React.MouseEvent, user: IUser) => void,
                              handleDeleteClick: (event: React.MouseEvent, user: IUser) => void) => {
    const [columns] = useState<GridColDef[]>(TableColumns(handleEditClick, handleDeleteClick));
    return columns;
};

export default useUsersTableColumns;