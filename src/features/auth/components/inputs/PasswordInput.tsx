import TextField from "@mui/material/TextField";
import React from "react";

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    passwordError: string;
    setPasswordError: React.Dispatch<React.SetStateAction<string>>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({password, setPassword, passwordError, setPasswordError}) => {
    const validatePassword = (password: string) => {
        return password.trim().length > 0;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!validatePassword(newPassword)) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    return(
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
        />
    )
}