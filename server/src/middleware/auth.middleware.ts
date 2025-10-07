import createHttpError from "http-errors";
import { User } from "../models/index.js";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new createHttpError.Unauthorized(
        "No authorization header provided"
      );
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new createHttpError.Unauthorized("No access token provided");
    }

    let decoded;
    try {
      decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      throw new createHttpError.Unauthorized("Invalid or expired access token");
    }

    if (decoded) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new createHttpError.Unauthorized("User not found");
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
