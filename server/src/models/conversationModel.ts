import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
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

    unreadCounts: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
