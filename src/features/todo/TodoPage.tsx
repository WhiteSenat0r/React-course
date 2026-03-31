import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useTodoState } from "./hooks/useTodoState.ts";
import { useTodoDialog } from "./hooks/useTodoDialog.ts";
import { ITodo } from "./interfaces/iTodo.ts";
import { ITodoStatus } from "./interfaces/iTodoStatus.ts";
import KanbanBoard from "./components/KanbanBoard.tsx";
import TodoCreateDialog from "./components/dialogs/TodoCreateDialog.tsx";
import TodoEditDialog from "./components/dialogs/TodoEditDialog.tsx";
import TodoDeleteDialog from "./components/dialogs/TodoDeleteDialog.tsx";
import TodoDetailsDialog from "./components/dialogs/TodoDetailsDialog.tsx";
import TodoHttpService from "./services/todoHttpService.ts";
import { useNotifications } from "@toolpad/core";

const TodoPage: React.FC = () => {
    const { todos, isLoading, setNewTodo, setEditedTodo, deleteTodoFromState } = useTodoState();
    const createDialog = useTodoDialog();
    const editDialog = useTodoDialog();
    const deleteDialog = useTodoDialog();
    const detailsDialog = useTodoDialog();
    const notifications = useNotifications();

    const handleStatusChange = async (todoId: number, newStatus: ITodoStatus) => {
        try {
            const todoHttpService = new TodoHttpService();
            const updatedTodo = await todoHttpService.updateTodoStatus(todoId, newStatus);
            setEditedTodo(updatedTodo);
            notifications.show('Task status updated successfully!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        } catch (error) {
            console.error('Error updating todo status:', error);
            notifications.show('Error updating task status!', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    };

    const handleCreateConfirm = (todo: ITodo) => {
        setNewTodo(todo);
    };

    const handleEditConfirm = (todo: ITodo) => {
        setEditedTodo(todo);
    };

    const handleDeleteConfirm = (todoId: number) => {
        deleteTodoFromState(todoId);
    };

    const handleEdit = (todo: ITodo) => {
        editDialog.openDialog(todo);
    };

    const handleDelete = (todo: ITodo) => {
        deleteDialog.openDialog(todo);
    };

    const handleView = (todo: ITodo) => {
        detailsDialog.openDialog(todo);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Typography component="h1" variant="h4" fontWeight="bold">
                    Tasks
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => createDialog.openDialog()}
                >
                    New Task
                </Button>
            </Box>

            {isLoading ? (
                <Typography>Loading tasks...</Typography>
            ) : (
                <KanbanBoard
                    todos={todos}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            <TodoCreateDialog
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={handleCreateConfirm}
            />

            <TodoEditDialog
                open={editDialog.isOpen}
                todo={editDialog.selectedTodo}
                onClose={editDialog.closeDialog}
                onConfirm={handleEditConfirm}
            />

            <TodoDeleteDialog
                open={deleteDialog.isOpen}
                todo={deleteDialog.selectedTodo}
                onClose={deleteDialog.closeDialog}
                onConfirm={handleDeleteConfirm}
            />

            <TodoDetailsDialog
                open={detailsDialog.isOpen}
                todo={detailsDialog.selectedTodo}
                onClose={detailsDialog.closeDialog}
            />
        </Box>
    );
};

export default TodoPage;
