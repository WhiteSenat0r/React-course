import {IUser} from "../../interfaces/iUser.ts";
import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEditUser} from "../../hooks/useEditUser.ts";
import {IUserTableRow} from "../../interfaces/iUserTableRow.ts";
import {useNotifications} from "@toolpad/core";

interface UserEditDialogProps {
    userRow: IUserTableRow;
    open: boolean;
    onClose: () => void;
    onConfirm: (user: IUser) => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ userRow, open, onClose, onConfirm }) => {
    const handleEditUser = useEditUser();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const updatedUser: IUser = {
            id: userRow.id,
            first_name: data.get('firstName') as string,
            last_name: data.get('lastName') as string,
            email: data.get('email') as string,
        };

        const result = await handleEditUser(updatedUser);

        if (result) {
            onConfirm(updatedUser);
            onClose();
            notifications.show('User was edited successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        }
        else {
            notifications.show('Error occurred during user edition!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="edit-dialog-title"
        >
            <Box component="form" onSubmit={handleSave}>
                <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First name"
                        defaultValue={userRow.firstName}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        defaultValue={userRow.lastName}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        defaultValue={userRow.email}
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

export default UserEditDialog;