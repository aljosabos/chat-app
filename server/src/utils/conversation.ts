import createHttpError from "http-errors";
import { Conversation } from "../models/conversationModel.js";
import { User } from "../models/userModel.js";

export const findConversation = async (
  receiver_id: string,
  sender_id?: string
) => {
  let conversation = await Conversation.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");

  if (!conversation) throw createHttpError.BadRequest("No conversation found");

  // conversation = await User.populate(conversation, {
  //   path: "lastMessage.sender",
  //   select: "name email picture status",
  // });

  return conversation[0];
};
