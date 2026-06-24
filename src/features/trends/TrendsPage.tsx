import React from "react";

import { Box, Typography } from "@mui/material";

// Configurable video URL - update this with the actual external video URL
const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

const TrendsPage: React.FC = () => {
    return (
        <Box>
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{my:2}}>
                Trends
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <video
                    controls
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
        </Box>
    );
};

export default TrendsPage;
