import {BrowserRouter} from "react-router-dom";

import RoutesProvider from "./providers/route/RoutesProvider.tsx";
import AppThemeProvider from "./providers/theme/AppThemeProvider.tsx";
import React from "react";
import {NotificationsProvider} from "@toolpad/core";

function App() {
  return (
      <BrowserRouter>
          <AppThemeProvider>
              <NotificationsProvider>
                  <RoutesProvider />
              </NotificationsProvider>
          </AppThemeProvider>
      </BrowserRouter>
  )
}

export default App