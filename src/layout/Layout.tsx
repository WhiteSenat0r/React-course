import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {AppBar} from "./components/AppBar.tsx";
import {AppDrawer} from "./components/AppDrawer.tsx";
import {DrawerListItems} from "./components/DrawerListItems.tsx";
import AppContent from "./components/AppContent.tsx";


export default function Layout() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
      <Box sx={{ display: 'flex' }}>
          <AppBar position="absolute" open={open}>
              <Toolbar
                  sx={{
                      pr: '24px', // keep right padding when drawer closed
                  }}
              >
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
                  <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{ flexGrow: 1 }}
                  >
                      React course
                  </Typography>
              </Toolbar>
          </AppBar>
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
                  {DrawerListItems}
              </List>
          </AppDrawer>
          <AppContent />
      </Box>
  );
}