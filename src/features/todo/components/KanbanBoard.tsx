import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { ITodo } from '../interfaces/iTodo.ts';
import { ITodoColumn } from '../interfaces/iTodoColumn.ts';
import { ITodoStatus } from '../interfaces/iTodoStatus.ts';
import KanbanColumn from './KanbanColumn.tsx';
import TodoCard from './TodoCard.tsx';

interface KanbanBoardProps {
    todos: ITodo[];
    onStatusChange: (todoId: number, newStatus: ITodoStatus) => void;
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
    onView: (todo: ITodo) => void;
}

const columns: ITodoColumn[] = [
    { id: ITodoStatus.TODO, title: 'To Do' },
    { id: ITodoStatus.IN_PROGRESS, title: 'In Progress' },
    { id: ITodoStatus.DONE, title: 'Done' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ todos, onStatusChange, onEdit, onDelete, onView }) => {
    const [activeTodo, setActiveTodo] = React.useState<ITodo | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const todo = todos.find(t => t.id === active.id);
        if (todo) {
            setActiveTodo(todo);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTodo(null);
            return;
        }

        const todoId = active.id as number;
        const newStatus = over.id as ITodoStatus;

        const todo = todos.find(t => t.id === todoId);

        if (todo && todo.status !== newStatus) {
            onStatusChange(todoId, newStatus);
        }

        setActiveTodo(null);
    };

    const getTodosByStatus = (status: ITodoStatus): ITodo[] => {
        return todos.filter(todo => todo.status === status);
    };

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    overflowX: 'auto',
                    pb: 2,
                }}
            >
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        todos={getTodosByStatus(column.id)}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onView={onView}
                    />
                ))}
            </Box>

            <DragOverlay>
                {activeTodo ? (
                    <TodoCard
                        todo={activeTodo}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onView={() => {}}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;
