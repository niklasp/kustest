import { PlayCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const LazyYoutubeEmbed = ({
  videoId,
  previewImageUrl,
}: {
  videoId: string;
  previewImageUrl: string;
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div
      className={`relative overflow-hidden pb-[56.25%] shadow-lg backdrop-blur-md bg-black`}
      style={{ transition: "padding-bottom 0.5s ease" }}
    >
      {!isVideoLoaded && (
        <Image
          src={previewImageUrl}
          alt="Video Preview"
          className={`absolute cursor-pointer object-cover top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleVideoLoad}
          style={{ aspectRatio: "16 / 9" }}
          width={3000}
          height={1687}
        />
      )}
      {!isVideoLoaded && (
        <PlayCircle
          size={80}
          strokeWidth={1}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleVideoLoad}
        />
      )}
      {isVideoLoaded && (
        <iframe
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        ></iframe>
      )}
    </div>
  );
};

export default LazyYoutubeEmbed;
