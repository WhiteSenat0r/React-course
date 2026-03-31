import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITodo } from '../interfaces/iTodo.ts';
import { ITodoPriority } from '../interfaces/iTodoPriority.ts';

interface TodoCardProps {
    todo: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
    onView: (todo: ITodo) => void;
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

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete, onView }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(todo);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(todo);
    };

    const handleView = () => {
        onView(todo);
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            sx={{
                mb: 2,
                cursor: 'grab',
                '&:active': {
                    cursor: 'grabbing',
                },
                '&:hover': {
                    boxShadow: 3,
                },
            }}
            onClick={handleView}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
                        {todo.title}
                    </Typography>
                    <Box>
                        <IconButton size="small" onClick={handleEdit} aria-label="edit">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={handleDelete} aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {todo.description.length > 100
                        ? `${todo.description.substring(0, 100)}...`
                        : todo.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip
                        label={getPriorityLabel(todo.priority)}
                        color={getPriorityColor(todo.priority)}
                        size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TodoCard;
