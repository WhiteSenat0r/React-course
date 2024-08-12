import React, {Fragment, ReactNode} from "react";

import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";

import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    protectedRoute: boolean;
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ protectedRoute, children }) => {
    const authStatus = localStorage.getItem("authStatus") === 'true';

    if (protectedRoute) {
        return authStatus ? <>{children}</> : <Navigate to={APP_ROUTES.SIGN_IN} />;
    } else {
        return !authStatus ? <>{children}</> : <Navigate to={APP_ROUTES.USERS} />;
    }
};