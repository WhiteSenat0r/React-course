import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

import React from "react";
import {IUser} from "../../types/interfaces/iUser.ts";

interface UserDeleteDialogProps {
    user: IUser | null;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ user, open, onClose, onConfirm }) => {
    if (user) {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete the user {user.first_name} {user.last_name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onConfirm} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
};

export default UserDeleteDialog;