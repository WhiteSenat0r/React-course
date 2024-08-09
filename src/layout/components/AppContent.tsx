import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";

export default function AppContent() {
    return(
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                pt: 8
            }}
        >
            <Box sx={{ m:4 }}>
                <Outlet></Outlet>
            </Box>
        </Box>
    );
}