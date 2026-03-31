import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, Box } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { ITodo } from "../../interfaces/iTodo.ts";
import { ITodoStatus } from "../../interfaces/iTodoStatus.ts";
import { ITodoPriority } from "../../interfaces/iTodoPriority.ts";
import { useEditTodo } from "../../hooks/useEditTodo.ts";

interface TodoEditDialogProps {
    open: boolean;
    todo: ITodo | null;
    onClose: () => void;
    onConfirm: (todo: ITodo) => void;
}

const TodoEditDialog: React.FC<TodoEditDialogProps> = ({ open, todo, onClose, onConfirm }) => {
    const handleEditTodo = useEditTodo();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!todo) return;

        const data = new FormData(e.currentTarget);

        const updatedTodo: ITodo = {
            id: todo.id,
            title: data.get('title') as string,
            description: data.get('description') as string,
            dueDate: data.get('dueDate') as string,
            priority: data.get('priority') as ITodoPriority,
            status: data.get('status') as ITodoStatus,
        };

        const result = await handleEditTodo(updatedTodo);

        if (result) {
            onConfirm(result);
            onClose();
            notifications.show('Task was updated successfully!', {
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
                        defaultValue={todo.title}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        label="Description"
                        defaultValue={todo.description}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        defaultValue={todo.dueDate}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        select
                        id="priority"
                        name="priority"
                        label="Priority"
                        defaultValue={todo.priority}
                        margin="normal"
                    >
                        <MenuItem value={ITodoPriority.LOW}>Low</MenuItem>
                        <MenuItem value={ITodoPriority.MEDIUM}>Medium</MenuItem>
                        <MenuItem value={ITodoPriority.HIGH}>High</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        required
                        select
                        id="status"
                        name="status"
                        label="Status"
                        defaultValue={todo.status}
                        margin="normal"
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
