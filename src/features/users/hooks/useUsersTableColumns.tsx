import React, {useMemo} from "react";
import {GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {IUserTableRow} from "../interfaces/iUserTableRow.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const useUsersTableColumns = (handleEditClick: (event: React.MouseEvent, userRow: IUserTableRow) => void,
                              handleDeleteClick: (event: React.MouseEvent, userRow: IUserTableRow) => void) => {
    const columns: GridColDef<IUserTableRow>[] = useMemo(() => {
        return [
            { field: 'firstName', headerName: 'First name', flex: 1 },
            { field: 'lastName', headerName: 'Last name', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
            {
                field: 'actions',
                type: 'actions',
                cellClassName: 'actions',
                getActions: (params) => {
                    const handleEdit = (event: React.MouseEvent) => {
                        console.log(params.row)
                        handleEditClick(event, params.row);
                    }

                    const handleDelete = (event: React.MouseEvent) => {
                        handleDeleteClick(event, params.row);
                    }

                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEdit}
                            color='info'
                            sx={{cursor: 'pointer'}}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDelete}
                            color='info'
                            sx={{cursor: 'pointer'}}
                        />,
                    ];
                },
                flex: 1,
                resizable: false,
                sortable: false,
                filterable: false,
                disableColumnMenu: true
            },

        ];
    }, [])

    return columns;
};

export default useUsersTableColumns;