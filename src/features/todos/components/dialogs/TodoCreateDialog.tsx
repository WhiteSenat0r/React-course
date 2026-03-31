import React from "react";
import {ITodo} from "../../interfaces/iTodo.ts";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useCreateTodo} from "../../hooks/useCreateTodo.ts";
import {useNotifications} from "@toolpad/core";
import {ITodoStatus} from "../../interfaces/iTodoStatus.ts";

interface TodoCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (todo: ITodo) => void;
}

const TodoCreateDialog: React.FC<TodoCreateDialogProps> = ({open, onClose, onConfirm }) => {
    const handleCreateTodo = useCreateTodo();
    const notifications = useNotifications();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const newTodo = {
            title: data.get('title') as string,
            description: data.get('description') as string || undefined,
            status: (data.get('status') as ITodoStatus) || ITodoStatus.TODO,
        };

        const result = await handleCreateTodo(newTodo);

        if (result) {
            onConfirm(result);
            onClose();
            notifications.show('Task was created successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        }
        else {
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
                <DialogTitle id="create-dialog-title">Create Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        margin="normal"
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
                    />
                    <TextField
                        fullWidth
                        id="status"
                        name="status"
                        label="Status"
                        margin="normal"
                        select
                        defaultValue={ITodoStatus.TODO}
                        required
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
