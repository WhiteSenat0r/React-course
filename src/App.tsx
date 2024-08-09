import {BrowserRouter} from "react-router-dom";
import React from "react";

import RoutesProvider from "./providers/RoutesProvider.tsx";
import AppThemeProvider from "./providers/AppThemeProvider.tsx";

function App() {
  return (
      <BrowserRouter>
          <AppThemeProvider>
              <RoutesProvider />
          </AppThemeProvider>
      </BrowserRouter>
  )
}

export default App