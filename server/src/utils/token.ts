import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

interface IUserPayload {
  userId: string;
}

export const generateToken = (
  payload: IUserPayload,
  expiresIn: StringValue,
  secret: string
) => {
  let token = jwt.sign(payload, secret, { expiresIn });

  return token;
};
