import { v2 as cloudinary } from "cloudinary";

type UploadFolderType =
  | "users"
  | "chat/images"
  | "chat/videos"
  | "chat/documents"
  | "chat/others";

type ResourceType = "image" | "video" | "raw" | "auto";

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: ResourceType;
}

/**
 * Delete a file from Cloudinary by its public ID
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: string,
): Promise<void> => {
  try {
    console.log("Attempting to delete from Cloudinary:", {
      publicId,
      resourceType,
    });
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("Failed to delete file from Cloudinary:", error);
    // Don't throw error to allow message deletion to proceed even if cloudinary deletion fails
  }
};

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folderName: UploadFolderType,
  resourceType: ResourceType,
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result?.secure_url || !result?.public_id) {
          return reject(new Error("Upload failed: invalid response"));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType,
        });
      },
    );

    stream.end(fileBuffer);
  });
};
