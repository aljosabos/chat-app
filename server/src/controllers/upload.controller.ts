import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/upload.js";

const RESOURCE_TYPE_MAP = {
  image: "image",
  video: "video",
} as const;

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: "No file provided",
      });
      return;
    }

    const folderName = getFolderName(req.file.mimetype);
    const resourceType = getResourceType(req.file);

    const fileUrl = await uploadToCloudinary(
      req.file.buffer,
      folderName,
      resourceType,
    );

    res.json({
      url: fileUrl,
    });
    return;
  } catch (err) {
    next(err);
  }
};

const getFolderName = (mime: string) => {
  if (mime.startsWith("image/")) return "chat/images";
  if (mime.startsWith("video/")) return "chat/videos";
  if (mime === "application/pdf") return "chat/documents";
  return "chat/others";
};

const getResourceType = (
  file: Express.Multer.File,
): "image" | "video" | "raw" => {
  const prefix = file.mimetype.split("/")[0] as keyof typeof RESOURCE_TYPE_MAP;

  return RESOURCE_TYPE_MAP[prefix] ?? "raw";
};
