import React from "react";
import {ITodo} from "../../interfaces/iTodo.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useEditTodo} from "../../hooks/useEditTodo.ts";
import {useNotifications} from "@toolpad/core";
import {ITodoStatus} from "../../interfaces/iTodoStatus.ts";

interface TodoEditDialogProps {
    open: boolean;
    todo: ITodo | null;
    onClose: () => void;
    onConfirm: (todo: ITodo) => void;
}

const TodoEditDialog: React.FC<TodoEditDialogProps> = ({open, todo, onClose, onConfirm }) => {
    const handleEditTodo = useEditTodo();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!todo) return;

        const data = new FormData(e.currentTarget);

        const updates = {
            title: data.get('title') as string,
            description: data.get('description') as string || undefined,
            status: data.get('status') as ITodoStatus,
        };

        const result = await handleEditTodo(todo.id, updates);

        if (result) {
            onConfirm(result);
            onClose();
            notifications.show('Task was updated successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        }
        else {
            notifications.show('Error occurred during task update!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="edit-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <Box component="form" onSubmit={handleSave}>
                <DialogTitle id="edit-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        margin="normal"
                        defaultValue={todo?.title}
                        required
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        margin="normal"
                        multiline
                        rows={3}
                        defaultValue={todo?.description || ''}
                    />
                    <TextField
                        fullWidth
                        id="status"
                        name="status"
                        label="Status"
                        margin="normal"
                        select
                        defaultValue={todo?.status || ITodoStatus.TODO}
                        required
                    >
                        <MenuItem value={ITodoStatus.TODO}>To Do</MenuItem>
                        <MenuItem value={ITodoStatus.IN_PROGRESS}>In Progress</MenuItem>
                        <MenuItem value={ITodoStatus.DONE}>Done</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default TodoEditDialog;
