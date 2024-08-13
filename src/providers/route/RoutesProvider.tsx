import {Route, Routes} from "react-router-dom";

import SignInForm from "../../features/auth/components/SignInForm.tsx";
import NotFound from "../../features/not-found/NotFound.tsx";

import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

import Layout from "../../layout/Layout.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import UsersPage from "../../features/users/components/UsersPage.tsx";

export default function RoutesProvider() {
    return(
        <Routes>
            <Route path={APP_ROUTES.SIGN_IN} element={<SignInForm /> } />

            <Route path={APP_ROUTES.HOME} element={
                <ProtectedRoute protectedRoute>
                    <Layout />
                </ProtectedRoute>
            }>
                <Route path={APP_ROUTES.USERS} element={<UsersPage />} />
                {/*<Route path={APP_ROUTES.HOME} element={<Layout />}>*/}
                {/*    <Route path={APP_ROUTES.HOME} element={<Example />} />*/}
                {/*    <Route path={APP_ROUTES.USERS} element={<UsersTable />} />*/}
                {/*</Route>*/}
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}