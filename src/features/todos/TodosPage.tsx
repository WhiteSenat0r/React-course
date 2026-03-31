import React from "react";
import {Box, Button, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TodosKanbanBoard from "./components/TodosKanbanBoard.tsx";
import TodoCreateDialog from "./components/dialogs/TodoCreateDialog.tsx";
import TodoEditDialog from "./components/dialogs/TodoEditDialog.tsx";
import TodoDeleteDialog from "./components/dialogs/TodoDeleteDialog.tsx";
import {useTodosState} from "./hooks/useTodosState.ts";
import {useTodoDialog} from "./hooks/useTodoDialog.ts";

const TodosPage: React.FC = () => {
    const {todos, isLoading, setNewTodo, setEditedTodo, deleteTodoFromState, setTodos} = useTodosState();

    const createDialog = useTodoDialog();
    const editDialog = useTodoDialog();
    const deleteDialog = useTodoDialog();

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{my: 2}}>
                <Typography component="h1" variant="h4" fontWeight="bold">
                    To-Do Board
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => createDialog.openDialog()}
                >
                    Add Task
                </Button>
            </Box>

            <TodosKanbanBoard
                todos={todos}
                isLoading={isLoading}
                onTodosChange={setTodos}
                onEdit={(todo) => editDialog.openDialog(todo)}
                onDelete={(todo) => deleteDialog.openDialog(todo)}
            />

            <TodoCreateDialog
                open={createDialog.isOpen}
                onClose={createDialog.closeDialog}
                onConfirm={setNewTodo}
            />

            <TodoEditDialog
                open={editDialog.isOpen}
                todo={editDialog.selectedTodo}
                onClose={editDialog.closeDialog}
                onConfirm={setEditedTodo}
            />

            <TodoDeleteDialog
                open={deleteDialog.isOpen}
                todo={deleteDialog.selectedTodo}
                onClose={deleteDialog.closeDialog}
                onConfirm={deleteTodoFromState}
            />
        </Box>
    );
};

export default TodosPage;
