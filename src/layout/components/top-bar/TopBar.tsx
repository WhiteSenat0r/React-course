import React from "react";

import Toolbar from "@mui/material/Toolbar";

import {AppBar} from "./AppBar.tsx";
import {TopBarMenuButton} from "./TopBarMenuButton.tsx";
import {TopBarHeader} from "./TopBarHeader.tsx";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";
import Button from "@mui/material/Button";

interface TopBarProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('authStatus');
        navigate(APP_ROUTES.SIGN_IN);
    }

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    userSelect: 'none',
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <TopBarMenuButton open={open} toggleDrawer={toggleDrawer} />
                <TopBarHeader />
                <Button variant="text" onClick={logout}>Sign out</Button>
            </Toolbar>
        </AppBar>
    );
};