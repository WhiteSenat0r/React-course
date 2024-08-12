import React from 'react';
import { Button } from '@mui/material';
import {IUser} from "../types/interfaces/iUser.ts";

interface UserActionButtonProps {
    label: string;
    onClick: (event: React.MouseEvent, user: IUser) => void;
    user: IUser;
}

const UserActionButton: React.FC<UserActionButtonProps> = ({ label, onClick, user }) => (
    <Button
        sx={{ mx: 1 }}
        variant="contained"
        onClick={(event) => onClick(event, user)}
    >
        {label}
    </Button>
);

export default UserActionButton;