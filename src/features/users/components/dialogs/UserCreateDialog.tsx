import React from "react";
import {IUser} from "../../interfaces/iUser.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useCreateUser} from "../../hooks/useCreateUser.ts";
import {useNotifications} from "@toolpad/core";

interface UserCreateDialogProps {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onConfirm: (user: IUser) => void;
}

const UserCreateDialog: React.FC<UserCreateDialogProps> = ({users, open, onClose, onConfirm }) => {
    const handleCreateUser = useCreateUser();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const sortedUsers = [...users].sort((a, b) => b.id - a.id);

        const createdUser: IUser = {
            id: sortedUsers[0].id + 1,
            first_name: data.get('firstName') as string,
            last_name: data.get('lastName') as string,
            email: data.get('email') as string,
        };

        const result = await handleCreateUser(createdUser);

        if (result) {
            onConfirm(createdUser);
            onClose();
            notifications.show('User was created successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        }
        else {
            notifications.show('Error occurred during user creation!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="create-dialog-title"
        >
            <Box component="form" onSubmit={handleSave}>
                <DialogTitle id="create-dialog-title">Create user</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First name"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default UserCreateDialog;