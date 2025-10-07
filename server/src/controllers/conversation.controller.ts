import { Request, Response } from "express";

export const openConversation = (req: Request, res: Response) => {
  res.json({ msg: "Conversation test" });
};
