import jwt from "jsonwebtoken";

export const createEmailToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};
