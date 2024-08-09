import {AppDrawer} from "./AppDrawer.tsx";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import React from "react";
import {Divider, List} from "@mui/material";
import {SideDrawerListItems} from "../SideDrawerListItems.tsx";

interface SideDrawerProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ open, toggleDrawer }) => {
    return (
        <AppDrawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {SideDrawerListItems}
            </List>
        </AppDrawer>
    );
};