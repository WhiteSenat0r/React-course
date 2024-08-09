import React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface TopBarMenuButtonProps {
    open: boolean;
    toggleDrawer: () => void;
}

export const TopBarMenuButton: React.FC<TopBarMenuButtonProps> = ({ open, toggleDrawer }) => {
    return (
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
            }}
        >
            <MenuIcon />
        </IconButton>
    );
};