import React, {ReactNode} from "react";

import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";

import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    protectedRoute: boolean;
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ protectedRoute, children }) => {
    let authStatus = false;

    try {
        authStatus = localStorage.getItem("authStatus") === 'true';
    } catch (error) {
        console.error('Error accessing localStorage for auth status:', error);
        // Default to false (not authenticated) if localStorage is unavailable
        authStatus = false;
    }

    if (protectedRoute) {
        return authStatus ? <>{children}</> : <Navigate to={APP_ROUTES.SIGN_IN} />;
    } else {
        return !authStatus ? <>{children}</> : <Navigate to={APP_ROUTES.USERS} />;
    }
};