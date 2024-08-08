import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

export const DrawerListItems = (
    <ListItemButton component={Link} to={APP_ROUTES.SIGN_IN}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Example sing-in route" />
    </ListItemButton>
);
