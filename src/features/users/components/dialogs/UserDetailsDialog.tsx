import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {IUser} from "../../types/interfaces/iUser.ts";

interface UserDetailsDialogProps {
    user: IUser;
    open: boolean;
    onClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ user, open, onClose }) => {
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
                    <Typography>ID: {user.id}</Typography>
                    <Typography>First name: {user.first_name}</Typography>
                    <Typography>Last name: {user.last_name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;