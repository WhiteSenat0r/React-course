import {Route, Routes as ReactRoutes} from "react-router-dom";
import SignInForm from "../features/auth/components/SignInForm.tsx";
import NotFound from "../features/not-found/NotFound.tsx";
import {APP_ROUTES} from "../shared/variables/appRoutes.ts";
import Layout from "../layout/Layout.tsx";
import Example from "../features/home/Home.tsx";

export default function RoutesProvider() {
    return(
        <ReactRoutes>
            <Route path={APP_ROUTES.SIGN_IN} element={<SignInForm />} />
            <Route path={APP_ROUTES.HOME} element={<Layout />}>
                <Route path={APP_ROUTES.HOME} element={<Example />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </ReactRoutes>
    );
}