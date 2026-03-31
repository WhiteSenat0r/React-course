import React from "react";
import {Card, CardContent, Typography, IconButton, Box} from "@mui/material";
import {Draggable} from "@hello-pangea/dnd";
import {ITodo} from "../interfaces/iTodo.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoCardProps {
    todo: ITodo;
    index: number;
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({todo, index, onEdit, onDelete}) => {
    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        mb: 2,
                        backgroundColor: snapshot.isDragging ? '#e3f2fd' : 'white',
                        boxShadow: snapshot.isDragging ? 4 : 1,
                        '&:hover': {
                            boxShadow: 3,
                        },
                    }}
                >
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="start">
                            <Box flex={1}>
                                <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
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
                                        onDelete(todo);
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
            )}
        </Draggable>
    );
};

export default TodoCard;
