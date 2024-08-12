import React from "react";
import { DataGrid, GridRowModel, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../types/interfaces/iUser";

interface UsersDataGridProps {
    rows: IUser[];
    columns: GridColDef[];
    pageSizeOptions: number[];
    onRowClick: (params: GridRowModel) => void;
}

const UsersDataGrid: React.FC<UsersDataGridProps> = ({ rows, columns, pageSizeOptions, onRowClick }) => {
    return (
        <DataGrid
            sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                },
            }}
            autoHeight
            pagination
            pageSizeOptions={pageSizeOptions}
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            disableRowSelectionOnClick
            initialState={{
                pagination: {
                    paginationModel: { pageSize: pageSizeOptions[0], page: 0 },
                },
            }}
        />
    );
};

export default UsersDataGrid;