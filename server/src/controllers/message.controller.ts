import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { logger } from "../configs/logger.js";
import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender = req.user?.userId;
    const { message, conversation, files } = req.body;

    if (!sender || !message || !conversation) {
      throw new createHttpError.BadRequest(
        "You must provide sender id, message and conversation"
      );
    }

    // check does user belong to conversation
    const conv = await Conversation.findOne({
      _id: conversation,
      users: sender,
    });

    if (!conv) {
      throw new createHttpError.Forbidden(
        "You are not a member of this conversation"
      );
    }

    const newMessage = await Message.create({
      sender,
      message,
      conversation,
      files: files || [],
    });

    await newMessage.populate([
      { path: "sender", select: "name email picture status" },
    ]);

    // update lastMessage
    await Conversation.findByIdAndUpdate(conversation, {
      lastMessage: newMessage._id,
    });

    res.status(201).json({ msg: newMessage });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ msg: "Get messages" });
  } catch (err) {
    next(err);
  }
};
