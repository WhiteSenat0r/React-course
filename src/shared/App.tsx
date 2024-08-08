import MainPage from "../layout/MainPage.tsx";
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