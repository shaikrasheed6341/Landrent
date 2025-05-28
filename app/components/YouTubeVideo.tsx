import React from 'react';


interface YouTubeVideoProps {
  videoId: string;
  width?: string; 
  height?: string; 
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