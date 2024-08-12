import {IUser} from "../../types/interfaces/iUser.ts";
import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEditUser} from "../../hooks/useEditUser.ts";

interface UserEditDialogProps {
    user: IUser;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ user, open, onClose, onConfirm }) => {
    const handleEditUser = useEditUser();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const updatedUser: IUser = {
            id: user.id,
            first_name: data.get('first_name') as string,
            last_name: data.get('last_name') as string,
            email: data.get('email') as string,
        };

        const result = await handleEditUser(updatedUser);

        if (result) {
            onConfirm(updatedUser);
            onClose();
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
                        id="first_name"
                        name="first_name"
                        label="First name"
                        defaultValue={user.first_name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        defaultValue={user.last_name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        defaultValue={user.email}
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