import mongoose from "mongoose";
import { File } from "./fileModel.js";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      trim: true,
    },

    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },

    files: [File],
  },
  {
    collection: "messages",
    timestamps: true,
  },
);

export const Message = mongoose.model("Message", messageSchema);
