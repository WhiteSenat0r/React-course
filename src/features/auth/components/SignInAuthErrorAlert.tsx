import React from "react";
import {Alert} from "@mui/material";

export const SignInAuthErrorAlert: React.FC = () => {
    return (
        <Alert severity="error" sx={{ mt: 2, mb: 2, width: '100%' }}>
            Invalid credentials!
        </Alert>
    )
}