import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

import React from "react";
import {useFetchUser} from "../../hooks/useFetchUser.ts";
import {useDeleteUser} from "../../hooks/useDeleteUser.ts";

interface UserDeleteDialogProps {
    userId: number;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ userId, open, onClose, onConfirm }) => {
    const handleDeleteUser = useDeleteUser();
    const { fetchedUser, isLoading } = useFetchUser(userId);

    const removeUser = async () => {
        const removalResult = await handleDeleteUser(fetchedUser.id);

        if (removalResult) {
            onConfirm();
        }
    }

    if (isLoading || !fetchedUser) {
        return null
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
                    Are you sure you want to delete the user {fetchedUser.first_name} {fetchedUser.last_name}?
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