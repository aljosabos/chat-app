import mongoose from "mongoose";

export type FileType = {
  url: string;
  publicId: string;
  type?: string;
  name?: string;
};

export const File = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, required: true },
    type: { type: String },
    name: { type: String },
  },
  { _id: false },
);
