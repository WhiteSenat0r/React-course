import React, {useMemo} from "react";
import {Box, CircularProgress} from "@mui/material";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {ITodo} from "../interfaces/iTodo.ts";
import {ITodoStatus} from "../interfaces/iTodoStatus.ts";
import TodosColumn from "./TodosColumn.tsx";
import {useEditTodo} from "../hooks/useEditTodo.ts";
import {useNotifications} from "@toolpad/core";

interface TodosKanbanBoardProps {
    todos: ITodo[];
    isLoading: boolean;
    onTodosChange: (todos: ITodo[]) => void;
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
}

const TodosKanbanBoard: React.FC<TodosKanbanBoardProps> = ({
    todos,
    isLoading,
    onTodosChange,
    onEdit,
    onDelete
}) => {
    const handleEditTodo = useEditTodo();
    const notifications = useNotifications();

    // Group todos by status
    const todosByStatus = useMemo(() => {
        return {
            [ITodoStatus.TODO]: todos.filter(t => t.status === ITodoStatus.TODO),
            [ITodoStatus.IN_PROGRESS]: todos.filter(t => t.status === ITodoStatus.IN_PROGRESS),
            [ITodoStatus.DONE]: todos.filter(t => t.status === ITodoStatus.DONE),
        };
    }, [todos]);

    const handleDragEnd = async (result: DropResult) => {
        const {source, destination, draggableId} = result;

        // Dropped outside a valid droppable
        if (!destination) {
            return;
        }

        // Dropped in the same position
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceStatus = source.droppableId as ITodoStatus;
        const destStatus = destination.droppableId as ITodoStatus;

        // Create new arrays for source and destination columns
        const sourceTodos = Array.from(todosByStatus[sourceStatus]);
        const destTodos = sourceStatus === destStatus
            ? sourceTodos
            : Array.from(todosByStatus[destStatus]);

        // Remove from source
        const [movedTodo] = sourceTodos.splice(source.index, 1);

        // Update todo status if moved to different column
        const updatedTodo = sourceStatus !== destStatus
            ? {...movedTodo, status: destStatus}
            : movedTodo;

        // Add to destination
        destTodos.splice(destination.index, 0, updatedTodo);

        // Create updated todos array
        const updatedTodos = todos.map(todo => {
            if (todo.id === draggableId) {
                return updatedTodo;
            }
            return todo;
        });

        // Optimistically update UI
        onTodosChange(updatedTodos);

        // Persist to backend if status changed
        if (sourceStatus !== destStatus) {
            const result = await handleEditTodo(draggableId, {status: destStatus});

            if (!result) {
                // Revert on failure
                onTodosChange(todos);
                notifications.show('Error moving task. Please try again.', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            }
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Box
                display="flex"
                gap={3}
                sx={{
                    overflowX: 'auto',
                    pb: 2,
                }}
            >
                <TodosColumn
                    status={ITodoStatus.TODO}
                    title="To Do"
                    todos={todosByStatus[ITodoStatus.TODO]}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                <TodosColumn
                    status={ITodoStatus.IN_PROGRESS}
                    title="In Progress"
                    todos={todosByStatus[ITodoStatus.IN_PROGRESS]}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                <TodosColumn
                    status={ITodoStatus.DONE}
                    title="Done"
                    todos={todosByStatus[ITodoStatus.DONE]}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Box>
        </DragDropContext>
    );
};

export default TodosKanbanBoard;
