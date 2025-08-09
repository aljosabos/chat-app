import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    picture: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Hey there i am using chat app",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      maxLength: [128, "Password must be less than 128 characters long"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export const User = mongoose.model("UserModel", userSchema);
