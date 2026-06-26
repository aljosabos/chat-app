import { v2 as cloudinary } from "cloudinary";

type UploadFolderType =
  | "users"
  | "chat/images"
  | "chat/videos"
  | "chat/documents"
  | "chat/others";

type ResourceType = "image" | "video" | "raw";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folderName: UploadFolderType,
  resourceType: ResourceType,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result?.secure_url ?? "");
      },
    );

    stream.end(fileBuffer);
  });
};
