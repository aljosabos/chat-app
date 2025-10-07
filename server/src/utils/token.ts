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
  try {
    const decoded = jwt.verify(token, secret);

    if (isUserPayload(decoded)) {
      return decoded;
    }
    return null;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // Token je istekao
      throw new createHttpError.Unauthorized("Access token expired");
    }
    if (err instanceof jwt.JsonWebTokenError) {
      // Token je nevažeći
      throw new createHttpError.Unauthorized("Invalid access token");
    }
    throw err; // fallback
  }
};
const isUserPayload = (
  payload: JwtPayload | string
): payload is IUserPayload => {
  return typeof payload !== "string" && typeof payload.userId === "string";
};
