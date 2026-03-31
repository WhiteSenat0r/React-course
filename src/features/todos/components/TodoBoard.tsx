import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ITodo } from "../interfaces/iTodo.ts";
import { ITodoStatus } from "../interfaces/iTodoStatus.ts";
import { useTodosState } from "../hooks/useTodosState.ts";
import { useUpdateTodo } from "../hooks/useUpdateTodo.ts";
import { useDialog } from "../hooks/useDialog.ts";
import TodoColumn from "./TodoColumn.tsx";
import TodoCard from "./TodoCard.tsx";
import TodoCreateDialog from "./TodoCreateDialog.tsx";
import TodoEditDialog from "./TodoEditDialog.tsx";
import TodoDeleteDialog from "./TodoDeleteDialog.tsx";
import { useNotifications } from "@toolpad/core";

const TodoBoard: React.FC = () => {
    const { todos, isLoading, addTodo, updateTodo, removeTodo } = useTodosState();
    const handleUpdateTodo = useUpdateTodo();
    const notifications = useNotifications();

    const createDialog = useDialog();
    const editDialog = useDialog();
    const deleteDialog = useDialog();

    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
    const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);

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

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Check if overId is a status column
        const isOverColumn = Object.values(ITodoStatus).includes(overId as ITodoStatus);

        if (isOverColumn) {
            const todo = todos.find(t => t.id === activeId);
            if (todo && todo.status !== overId) {
                // Optimistically update the UI
                const updatedTodo = { ...todo, status: overId as ITodoStatus };
                updateTodo(updatedTodo);
            }
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveTodo(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Check if overId is a status column
        const isOverColumn = Object.values(ITodoStatus).includes(overId as ITodoStatus);

        if (isOverColumn) {
            const todo = todos.find(t => t.id === activeId);
            if (todo && todo.status !== overId) {
                const updatedTodo = { ...todo, status: overId as ITodoStatus };

                // Persist the change to the backend
                const result = await handleUpdateTodo(updatedTodo);

                if (!result) {
                    // Rollback on failure
                    updateTodo(todo);
                    notifications.show('Error updating task status', {
                        severity: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
        }
    };

    const handleEdit = (todo: ITodo) => {
        setSelectedTodo(todo);
        editDialog.openDialog();
    };

    const handleDelete = (id: number) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            setDeleteTarget({ id, title: todo.title });
            deleteDialog.openDialog();
        }
    };

    const handleCreateConfirm = (todo: ITodo) => {
        addTodo(todo);
    };

    const handleEditConfirm = (todo: ITodo) => {
        updateTodo(todo);
    };

    const handleDeleteConfirm = (id: number) => {
        removeTodo(id);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={createDialog.openDialog}
                >
                    New Task
                </Button>
            </Box>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <Box display="flex" gap={2} sx={{ overflowX: 'auto' }}>
                    <TodoColumn
                        title="To Do"
                        status={ITodoStatus.TODO}
                        todos={todos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <TodoColumn
                        title="In Progress"
                        status={ITodoStatus.IN_PROGRESS}
                        todos={todos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <TodoColumn
                        title="Done"
                        status={ITodoStatus.DONE}
                        todos={todos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Box>

                <DragOverlay>
                    {activeTodo ? (
                        <TodoCard
                            todo={activeTodo}
                            onEdit={() => {}}
                            onDelete={() => {}}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <TodoCreateDialog
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={handleCreateConfirm}
            />

            <TodoEditDialog
                open={editDialog.isOpen}
                todo={selectedTodo}
                onClose={editDialog.closeDialog}
                onConfirm={handleEditConfirm}
            />

            <TodoDeleteDialog
                open={deleteDialog.isOpen}
                todoId={deleteTarget?.id || null}
                todoTitle={deleteTarget?.title || ''}
                onClose={deleteDialog.closeDialog}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
};

export default TodoBoard;
