import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography, Chip } from "@mui/material";
import { ITodo } from "../../interfaces/iTodo.ts";
import { ITodoPriority } from "../../interfaces/iTodoPriority.ts";
import { ITodoStatus } from "../../interfaces/iTodoStatus.ts";

interface TodoDetailsDialogProps {
    open: boolean;
    todo: ITodo | null;
    onClose: () => void;
}

const getPriorityColor = (priority: ITodoPriority): 'error' | 'warning' | 'success' => {
    switch (priority) {
        case ITodoPriority.HIGH:
            return 'error';
        case ITodoPriority.MEDIUM:
            return 'warning';
        case ITodoPriority.LOW:
            return 'success';
        default:
            return 'success';
    }
};

const getPriorityLabel = (priority: ITodoPriority): string => {
    switch (priority) {
        case ITodoPriority.HIGH:
            return 'High';
        case ITodoPriority.MEDIUM:
            return 'Medium';
        case ITodoPriority.LOW:
            return 'Low';
        default:
            return 'Low';
    }
};

const getStatusLabel = (status: ITodoStatus): string => {
    switch (status) {
        case ITodoStatus.TODO:
            return 'To Do';
        case ITodoStatus.IN_PROGRESS:
            return 'In Progress';
        case ITodoStatus.DONE:
            return 'Done';
        default:
            return 'To Do';
    }
};

const TodoDetailsDialog: React.FC<TodoDetailsDialogProps> = ({ open, todo, onClose }) => {
    if (!todo) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="details-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="details-dialog-title">Task Details</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Title
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {todo.title}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {todo.description}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Due Date
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {new Date(todo.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Priority
                    </Typography>
                    <Chip
                        label={getPriorityLabel(todo.priority)}
                        color={getPriorityColor(todo.priority)}
                        size="small"
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Status
                    </Typography>
                    <Typography variant="body1">
                        {getStatusLabel(todo.status)}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TodoDetailsDialog;
