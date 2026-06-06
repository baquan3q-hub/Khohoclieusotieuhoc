import React from 'react';

interface VideoEmbedProps {
  url: string;
  title: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title }) => {
  // Helper to extract YouTube ID
  const getYouTubeId = (urlStr: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = urlStr.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  };

  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
    );
  }

  // Fallback: standard html5 video player if url is a raw video file link
  return (
    <div className="w-full shadow-lg rounded-2xl overflow-hidden border-4 border-white bg-black aspect-video">
      <video
        src={url}
        controls
        preload="metadata"
        className="w-full h-full object-contain"
      >
        Trình duyệt của bạn không hỗ trợ phát video trực tiếp.
      </video>
    </div>
  );
};
export default VideoEmbed;
