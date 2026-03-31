import {Navigate, Route, Routes} from "react-router-dom";

import SignInForm from "../../features/auth/components/SignInForm.tsx";
import NotFound from "../../features/not-found/NotFound.tsx";
import UsersPage from "../../features/users/UsersPage.tsx";
import TodosPage from "../../features/todos/TodosPage.tsx";

import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

import Layout from "../../layout/Layout.tsx";

import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

export default function RoutesProvider() {
    return(
        <Routes>
            <Route path={APP_ROUTES.SIGN_IN} element={<SignInForm /> } />

            <Route path={APP_ROUTES.USERS} element={
                <ProtectedRoute protectedRoute>
                    <Layout />
                </ProtectedRoute>
            }>
                <Route path={APP_ROUTES.USERS} element={<UsersPage />} />
                <Route path={APP_ROUTES.TODOS} element={<TodosPage />} />
            </Route>

            <Route path="/" element={<Navigate to={APP_ROUTES.USERS} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}