import { body } from "express-validator";
import { validator } from "./validator.js";
import { User } from "../models/index.js";
import createHttpError from "http-errors";

export const registerUserValidator = validator([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 16 })
    .withMessage("Name must be between 2 and 16 characters long"),

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

  // picture validator: proverava req.file, ne body
  // body("picture").custom((_, { req }) => {
  //   const file = req.file;
  //   if (!file) return true; // opcionalno
  //   const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
  //   if (!allowedMimes.includes(file.mimetype)) {
  //     throw new createHttpError.BadRequest("Picture must be JPEG/PNG/WEBP");
  //   }
  //   if (file.size > 5 * 1024 * 1024) {
  //     throw new createHttpError.BadRequest("Picture must be smaller than 5MB");
  //   }
  //   return true;
  // }),

  body("picture").custom((_, { req }) => {
    const file = req.file;
    if (!file) return true; // opcionalno
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new createHttpError.BadRequest("Picture must be JPEG/PNG/WEBP");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new createHttpError.BadRequest("Picture must be smaller than 5MB");
    }
    return true;
  }),
]);
