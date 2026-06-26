import { useEffect, useRef, useState } from "react";

export const useVideoThumbnail = (videoUrl: string | null, fileType?: string) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Early return if not a video or no URL
    if (!videoUrl || !fileType?.startsWith("video/")) return;

    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
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
      video.removeEventListener("canplay", onCanPlay);
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
      video.src = "";
      video.load();
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

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setError(true);
          cleanup();
          return;
        }

        // Fill with black background first (transparent videos)
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setThumbnail(imageUrl);
        setError(false);
        cleanup();
      } catch (error) {
        console.error("Error generating video thumbnail:", error);
        setError(true);
        cleanup();
      }
    };

    const onCanPlay = () => {
      if (video.readyState >= 2 && !thumbnail && !error) {
        onLoadedMetadata();
      }
    };

    const onError = (e: Event) => {
      console.error("Video error:", e, (e.target as HTMLVideoElement)?.error);
      setError(true);
      cleanup();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    video.addEventListener("canplay", onCanPlay);

    // Store reference for cleanup on effect re-run
    videoRef.current = video;

    return cleanup;
  }, [videoUrl, fileType, thumbnail, error]);

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
