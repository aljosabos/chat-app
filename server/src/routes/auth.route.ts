import { registerUserValidator } from "../validators/authValidator.js";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import express from "express";
import trimRequest from "trim-request";

const router = express.Router();

router
  .route("/register")
  .post(trimRequest.all, ...registerUserValidator, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);

export default router;
