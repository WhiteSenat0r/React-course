import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/common/Routes.ts";

export const DrawerListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to={ROUTES.SIGN_IN}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Example sing-in route" />
    </ListItemButton>
  </React.Fragment>
);
