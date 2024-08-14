import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

import React from "react";
import {useDeleteUser} from "../../hooks/useDeleteUser.ts";
import {useNotifications} from "@toolpad/core";

interface UserDeleteDialogProps {
    userId: number;
    open: boolean;
    onClose: () => void;
    onConfirm: (userId: number) => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ userId, open, onClose, onConfirm }) => {
    const handleDeleteUser = useDeleteUser();
    const notifications = useNotifications();

    const removeUser = async () => {
        const removalResult = await handleDeleteUser(userId);

        if (removalResult) {
            onConfirm(userId);
            onClose();
            notifications.show('User was deleted successfully!', {
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
    }

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
                    Are you sure you want to delete this user?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={removeUser} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDeleteDialog;