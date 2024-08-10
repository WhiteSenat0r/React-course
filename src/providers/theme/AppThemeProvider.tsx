import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, {PropsWithChildren} from "react";
import './styles/index.css'

const theme = createTheme();

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export default function AppThemeProvider({ children }: PropsWithChildren<AppThemeProviderProps>) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}