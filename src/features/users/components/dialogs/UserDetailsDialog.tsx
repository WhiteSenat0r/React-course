import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {IUserTableRow} from "../../interfaces/iUserTableRow.ts";

interface UserDetailsDialogProps {
    userRow: IUserTableRow;
    open: boolean;
    onClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ userRow, open, onClose }) => {
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
                    <Typography>ID: {userRow.id}</Typography>
                    <Typography>First name: {userRow.firstName}</Typography>
                    <Typography>Last name: {userRow.lastName}</Typography>
                    <Typography>Email: {userRow.email}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;