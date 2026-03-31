import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUpdateTodo } from "../hooks/useUpdateTodo.ts";
import { useNotifications } from "@toolpad/core";
import { ITodo } from "../interfaces/iTodo.ts";
import { ITodoStatus } from "../interfaces/iTodoStatus.ts";

interface TodoEditDialogProps {
    open: boolean;
    todo: ITodo | null;
    onClose: () => void;
    onConfirm: (todo: ITodo) => void;
}

const TodoEditDialog: React.FC<TodoEditDialogProps> = ({ open, todo, onClose, onConfirm }) => {
    const handleUpdateTodo = useUpdateTodo();
    const notifications = useNotifications();
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        status: ITodoStatus.TODO,
    });

    useEffect(() => {
        if (todo) {
            setFormValues({
                title: todo.title,
                description: todo.description || '',
                status: todo.status,
            });
        }
    }, [todo]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!todo) return;

        const data = new FormData(e.currentTarget);

        const updatedTodo: ITodo = {
            ...todo,
            title: data.get('title') as string,
            description: data.get('description') as string || undefined,
            status: data.get('status') as ITodoStatus,
        };

        const result = await handleUpdateTodo(updatedTodo);

        if (result) {
            onConfirm(updatedTodo);
            onClose();
            notifications.show('Task updated successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        } else {
            notifications.show('Error occurred during task update!', {
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
            aria-labelledby="edit-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <Box component="form" onSubmit={handleSave}>
                <DialogTitle id="edit-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        required
                        id="title"
                        name="title"
                        label="Title"
                        margin="normal"
                        value={formValues.title}
                        onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
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
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        select
                        id="status"
                        name="status"
                        label="Status"
                        margin="normal"
                        value={formValues.status}
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value as ITodoStatus })}
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
