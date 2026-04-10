import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel.js";
import { logger } from "../configs/logger.js";
import createHttpError from "http-errors";

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string;

    if (!search) {
      logger.error("You must provide search query");
      throw new createHttpError.BadGateway("No search query found");
    }

    const currentUserId = req.user?.userId;

    //search for all the users except the current logged in user
    const users = await User.find({
      _id: { $ne: currentUserId },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(10);

    res.json(users);
  } catch (err) {
    next(err);
  }
};
