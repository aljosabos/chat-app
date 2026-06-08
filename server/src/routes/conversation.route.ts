import {
  deleteConversation,
  getUserConversations,
  openConversation,
} from "../controllers/conversation.controller.js";
import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, openConversation);
router.route("/").get(trimRequest.all, authMiddleware, getUserConversations);
router.route("/:id").delete(authMiddleware, deleteConversation);

export default router;
