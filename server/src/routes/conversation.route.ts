import {
  deleteConversation,
  getUserConversations,
  openConversation,
  markAsRead,
} from "../controllers/conversation.controller.js";
import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, openConversation);
router.route("/").get(trimRequest.all, authMiddleware, getUserConversations);
router.route("/:id").delete(authMiddleware, deleteConversation);
router.route("/:id/mark-read").post(trimRequest.all, authMiddleware, markAsRead);

export default router;
