import {Route, Routes as ReactRoutes} from "react-router-dom";
import SignInForm from "../../features/auth/components/SignInForm.tsx";
import NotFound from "./NotFound.tsx";
import {APP_ROUTES} from "../variables/appRoutes.ts";
import Layout from "../../layout/Layout.tsx";
import Example from "./Home.tsx";

export default function Routes() {
    return(
        <ReactRoutes>
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                <Route path={APP_ROUTES.HOME} element={<Example />} />
                <Route path={APP_ROUTES.SIGN_IN} element={<SignInForm />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </ReactRoutes>
    );
}