import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: { type: String },
    type: { type: String },
    name: { type: String },
  },
  { _id: false },
);

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

    files: [fileSchema],
  },
  {
    collection: "messages",
    timestamps: true,
  },
);

export const Message = mongoose.model("Message", messageSchema);
