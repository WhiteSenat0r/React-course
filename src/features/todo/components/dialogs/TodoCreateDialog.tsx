import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, Box } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { ITodo } from "../../interfaces/iTodo.ts";
import { ITodoStatus } from "../../interfaces/iTodoStatus.ts";
import { ITodoPriority } from "../../interfaces/iTodoPriority.ts";
import { useCreateTodo } from "../../hooks/useCreateTodo.ts";

interface TodoCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (todo: ITodo) => void;
}

const TodoCreateDialog: React.FC<TodoCreateDialogProps> = ({ open, onClose, onConfirm }) => {
    const handleCreateTodo = useCreateTodo();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const newTodo: Omit<ITodo, 'id'> = {
            title: data.get('title') as string,
            description: data.get('description') as string,
            dueDate: data.get('dueDate') as string,
            priority: data.get('priority') as ITodoPriority,
            status: data.get('status') as ITodoStatus,
        };

        const result = await handleCreateTodo(newTodo);

        if (result) {
            onConfirm(result);
            onClose();
            notifications.show('Task was created successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        } else {
            notifications.show('Error occurred during task creation!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="create-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <Box component="form" onSubmit={handleSave}>
                <DialogTitle id="create-dialog-title">Create New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        required
                        id="title"
                        name="title"
                        label="Title"
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
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
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
                        defaultValue={ITodoPriority.MEDIUM}
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
                        defaultValue={ITodoStatus.TODO}
                        margin="normal"
                    >
                        <MenuItem value={ITodoStatus.TODO}>To Do</MenuItem>
                        <MenuItem value={ITodoStatus.IN_PROGRESS}>In Progress</MenuItem>
                        <MenuItem value={ITodoStatus.DONE}>Done</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default TodoCreateDialog;
