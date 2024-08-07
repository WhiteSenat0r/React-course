import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ExampleComponent from "./components/ExampleComponent.tsx";
import NotFoundComponent from "./components/NotFoundComponent.tsx";
import SignInComponent from "./components/SignInComponent.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ExampleComponent />,
        errorElement: <NotFoundComponent />
    },
    {
        path: "/sign-in",
        element: <SignInComponent />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
