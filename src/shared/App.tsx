import {BrowserRouter} from "react-router-dom";
import Routes from "./components/Routes.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </>
  )
}

export default App