import {Route, Routes as ReactRoutes} from "react-router-dom";
import SignIn from "../../features/auth/components/SignIn.tsx";
import NotFound from "./NotFound.tsx";
import {APP_ROUTES} from "../variables/appRoutes.ts";
import Layout from "../../layout/Layout.tsx";
import Example from "./Home.tsx";

export default function Routes() {
    return(
        <ReactRoutes>
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                <Route path={APP_ROUTES.HOME} element={<Example />} />
                <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </ReactRoutes>
    );
}