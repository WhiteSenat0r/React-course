import React from "react";

import {Navigate} from "react-router-dom";

import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";

interface SignInRedirectProps {
    isAuthenticated: boolean | undefined;
}

export const SignInRedirect: React.FC<SignInRedirectProps> = ({isAuthenticated}) => {
    if (isAuthenticated === true) {
        return (
            <Navigate to={APP_ROUTES.HOME} />
        )
    }
}