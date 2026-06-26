import express from "express";
import trimRequest from "trim-request";
import { authMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/").post(trimRequest.all, authMiddleware, upload.single("file"), uploadFile);

export default router;
