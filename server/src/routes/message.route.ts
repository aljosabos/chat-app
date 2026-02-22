import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, sendMessage);

router
  .route("/:conversation_id")
  .get(trimRequest.all, authMiddleware, getMessages);

export default router;
