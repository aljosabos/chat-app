import { generateToken, verifyToken } from "../utils/token.js";
import { User } from "../models/index.js";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { v2 as cloudinary } from "cloudinary";
import { Resend } from "resend";

const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "users" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || "");
      },
    );
    stream.end(fileBuffer);
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      userData.picture = imageUrl;
    }

    const newUser = await User.create(userData);

    const emailToken = generateToken(
      { userId: newUser._id.toString() },
      "1d",
      process.env.EMAIL_TOKEN_SECRET!,
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

    console.log("Verification Link:", verificationLink);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "noreply@verify.chatlogin.org",
      to: newUser.email,
      subject: "Verify your email",
      html: `
    <h2>Welcome ${newUser.name}</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}">
      Verify Email
    </a>
  `,
    });

    res.json({
      message: "Check your email to verify account",
      user: {
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        isVerified: newUser.isVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // 1. VALIDATION
    if (!email || !password) {
      throw new createHttpError.BadRequest("Email and password are required");
    }

    // 2. FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      throw new createHttpError.NotFound("User with this email does not exist");
    }

    // 3. EMAIL VERIFICATION CHECK
    if (!user.isVerified) {
      throw new createHttpError.Unauthorized(
        "Please verify your email before logging in",
      );
    }

    // 4. PASSWORD CHECK
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new createHttpError.Unauthorized("Incorrect password");
    }

    // 5. GENERATE TOKENS
    const payload = { userId: user._id.toString() };

    const accessToken = generateToken(
      payload,
      "1d",
      process.env.ACCESS_TOKEN_SECRET!,
    );

    const refreshToken = generateToken(
      payload,
      "30d",
      process.env.REFRESH_TOKEN_SECRET!,
    );

    // 6. SET COOKIE
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // 7. RESPONSE
    res.json({
      message: "login success.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new createHttpError.Unauthorized("Please login");

    // data of the user based on refresh token
    const decoded = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    );

    if (!decoded) throw new createHttpError.Unauthorized("Please login");

    const user = await User.findById({ _id: decoded.userId });

    if (!user) throw new createHttpError.Unauthorized("No user found");

    // generate new access token
    const payload = { userId: user._id.toString() };

    const accessToken = generateToken(
      payload,
      "1d",
      process.env.ACCESS_TOKEN_SECRET!,
    );

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

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.params;

    const decoded = verifyToken(token, process.env.EMAIL_TOKEN_SECRET!);

    if (!decoded) {
      throw new createHttpError.Unauthorized("Invalid or expired token");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new createHttpError.NotFound("User not found");
    }

    if (user.isVerified) {
      res.json({ message: "Email already verified" });
      return;
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
    return;
  } catch (err) {
    next(err);
  }
};
