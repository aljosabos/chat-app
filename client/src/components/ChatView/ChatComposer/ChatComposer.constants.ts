import type { AttachmentType } from "./ChatComposer.types";

export const acceptMap: Record<Exclude<AttachmentType, null>, string> = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/svg+xml",
  video: "video/mp4,video/quicktime,video/webm",
  document: ".pdf,.doc,.docx,.txt,.csv,.zip",
};

export const maxSizeMap: Record<Exclude<AttachmentType, null>, number> = {
  image: 5 * 1024 * 1024,
  video: 50 * 1024 * 1024,
  document: 10 * 1024 * 1024,
};
