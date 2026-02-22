import { NextFunction, Request, Response } from "express";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ msg: "Send message" });
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
