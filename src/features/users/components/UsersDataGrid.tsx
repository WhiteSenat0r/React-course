import React from "react";
import { DataGrid, GridRowModel, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../types/interfaces/iUser";

interface UsersDataGridProps {
    rows: IUser[];
    columns: GridColDef[];
    onRowClick: (params: GridRowModel) => void;
}

const UsersDataGrid: React.FC<UsersDataGridProps> = ({ rows, columns, onRowClick }) => {
    return (
        <DataGrid
            sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                },
            }}
            autoHeight
            pagination
            pageSizeOptions={[5, 10, 25]}
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            disableRowSelectionOnClick
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                },
            }}
        />
    );
};

export default UsersDataGrid;