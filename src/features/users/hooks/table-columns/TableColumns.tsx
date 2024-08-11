import {GridColDef} from "@mui/x-data-grid";

import UserActionButton from "../../components/UserActionButton.tsx";

import Box from "@mui/material/Box";

import {IUser} from "../../types/interfaces/iUser.ts";

import React from "react";

export const TableColumns = (handleEditClick: (event: React.MouseEvent, user: IUser) => void,
                             handleDeleteClick: (event: React.MouseEvent, user: IUser) => void): GridColDef[] =>
[
    { field: 'first_name', headerName: 'First name', flex: 1 },
    { field: 'last_name', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
        field: " ",
        renderCell: (params) => {
            const user = params.row as IUser;
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 0.85}}>
                    <UserActionButton label="Edit" onClick={handleEditClick} user={user} />
                    <UserActionButton label="Delete" onClick={handleDeleteClick} user={user} />
                </Box>
            );
        },
        flex: 1,
        resizable: false,
        sortable: false,
        filterable: false,
        disableColumnMenu: true
    },
];