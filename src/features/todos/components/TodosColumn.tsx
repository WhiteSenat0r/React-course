import React from "react";
import {Box, Paper, Typography} from "@mui/material";
import {Droppable} from "@hello-pangea/dnd";
import {ITodo} from "../interfaces/iTodo.ts";
import {ITodoStatus} from "../interfaces/iTodoStatus.ts";
import TodoCard from "./TodoCard.tsx";

interface TodosColumnProps {
    status: ITodoStatus;
    title: string;
    todos: ITodo[];
    onEdit: (todo: ITodo) => void;
    onDelete: (todo: ITodo) => void;
}

const TodosColumn: React.FC<TodosColumnProps> = ({status, title, todos, onEdit, onDelete}) => {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                minWidth: 300,
                backgroundColor: '#f5f5f5',
                height: 'fit-content',
                minHeight: 400,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        borderRadius: '12px',
                        px: 1.5,
                        py: 0.5,
                        fontWeight: 'bold',
                    }}
                >
                    {todos.length}
                </Typography>
            </Box>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            minHeight: 200,
                            backgroundColor: snapshot.isDraggingOver ? '#e8eaf6' : 'transparent',
                            borderRadius: 1,
                            p: 1,
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        {todos.map((todo, index) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                index={index}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Paper>
    );
};

export default TodosColumn;
