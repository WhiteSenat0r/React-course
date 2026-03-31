import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { ITodo } from "../../interfaces/iTodo.ts";
import { useDeleteTodo } from "../../hooks/useDeleteTodo.ts";

interface TodoDeleteDialogProps {
    open: boolean;
    todo: ITodo | null;
    onClose: () => void;
    onConfirm: (todoId: number) => void;
}

const TodoDeleteDialog: React.FC<TodoDeleteDialogProps> = ({ open, todo, onClose, onConfirm }) => {
    const handleDeleteTodo = useDeleteTodo();
    const notifications = useNotifications();

    const handleDelete = async () => {
        if (!todo) return;

        const result = await handleDeleteTodo(todo.id);

        if (result) {
            onConfirm(todo.id);
            onClose();
            notifications.show('Task was deleted successfully!', {
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

    if (!todo) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
        >
            <DialogTitle id="delete-dialog-title">Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the task "{todo.title}"? This action cannot be undone.
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
