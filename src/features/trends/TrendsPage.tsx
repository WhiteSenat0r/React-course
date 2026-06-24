import React, { useState } from "react";

import { Box, Typography, Alert } from "@mui/material";

// Configurable video URL - can be set via environment variable VITE_VIDEO_URL
const VIDEO_URL = import.meta.env.VITE_VIDEO_URL || "https://www.w3schools.com/html/mov_bbb.mp4";

// Video container max width constant
const MAX_VIDEO_WIDTH = '1200px';

const TrendsPage: React.FC = () => {
    const [videoError, setVideoError] = useState(false);

    const handleVideoError = () => {
        setVideoError(true);
    };

    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{my:2}}>
                Trends
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mt: 2
                }}
            >
                {videoError ? (
                    <Alert severity="error" sx={{ maxWidth: MAX_VIDEO_WIDTH, width: '100%' }}>
                        Failed to load video. Please check your network connection or try again later.
                    </Alert>
                ) : (
                    <Box
                        component="video"
                        controls
                        onError={handleVideoError}
                        aria-label="Trends video player"
                        sx={{
                            width: '100%',
                            maxWidth: MAX_VIDEO_WIDTH,
                            height: 'auto'
                        }}
                    >
                        <source src={VIDEO_URL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TrendsPage;
