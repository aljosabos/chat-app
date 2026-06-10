import { NextFunction, Request, Response } from "express";
import { logger } from "../configs/logger.js";
import createHttpError from "http-errors";
import { findConversation } from "../utils/conversation.js";
import { Conversation } from "../models/conversationModel.js";
import mongoose from "mongoose";

// Get conversation between two users if found, or create a new one if its not found
export const openConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sender_id = req.user?.userId;
    const receiver_id = req.body.receiver_id;

    if (!sender_id) {
      throw createHttpError.Unauthorized("User not authenticated");
    }

    // check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "Please provide the user id you wanna start a conversation with!",
      );

      throw createHttpError.BadGateway("No receiver id found!");
    }

    // check if conversation exists
    const existing_conversation = await findConversation(
      receiver_id,
      sender_id,
    );

    if (existing_conversation) {
      const parsed_conversation = existing_conversation.toObject();
      const unreadCount =
        parsed_conversation.unreadCounts?.get(sender_id.toString()) || 0;
      res.json({ ...parsed_conversation, unreadCount });
    } else {
      const data = {
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const new_conversation = await Conversation.create(data);

      await new_conversation.populate([
        { path: "users", select: "-password" },
        { path: "lastMessage" },
      ]);

      const parsed_conversation = new_conversation.toObject();
      const unreadCount =
        parsed_conversation.unreadCounts?.get(sender_id.toString()) || 0;

      res.json({ ...parsed_conversation, unreadCount });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const conversationId = req.params.id;

    await Conversation.findByIdAndDelete(conversationId);

    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all conversations from a specific user
export const getUserConversations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw createHttpError.Unauthorized("User not authenticated");
    }

    const conversations = await Conversation.find({
      users: { $elemMatch: { $eq: userId } },
    }).populate([
      { path: "users", select: "-password" },
      {
        path: "lastMessage",
      },
    ]);

    // Add unreadCount for the current user to each conversation
    const conversationsWithUnread = conversations.map((conv) => {
      const convObj = conv.toObject();
      const unreadCount = convObj.unreadCounts?.get(userId.toString()) || 0;
      return {
        ...convObj,
        unreadCount,
      };
    });

    res.json({ conversations: conversationsWithUnread });
  } catch (err) {
    next(err);
  }
};

// Mark all messages in conversation as read for current user
export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const conversationId = req.params.id;

    if (!userId) {
      throw createHttpError.Unauthorized("User not authenticated");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      throw createHttpError.NotFound("Conversation not found");
    }

    // Check if user is part of the conversation
    if (!conversation.users.includes(new mongoose.Types.ObjectId(userId))) {
      throw createHttpError.Forbidden(
        "You are not a member of this conversation",
      );
    }

    // Reset unread count for this user
    conversation.unreadCounts.set(userId, 0);
    await conversation.save();

    res.json({ unreadCount: 0 });
  } catch (error) {
    next(error);
  }
};
