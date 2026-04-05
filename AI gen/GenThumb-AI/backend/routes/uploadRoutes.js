import express from "express";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Upload an image file to Cloudinary
// @route   POST /api/upload
// @access  Private
router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  // req.file.path contains the Cloudinary URL
  res.status(200).json({
    message: "Image uploaded successfully",
    imageUrl: req.file.path,
  });
});

export default router;
