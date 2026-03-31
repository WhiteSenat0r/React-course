import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ITodo } from "../interfaces/iTodo.ts";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoCardProps {
    todo: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            sx={{
                mb: 2,
                cursor: 'grab',
                '&:hover': {
                    boxShadow: 3,
                },
            }}
            {...attributes}
            {...listeners}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                            {todo.title}
                        </Typography>
                        {todo.description && (
                            <Typography variant="body2" color="text.secondary">
                                {todo.description}
                            </Typography>
                        )}
                    </Box>
                    <Box display="flex" gap={0.5}>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(todo);
                            }}
                            aria-label="edit"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(todo.id);
                            }}
                            aria-label="delete"
                            color="error"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TodoCard;
