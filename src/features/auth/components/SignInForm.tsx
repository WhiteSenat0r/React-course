import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import React, { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth.ts";

import {EmailInput} from "./inputs/EmailInput.tsx";
import {PasswordInput} from "./inputs/PasswordInput.tsx";

import {SignInAuthErrorAlert} from "./SignInAuthErrorAlert.tsx";

export default function SignInForm() {
    const { isAuthenticated, handleSignIn } = useAuth();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Helper functions for localStorage operations with error handling
    const REMEMBER_ME_KEY = 'rememberMe';

    const getRememberMeFromStorage = (): boolean | null => {
        try {
            const saved = localStorage.getItem(REMEMBER_ME_KEY);
            return saved !== null ? saved === 'true' : null;
        } catch (error) {
            console.warn('Failed to read rememberMe from localStorage:', error);
            return null;
        }
    };

    const saveRememberMeToStorage = (value: boolean): void => {
        try {
            localStorage.setItem(REMEMBER_ME_KEY, String(value));
        } catch (error) {
            console.warn('Failed to save rememberMe to localStorage:', error);
        }
    };

    // Load rememberMe preference from localStorage on mount
    useEffect(() => {
        const saved = getRememberMeFromStorage();
        if (saved !== null) {
            setRememberMe(saved);
        }
    }, []);

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
        saveRememberMeToStorage(event.target.checked);
    };

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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                {
                   !isAuthenticated && (<SignInAuthErrorAlert />)
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
    );
}