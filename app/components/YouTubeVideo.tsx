import React from 'react';

// Props interface for type safety (if using TypeScript)
interface YouTubeVideoProps {
  videoId: string; // YouTube video ID (e.g., '1hEIj3o2Bok')
  width?: string; // Optional width
  height?: string; // Optional height
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  width = '560',
  height = '315',
}) => {
  // Construct the embed URL dynamically
  const embedUrl = `https://www.youtube.com/embed/${videoId}?si=3ENXPREvmdgJNNCn`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideo;