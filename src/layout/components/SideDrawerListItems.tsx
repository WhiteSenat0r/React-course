import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

export const SideDrawerListItems = (
    <>
        <ListItemButton component={Link} to={APP_ROUTES.USERS}>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton component={Link} to={APP_ROUTES.TODOS}>
            <ListItemIcon>
                <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="To-Do" />
        </ListItemButton>
    </>
);
