import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useFetchUser} from "../../hooks/useFetchUser.ts";

interface UserDetailsDialogProps {
    userId: number;
    open: boolean;
    onClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ userId, open, onClose }) => {
    const { fetchedUser, isLoading } = useFetchUser(userId);

    if (isLoading || !fetchedUser) {
        return null
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="details-dialog-title"
            aria-describedby="details-dialog-description"
        >
            <DialogTitle id="details-dialog-title">User details</DialogTitle>
            <DialogContent>
                <Box id="details-dialog-description">
                    <Typography>ID: {fetchedUser.id}</Typography>
                    <Typography>First name: {fetchedUser.first_name}</Typography>
                    <Typography>Last name: {fetchedUser.last_name}</Typography>
                    <Typography>Email: {fetchedUser.email}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;