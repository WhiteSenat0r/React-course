import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React, { useState } from "react";

import useAuth from "../hooks/useAuth.ts";

import {EmailInput} from "./inputs/EmailInput.tsx";
import {PasswordInput} from "./inputs/PasswordInput.tsx";

import {SignInAuthErrorAlert} from "./SignInAuthErrorAlert.tsx";
import {SignInRedirect} from "./SignInRedirect.tsx";

export default function SignInForm() {
    const { isAuthenticated, handleSignIn } = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailError === '' && passwordError === '') {
            await handleSignIn(e);
        }
    };

    return (
        <Box
             sx={{
                 marginTop: 8,
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
             }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: 420 }}>
                <EmailInput
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    setEmailError={setEmailError}
                />
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError} />
                <SignInAuthErrorAlert isAuthenticated={isAuthenticated}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
            <SignInRedirect isAuthenticated={isAuthenticated} />
        </Box>
    );
}