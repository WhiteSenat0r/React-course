import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Typography, Box } from '@mui/material';
import { ITodo } from '../interfaces/iTodo.ts';
import { ITodoColumn } from '../interfaces/iTodoColumn.ts';
import TodoCard from './TodoCard.tsx';

interface KanbanColumnProps {
    column: ITodoColumn;
    todos: ITodo[];
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
    onView: (todo: ITodo) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, todos, onEdit, onDelete, onView }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                minWidth: 300,
                maxWidth: 350,
                backgroundColor: '#f5f5f5',
                height: 'fit-content',
                minHeight: 400,
            }}
        >
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                {column.title}
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({todos.length})
                </Typography>
            </Typography>

            <Box ref={setNodeRef} sx={{ minHeight: 200 }}>
                <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {todos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onView={onView}
                        />
                    ))}
                </SortableContext>
            </Box>
        </Paper>
    );
};

export default KanbanColumn;
