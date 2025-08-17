import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";

export interface IUserPayload {
  userId: string;
}

export const generateToken = (
  payload: IUserPayload,
  expiresIn: StringValue,
  secret: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};

export const verifyToken = (
  token: string,
  secret: string
): IUserPayload | null => {
  const decoded = jwt.verify(token, secret);

  if (isUserPayload(decoded)) {
    return decoded;
  } else {
    return null;
  }
};

const isUserPayload = (
  payload: JwtPayload | string
): payload is IUserPayload => {
  return typeof payload !== "string" && typeof payload.userId === "string";
};
