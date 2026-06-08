import { NextFunction, Request, Response } from "express";
import { logger } from "../configs/logger.js";
import createHttpError from "http-errors";
import { findConversation } from "../utils/conversation.js";
import { Conversation } from "../models/conversationModel.js";

// Get conversation between two users if found, or create a new one if its not found
export const openConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sender_id = req?.user?.userId;
    const receiver_id = req.body.receiver_id;

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
      res.json({ ...parsed_conversation });
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

      res.json({ ...parsed_conversation });
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

    const conversations = await Conversation.find({
      users: { $elemMatch: { $eq: userId } },
    }).populate([
      { path: "users", select: "-password" },
      {
        path: "lastMessage",
      },
    ]);

    res.json({ conversations });
  } catch (err) {
    next(err);
  }
};
