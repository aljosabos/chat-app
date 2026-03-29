import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { searchUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, searchUsers);

export default router;
