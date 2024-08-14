import React, {memo, useCallback} from "react";
import {DataGrid, GridColDef, GridRowParams} from "@mui/x-data-grid";
import {IUserTableRow} from "../interfaces/iUserTableRow.ts";

interface UsersDataGridProps {
    rows: IUserTableRow[];
    columns: GridColDef[];
    pageSizeOptions: number[];
    onRowClick: (params: IUserTableRow) => void;
    loading: boolean;
}

const UsersDataGridComponent: React.FC<UsersDataGridProps> = ({ rows, columns, pageSizeOptions, onRowClick, loading }) => {
    const handleRowClick = useCallback((params: GridRowParams) => {
        onRowClick(params.row as IUserTableRow);
    }, [onRowClick]);

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
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            initialState={{
                pagination: {
                    paginationModel: { pageSize: pageSizeOptions[0], page: 0 },
                },
            }}
            loading={loading}
        />
    );
};

const UsersDataGrid = memo(UsersDataGridComponent);

export default UsersDataGrid;