import {IUser} from "../../types/interfaces/iUser.ts";
import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface UserEditDialogProps {
    user: IUser;
    open: boolean;
    onClose: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ user, open, onClose }) => {
    const handleSave = () => {
        console.log("Save changes");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="edit-dialog-title"
        >
            <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="First name"
                        defaultValue={user.first_name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Last name"
                        defaultValue={user.last_name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        defaultValue={user.email}
                        margin="normal"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserEditDialog;