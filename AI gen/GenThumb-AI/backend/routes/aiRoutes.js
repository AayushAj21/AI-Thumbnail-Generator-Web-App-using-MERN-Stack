import express from "express";
import { enhancePrompt, generateThumbnail, predictCTR } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// You need to be logged in to use the AI APIs
router.post("/enhance-prompt", protect, enhancePrompt);
router.post("/generate-image", protect, generateThumbnail);
router.post("/predict-ctr", protect, predictCTR);

export default router;
