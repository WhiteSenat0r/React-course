import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {LAYOUT_CONSTANTS} from "../../variables/layoutConstants.ts";

const drawerWidth: number = LAYOUT_CONSTANTS.DRAWER_WIDTH;
const collapsedDrawerWidth: number = LAYOUT_CONSTANTS.COLLAPSED_DRAWER_WIDTH;

export const AppDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: open ? drawerWidth : collapsedDrawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);