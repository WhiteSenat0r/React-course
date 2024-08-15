import React, {PropsWithChildren, useMemo, useState} from "react";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ColorModeContext } from './hooks/useColorMode.ts';

import './styles/index.css'

interface AppThemeProviderProps {
    children: React.ReactNode;
}

export default function AppThemeProvider({ children }: PropsWithChildren<AppThemeProviderProps>) {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}