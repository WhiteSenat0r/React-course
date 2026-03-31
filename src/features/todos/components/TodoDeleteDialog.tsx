import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import { useDeleteTodo } from "../hooks/useDeleteTodo.ts";
import { useNotifications } from "@toolpad/core";

interface TodoDeleteDialogProps {
    open: boolean;
    todoId: number | null;
    todoTitle: string;
    onClose: () => void;
    onConfirm: (id: number) => void;
}

const TodoDeleteDialog: React.FC<TodoDeleteDialogProps> = ({ open, todoId, todoTitle, onClose, onConfirm }) => {
    const handleDeleteTodo = useDeleteTodo();
    const notifications = useNotifications();

    const handleDelete = async () => {
        if (todoId === null) return;

        const result = await handleDeleteTodo(todoId);

        if (result) {
            onConfirm(todoId);
            onClose();
            notifications.show('Task deleted successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        } else {
            notifications.show('Error occurred during task deletion!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
        >
            <DialogTitle id="delete-dialog-title">Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the task "{todoTitle}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TodoDeleteDialog;
