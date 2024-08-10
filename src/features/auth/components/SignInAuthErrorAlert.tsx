import React from "react";
import {Alert} from "@mui/material";

interface SignInAuthErrorAlertProps {
    isAuthenticated: boolean | undefined;
}

export const SignInAuthErrorAlert: React.FC<SignInAuthErrorAlertProps> = ({isAuthenticated}) => {
    if (isAuthenticated === false) {
        return (
            <Alert severity="error" sx={{ mt: 2, mb: 2, width: '100%' }}>
                Invalid credentials!
            </Alert>
        )
    }
}