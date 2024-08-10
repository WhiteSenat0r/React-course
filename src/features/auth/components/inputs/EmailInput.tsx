import TextField from "@mui/material/TextField";
import React from "react";

interface EmailInputProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    emailError: string;
    setEmailError: React.Dispatch<React.SetStateAction<string>>;
}

export const EmailInput: React.FC<EmailInputProps> = ({email, setEmail, emailError, setEmailError}) => {
    const validateEmail = (email: string) => {
        const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regExp.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail) && newEmail !== '') {
            setEmailError('Invalid email address');
        } else if (newEmail === '') {
            setEmailError('Email adress is required');
        }
        else {
            setEmailError('');
        }
    };

    return(
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
        />
    )
}