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
    const { message, files, conversationId } = req.body;

    if (!sender || !conversationId) {
      throw new createHttpError.BadRequest(
        "You must provide sender id and conversation",
      );
    }

    if (!message?.trim() && (!files || files.length === 0)) {
      throw new createHttpError.BadRequest(
        "Message must contain text or at least one file",
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

    const newMessage = await Message.create({
      sender,
      message,
      conversation: conversationId,
      files,
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

    if (!mongoose.Types.ObjectId.isValid(message_id)) {
      throw new createHttpError.BadRequest("Invalid message id");
    }

    const message = await Message.findById(message_id);

    if (!message) {
      throw new createHttpError.NotFound("Message not found");
    }

    if (message.sender?.toString() !== userId) {
      throw new createHttpError.Forbidden(
        "You can only delete your own messages",
      );
    }

    await Message.findByIdAndDelete(message_id);

    res.status(200).json({
      success: true,
      message: "Message deleted",
      messageId: message_id,
    });
  } catch (err) {
    next(err);
  }
};

export const editMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message_id } = req.params;
    const { message: text } = req.body;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(message_id)) {
      throw new createHttpError.BadRequest("Invalid message id");
    }

    if (!text?.trim()) {
      throw new createHttpError.BadRequest("Message text cannot be empty");
    }

    const msg = await Message.findById(message_id);

    if (!msg) {
      throw new createHttpError.NotFound("Message not found");
    }

    if (!msg.sender?.toString()) {
      throw new createHttpError.InternalServerError("Invalid message sender");
    }

    if (msg.sender.toString() !== userId) {
      throw new createHttpError.Forbidden(
        "You can only edit your own messages",
      );
    }

    msg.message = text.trim();

    await msg.save();
    await msg.populate("sender", "name email picture status");

    res.status(200).json(msg);
  } catch (err) {
    next(err);
  }
};
