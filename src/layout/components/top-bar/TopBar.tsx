import React from "react";

import Toolbar from "@mui/material/Toolbar";

import {AppBar} from "./AppBar.tsx";
import {TopBarMenuButton} from "./TopBarMenuButton.tsx";
import {TopBarHeader} from "./TopBarHeader.tsx";

interface TopBarProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ open, toggleDrawer }) => {
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    userSelect: 'none',
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <TopBarMenuButton open={open} toggleDrawer={toggleDrawer} />
                <TopBarHeader />
            </Toolbar>
        </AppBar>
    );
};