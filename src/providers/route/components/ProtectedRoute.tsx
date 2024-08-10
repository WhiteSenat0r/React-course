import React from "react";

import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";

import {Navigate, Outlet} from "react-router-dom";

interface ProtectedRouteProps {
    authOnly: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authOnly }) => {
    const authStatus = localStorage.getItem("authStatus") === 'true';

    if (authOnly) {
        return authStatus ? <Outlet /> : <Navigate to={APP_ROUTES.SIGN_IN} />;
    } else {
        return !authStatus ? <Outlet /> : <Navigate to={APP_ROUTES.HOME} />;
    }
};