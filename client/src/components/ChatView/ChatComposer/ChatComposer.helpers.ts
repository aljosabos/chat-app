export const formatMB = (bytes: number) =>
  `${(bytes / (1024 * 1024)).toFixed(0)}MB`;

export const getFileType = (mime: string) => {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "document";
};
