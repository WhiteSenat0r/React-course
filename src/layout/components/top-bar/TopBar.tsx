import React from "react";

import Toolbar from "@mui/material/Toolbar";

import {AppBar} from "./AppBar.tsx";
import {TopBarMenuButton} from "./TopBarMenuButton.tsx";
import {TopBarHeader} from "./TopBarHeader.tsx";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";
import Button from "@mui/material/Button";
import {useRole} from "../../../providers/role/hooks/useRole.ts";

interface TopBarProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();
    const { role, clearRole } = useRole();

    const logout = () => {
        try {
            localStorage.removeItem('authStatus');
        } catch (error) {
            console.error('Error removing auth status from localStorage:', error);
        }

        try {
            clearRole();
        } catch (error) {
            console.error('Error clearing role:', error);
        }

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
                {role && (
                    <Button variant="text" disabled sx={{color: 'white', mr: 2}}>
                        Role: {role}
                    </Button>
                )}
                <Button variant="text" onClick={logout} sx={{color: 'white'}}>Sign out</Button>
            </Toolbar>
        </AppBar>
    );
};