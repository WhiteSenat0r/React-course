import React from "react";
import { Box, Typography } from "@mui/material";
import TodoBoard from "./components/TodoBoard.tsx";

const TodosPage: React.FC = () => {
    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ my: 2 }}>
                To-Do Board
            </Typography>
            <TodoBoard />
        </Box>
    );
};

export default TodosPage;
