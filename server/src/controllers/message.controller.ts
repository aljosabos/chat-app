import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";
import mongoose from "mongoose";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender = req.user?.userId;
    const { message, conversationId } = req.body;

    const files = req.files as Express.Multer.File[];

    if (!sender || !message || !conversationId) {
      throw new createHttpError.BadRequest(
        "You must provide sender id, message and conversation"
      );
    }

    const conv = await Conversation.findOne({
      _id: conversationId,
      users: sender,
    });

    if (!conv) {
      throw new createHttpError.Forbidden(
        "You are not a member of this conversation"
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

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
    });

    res.status(201).json(newMessage);
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
