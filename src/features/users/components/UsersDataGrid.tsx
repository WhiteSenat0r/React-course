import React, {memo} from "react";
import {DataGrid, GridColDef, GridRowParams} from "@mui/x-data-grid";
import {IUserTableRow} from "../interfaces/iUserTableRow.ts";
import {isDeepEqual} from "@mui/x-data-grid/internals";

interface UsersDataGridProps {
    rows: IUserTableRow[];
    columns: GridColDef[];
    pageSizeOptions: number[];
    onRowClick: (params: IUserTableRow) => void;
    loading: boolean;
}

const UsersDataGridComponent: React.FC<UsersDataGridProps> = ({ rows, columns, pageSizeOptions, onRowClick, loading }) => {
    const handleRowClick = (params: GridRowParams) => {
        onRowClick(params.row as IUserTableRow);
    };

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

const UsersDataGrid = memo(UsersDataGridComponent,
    (prevProps, nextProps) => {

    return isDeepEqual(prevProps.rows, nextProps.rows) &&
        isDeepEqual(prevProps.columns, nextProps.columns) &&
        isDeepEqual(prevProps.pageSizeOptions, nextProps.pageSizeOptions) &&
        isDeepEqual(prevProps.onRowClick, nextProps.onRowClick) &&
        prevProps.loading === nextProps.loading;
});

export default UsersDataGrid;