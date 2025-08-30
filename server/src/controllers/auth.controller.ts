import { generateToken, verifyToken } from "../utils/token.js";
import { User } from "../models/index.js";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create({ ...req.body });

    const tokenPayload = { userId: newUser._id.toString() };

    const accessToken = generateToken(
      tokenPayload,
      "1d",
      process.env.ACCESS_TOKEN_SECRET!
    );

    const refreshToken = generateToken(
      tokenPayload,
      "30d",
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    console.table({ accessToken, refreshToken });

    res.json({
      message: "register success.",
      user: {
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new createHttpError.BadRequest("Email and password are required");

    const user = await User.findOne({ email }).lean();

    if (!user)
      throw new createHttpError.NotFound("User with this email does not exist");

    // check is password correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new createHttpError.Unauthorized("Incorrect password");

    // generate tokens for logged user
    const payload = { userId: user._id.toString() };

    const accessToken = generateToken(
      payload,
      "1d",
      process.env.ACCESS_TOKEN_SECRET!
    );

    const refreshToken = generateToken(
      payload,
      "30d",
      process.env.REFRESH_TOKEN_SECRET!
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "login success.",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/v1/auth/refreshToken" });
    res.json({ msg: "logout user" });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new createHttpError.Unauthorized("Please login");

    // data of the user based on refresh token
    const decoded = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    if (!decoded) throw new createHttpError.Unauthorized("Please login");

    const user = await User.findById({ _id: decoded.userId });

    if (!user) throw new createHttpError.Unauthorized("No user found");

    // generate new access token
    const payload = { userId: user._id.toString() };

    const accessToken = generateToken(
      payload,
      "1d",
      process.env.ACCESS_TOKEN_SECRET!
    );

    console.log(user);

    res.json({
      message: "new access token generated.",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
};
