import React from 'react';
import { Button } from '@mui/material';
import { User } from './userUtils';

interface UserActionButtonProps {
    label: string;
    onClick: (event: React.MouseEvent, user: User) => void;
    user: User;
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