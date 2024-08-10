import {Route, Routes} from "react-router-dom";

import SignInForm from "../../features/auth/components/SignInForm.tsx";
import NotFound from "../../features/not-found/NotFound.tsx";
import Example from "../../features/home/Home.tsx";

import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

import Layout from "../../layout/Layout.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

export default function RoutesProvider() {
    return(
        <Routes>
            <Route path={APP_ROUTES.SIGN_IN} element={<ProtectedRoute authOnly={false}/>}>
                <Route path={APP_ROUTES.SIGN_IN} element={<SignInForm />} />
            </Route>
            <Route path={APP_ROUTES.HOME} element={<ProtectedRoute authOnly={true}/>}>
                <Route path={APP_ROUTES.HOME} element={<Layout />}>
                    <Route path={APP_ROUTES.HOME} element={<Example />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}