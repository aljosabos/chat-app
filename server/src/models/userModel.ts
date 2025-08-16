import mongoose, { CallbackError } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
      default:
        "https://res.cloudinary.com/deidpvd0b/image/upload/v1755332966/default_user_c2flai.png",
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

// hashing the password before the user is saved (register);
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

export const User = mongoose.model("User", userSchema);
