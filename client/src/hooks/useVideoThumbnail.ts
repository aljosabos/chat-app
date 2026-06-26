import { useEffect, useRef, useState } from "react";

export const useVideoThumbnail = (videoUrl: string | null) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    // Attach to DOM to ensure proper loading
    video.style.position = "absolute";
    video.style.visibility = "hidden";
    video.style.top = "-9999px";
    document.body.appendChild(video);

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
      video.src = "";
    };

    const onLoadedMetadata = () => {
      // Set dimensions first
      if (video.videoWidth && video.videoHeight) {
        // Seek to a small time to get the first frame
        video.currentTime = 0.1;
      }
    };

    const onSeeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 240;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          cleanup();
          return;
        }

        // Fill with black background first (transparent videos)
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setThumbnail(imageUrl);
        cleanup();
      } catch (error) {
        console.error("Error generating video thumbnail:", error);
        cleanup();
      }
    };

    const onError = (e: Event) => {
      console.error("Video error:", e);
      cleanup();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);

    // Store reference for cleanup on effect re-run
    videoRef.current = video;

    return cleanup;
  }, [videoUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
      }
    };
  }, []);

  return thumbnail;
};
