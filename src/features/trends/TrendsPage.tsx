import React from "react";

import { Box, Typography } from "@mui/material";

import YouTubePlayer from "./components/YouTubePlayer.tsx";

const TrendsPage: React.FC = () => {
    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{my:2}}>
                Trends
            </Typography>
            <YouTubePlayer videoId="dQw4w9WgXcQ" />
        </Box>
    );
};

export default TrendsPage;
