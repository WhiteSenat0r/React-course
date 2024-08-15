import {AppDrawer} from "./AppDrawer.tsx";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from "react";
import {Divider, List, Box} from "@mui/material";
import {SideDrawerListItems} from "../SideDrawerListItems.tsx";
import {ColorModeSwitch} from "../ColorModeSwitch.tsx";

interface SideDrawerProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ open, toggleDrawer }) => {
    return (
        <AppDrawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    visibility: open ? "visible" : "hidden",
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
            <Divider sx={{visibility: open ? "visible" : "hidden"}} />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>
                <List component="nav" sx={{ flexGrow: 1 }}>
                    {SideDrawerListItems}
                </List>
                {open && (
                    <List sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ColorModeSwitch />
                    </List>
                )}
            </Box>
        </AppDrawer>
    );
};