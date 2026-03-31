import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ITodo } from "../interfaces/iTodo.ts";
import { ITodoStatus } from "../interfaces/iTodoStatus.ts";
import TodoCard from "./TodoCard.tsx";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TodoColumnProps {
    title: string;
    status: ITodoStatus;
    todos: ITodo[];
    onEdit: (todo: ITodo) => void;
    onDelete: (id: number) => void;
}

const TodoColumn: React.FC<TodoColumnProps> = ({ title, status, todos, onEdit, onDelete }) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    const columnColors: Record<ITodoStatus, string> = {
        [ITodoStatus.TODO]: '#f3f4f6',
        [ITodoStatus.IN_PROGRESS]: '#dbeafe',
        [ITodoStatus.DONE]: '#d1fae5',
    };

    const columnTodos = todos.filter(todo => todo.status === status);
    const todoIds = columnTodos.map(todo => todo.id);

    return (
        <Box sx={{ flex: 1, minWidth: 300 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    height: '100%',
                    minHeight: 500,
                    backgroundColor: columnColors[status],
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: 'text.primary',
                    }}
                >
                    {title}
                    <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        ({columnTodos.length})
                    </Typography>
                </Typography>

                <Box ref={setNodeRef} sx={{ minHeight: 400 }}>
                    <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
                        {columnTodos.map(todo => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </SortableContext>
                </Box>
            </Paper>
        </Box>
    );
};

export default TodoColumn;
