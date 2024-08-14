import {BrowserRouter} from "react-router-dom";

import {NotificationsProvider} from "@toolpad/core";

import RoutesProvider from "./providers/route/RoutesProvider.tsx";
import AppThemeProvider from "./providers/theme/AppThemeProvider.tsx";

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