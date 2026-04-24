import React from "react";
import { Box } from "@mui/material";

interface IYouTubePlayerProps {
    videoId: string;
}

const isValidYouTubeVideoId = (id: string): boolean => {
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
};

const YouTubePlayer: React.FC<IYouTubePlayerProps> = React.memo(({ videoId }) => {
    if (!videoId || !isValidYouTubeVideoId(videoId)) {
        throw new Error(`Invalid YouTube video ID: ${videoId}. Expected 11 alphanumeric characters.`);
    }

    return (
        <Box
            sx={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                backgroundColor: '#000',
            }}
        >
            <Box
                component="iframe"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                }}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            />
        </Box>
    );
});

YouTubePlayer.displayName = 'YouTubePlayer';

export default YouTubePlayer;
