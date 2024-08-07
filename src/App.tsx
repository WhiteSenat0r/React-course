import MainPage from "./pages/MainPage.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
    <>
        <BrowserRouter>
            <MainPage></MainPage>
        </BrowserRouter>
    </>
  )
}

export default App