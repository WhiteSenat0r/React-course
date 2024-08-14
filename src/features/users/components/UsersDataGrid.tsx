import React, {memo, useCallback} from "react";
import {DataGrid, GridColDef, GridRowParams} from "@mui/x-data-grid";
import {IUserTableRow} from "../interfaces/iUserTableRow.ts";
import {IPaginationModel} from "../interfaces/iPaginationModel.ts";

interface UsersDataGridProps {
    rows: IUserTableRow[];
    columns: GridColDef[];
    paginationModel: IPaginationModel;
    setPaginationModel: (paginationModel: IPaginationModel) => void;
    onRowClick: (params: IUserTableRow) => void;
    loading: boolean;
}

const UsersDataGridComponent: React.FC<UsersDataGridProps> = ({ rows, columns, paginationModel, setPaginationModel, onRowClick, loading }) => {
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
            rows={rows}
            rowCount={paginationModel.rowCount}
            columns={columns}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode='server'
            loading={loading}
        />
    );
};

const UsersDataGrid = memo(UsersDataGridComponent);

export default UsersDataGrid;