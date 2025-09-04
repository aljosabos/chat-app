import { registerUserValidator } from "../validators/authValidator.js";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import express from "express";
import trimRequest from "trim-request";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route("/register")
  .post(upload.single("picture"), ...registerUserValidator, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);

export default router;
