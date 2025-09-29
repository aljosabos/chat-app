import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversation is required."],
    },

    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
