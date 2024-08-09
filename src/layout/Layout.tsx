import * as React from 'react';

import Box from '@mui/material/Box';

import AppContent from "./components/AppContent.tsx";
import {TopBar} from "./components/top-bar/TopBar.tsx";
import {SideDrawer} from "./components/side-drawer/SideDrawer.tsx";


export default function Layout() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

  return (
      <Box sx={{ display: 'flex' }}>
          <TopBar open={open} toggleDrawer={toggleDrawer} />
          <SideDrawer open={open} toggleDrawer={toggleDrawer} />
          <AppContent />
      </Box>
  );
}