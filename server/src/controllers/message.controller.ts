import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import mongoose from "mongoose";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sender = req.user?.userId;
    const { message, conversationId } = req.body;

    const files = req.files as Express.Multer.File[];

    if (!sender || !message || !conversationId) {
      throw new createHttpError.BadRequest(
        "You must provide sender id, message and conversation",
      );
    }

    const conv = await Conversation.findOne({
      _id: conversationId,
      users: sender,
    });

    if (!conv) {
      throw new createHttpError.Forbidden(
        "You are not a member of this conversation",
      );
    }

    const fileUrls = files?.map((file) => file.originalname) || [];

    const newMessage = await Message.create({
      sender,
      message,
      conversation: conversationId,
      files: fileUrls,
    });

    await newMessage.populate([
      { path: "sender", select: "name email picture status" },
    ]);

    // Update last message and increment unread counts for recipients
    const updateData: Record<string, unknown> = {
      lastMessage: newMessage._id,
    };

    // Increment unread count for all users except sender
    conv.users.forEach((user) => {
      const userId = user.toString();
      if (userId !== sender) {
        const currentCount = conv.unreadCounts?.get(userId) || 0;
        updateData[`unreadCounts.${userId}`] = currentCount + 1;
      }
    });

    await Conversation.findByIdAndUpdate(conversationId, updateData);

    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversation_id } = req.params;

    if (!conversation_id) {
      throw new createHttpError.BadRequest("You must provide conversation id");
    }

    if (!mongoose.Types.ObjectId.isValid(conversation_id)) {
      throw new createHttpError.BadRequest("Invalid conversation id");
    }

    const messages = await Message.find({ conversation: conversation_id })
      .sort({ createdAt: 1 })
      .populate("sender", "name email picture status");

    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message_id } = req.params;
    const userId = req.user?.userId;

    if (!message_id) {
      throw new createHttpError.BadRequest("You must provide message id");
    }

    if (!mongoose.Types.ObjectId.isValid(message_id)) {
      throw new createHttpError.BadRequest("Invalid message id");
    }

    const message = await Message.findById(message_id);

    if (!message) {
      throw new createHttpError.NotFound("Message not found");
    }

    // Check if the user is the sender of the message
    if (!message.sender || message.sender.toString() !== userId) {
      throw new createHttpError.Forbidden(
        "You can only delete your own messages",
      );
    }

    await Message.findByIdAndDelete(message_id);

    res.json({ message: "Message deleted successfully", messageId: message_id });
  } catch (err) {
    next(err);
  }
};
