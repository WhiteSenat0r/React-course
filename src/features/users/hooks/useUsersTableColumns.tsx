import React, {useMemo} from "react";
import {GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {IUserTableRow} from "../interfaces/iUserTableRow.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const useUsersTableColumns = (
    handleEditClick: (event: React.MouseEvent, userRow: IUserTableRow) => void,
    handleDeleteClick: (event: React.MouseEvent, userRow: IUserTableRow) => void,
    canEdit: boolean,
    canDelete: boolean
) => {
    const columns: GridColDef<IUserTableRow>[] = useMemo(() => {
        const baseColumns: GridColDef<IUserTableRow>[] = [
            { field: 'firstName', headerName: 'First name', flex: 1 },
            { field: 'lastName', headerName: 'Last name', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
        ];

        // Only add actions column if user has edit or delete permissions
        if (canEdit || canDelete) {
            baseColumns.push({
                field: 'actions',
                type: 'actions',
                cellClassName: 'actions',
                getActions: (params) => {
                    const actions = [];

                    if (canEdit) {
                        const handleEdit = (event: React.MouseEvent) => {
                            console.log(params.row)
                            handleEditClick(event, params.row);
                        }

                        actions.push(
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                className="textPrimary"
                                onClick={handleEdit}
                                color='info'
                                sx={{cursor: 'pointer'}}
                            />
                        );
                    }

                    if (canDelete) {
                        const handleDelete = (event: React.MouseEvent) => {
                            handleDeleteClick(event, params.row);
                        }

                        actions.push(
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Delete"
                                onClick={handleDelete}
                                color='info'
                                sx={{cursor: 'pointer'}}
                            />
                        );
                    }

                    return actions;
                },
                flex: 1,
                resizable: false,
                sortable: false,
                filterable: false,
                disableColumnMenu: true
            });
        }

        return baseColumns;
    }, [canEdit, canDelete, handleEditClick, handleDeleteClick])

    return columns;
};

export default useUsersTableColumns;