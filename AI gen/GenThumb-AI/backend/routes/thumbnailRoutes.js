import express from "express";
import { createThumbnailRecord, getUserThumbnails, deleteThumbnail } from "../controllers/thumbnailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, createThumbnailRecord);
router.get("/history", protect, getUserThumbnails);
router.delete("/:id", protect, deleteThumbnail);

export default router;
