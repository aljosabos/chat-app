import mongoose from "mongoose";

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

    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
