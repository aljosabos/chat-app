import { NextFunction, Request, Response } from "express";
import { logger } from "../configs/logger.js";
import createHttpError from "http-errors";
import { findConversation } from "../utils/conversation.js";
import { User } from "../models/userModel.js";
import { Conversation } from "../models/conversationModel.js";

export const openConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender_id = req?.user?.userId;
    const receiver_id = req.body.receiver_id;

    // check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "Please provide the user id you wanna start a conversation with!"
      );

      throw createHttpError.BadGateway("No receiver id found!");
    }

    // check if conversation exists
    const existing_conversation = await findConversation(
      receiver_id,
      sender_id
    );

    if (existing_conversation) {
      res.json({ existing_conversation });
    } else {
      // we need to create new conversation
      const receiver_user = await User.findById(receiver_id);

      const data = {
        name: receiver_user?.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const new_conversation = await Conversation.create(data);

      await new_conversation.populate([
        { path: "users", select: "-password" },
        { path: "lastMessage" },
      ]);

      res.json({ new_conversation });
    }
  } catch (error) {
    next(error);
  }
};
