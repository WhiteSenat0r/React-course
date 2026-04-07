import {BrowserRouter} from "react-router-dom";

import {NotificationsProvider} from "@toolpad/core";

import RoutesProvider from "./providers/route/RoutesProvider.tsx";
import AppThemeProvider from "./providers/theme/AppThemeProvider.tsx";
import {RoleProvider} from "./providers/role/RoleProvider.tsx";

function App() {
  return (
      <BrowserRouter>
          <AppThemeProvider>
              <RoleProvider>
                  <NotificationsProvider>
                      <RoutesProvider />
                  </NotificationsProvider>
              </RoleProvider>
          </AppThemeProvider>
      </BrowserRouter>
  )
}

export default App