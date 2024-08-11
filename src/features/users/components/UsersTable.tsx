import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function UsersTable() {
    return(
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ml:0.5, my:2}}>
                Users
            </Typography>
            <DataGrid
                autoHeight
                pageSizeOptions={[5, 10, 25]}
                rows={rows}
                columns={columns} />
        </Box>
    )
}