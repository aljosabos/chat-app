import { body } from "express-validator";
import { validator } from "./validator.js";
import { User } from "../models/index.js";
import createHttpError from "http-errors";

export const registerUserValidator = validator([
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format")
    .bail()
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new createHttpError.Conflict(
          "The user with this email already exists"
        );
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 3, max: 10 })
    .withMessage("Password must be between 3 and 10 characters long"),
  body("status")
    .optional()
    .trim()
    .isLength({ max: 64 })
    .withMessage("Status must be maximum 64 characters long"),
]);
