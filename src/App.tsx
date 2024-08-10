import {BrowserRouter} from "react-router-dom";

import RoutesProvider from "./providers/route/RoutesProvider.tsx";
import AppThemeProvider from "./providers/theme/AppThemeProvider.tsx";

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