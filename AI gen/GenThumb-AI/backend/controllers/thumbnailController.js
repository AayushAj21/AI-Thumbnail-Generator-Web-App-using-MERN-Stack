// import Thumbnail from "../models/Thumbnail.js";
// import axios from "axios";
// import { cloudinary } from "../config/cloudinary.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Generate thumbnail
// const createThumbnailRecord = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt || prompt.trim() === "") {
//       return res.status(400).json({ message: "Please provide a prompt" });
//     }

//     // Step 1: Enhance the prompt using Gemini AI
//     let enhancedPrompt;
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//       const instructions = `You are an expert prompt engineer for AI image generators (like Midjourney, DALL-E). 
//       Enhance the following basic prompt for a YouTube thumbnail into a highly detailed, descriptive, and visually striking prompt. 
//       Focus on lighting, colors, camera angles, emotions, and overall composition.
//       Provide ONLY the enhanced prompt text, without any conversational filler.
      
//       Basic Prompt: "${prompt}"`;

//       const result = await model.generateContent(instructions);
//       enhancedPrompt = result.response.text().trim();
//     } catch (geminiError) {
//       console.error("Gemini enhancement error:", geminiError);
//       return res.status(500).json({ 
//         message: "Failed to enhance prompt with AI. Check API key or rate limits.",
//         error: geminiError.message 
//       });
//     }

//     // Step 2: Generate image from enhanced prompt
//     let imageUrl;
//     try {
//       imageUrl = "https://image.pollinations.ai/prompt/" + 
//                  encodeURIComponent(enhancedPrompt);

//       // Validate the image URL is accessible
//       const headResponse = await axios.head(imageUrl, { timeout: 5000 });
//       if (headResponse.status !== 200) {
//         throw new Error("Image generation service returned invalid response");
//       }
//     } catch (imageError) {
//       console.error("Image generation URL error:", imageError.message);
//       return res.status(500).json({ 
//         message: "Failed to generate image. The image service may be unavailable.",
//         error: imageError.message 
//       });
//     }

//     // Step 3: Upload to Cloudinary
//     let uploadResult;
//     try {
//       uploadResult = await cloudinary.uploader.upload(imageUrl, {
//         folder: "GenThumb-AI",
//         resource_type: "auto",
//         timeout: 60000,
//       });
//     } catch (cloudinaryError) {
//       console.error("Cloudinary upload error:", cloudinaryError);
//       return res.status(500).json({ 
//         message: "Failed to upload image to cloud storage. Check Cloudinary credentials.",
//         error: cloudinaryError.message 
//       });
//     }

//     // Step 4: Save thumbnail record to database
//     const thumbnail = await Thumbnail.create({
//       userId: req.user._id,
//       prompt,
//       enhancedPrompt,
//       imageUrl: uploadResult.secure_url,
//       style: "AI Generated",
//       status: "completed",
//     });

//     res.status(201).json(thumbnail);

//   } catch (error) {
//     console.error("Thumbnail generation error:", error);
//     res.status(500).json({ 
//       message: "Thumbnail generation failed",
//       error: error.message 
//     });
//   }
// };


// // Get user's thumbnails
// const getUserThumbnails = async (req, res) => {
//   try {
//     const thumbnails = await Thumbnail
//       .find({ userId: req.user._id })
//       .sort({ createdAt: -1 });

//     res.status(200).json(thumbnails);

//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch thumbnails" });
//   }
// };


// // Delete thumbnail
// const deleteThumbnail = async (req, res) => {
//   try {

//     const thumbnail = await Thumbnail.findById(req.params.id);

//     if (!thumbnail) {
//       return res.status(404).json({ message: "Thumbnail not found" });
//     }

//     if (thumbnail.userId.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     await thumbnail.deleteOne();

//     res.status(200).json({ message: "Thumbnail deleted" });

//   } catch (error) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// };


// export { createThumbnailRecord, getUserThumbnails, deleteThumbnail };




























import Thumbnail from "../models/Thumbnail.js";
import axios from "axios";
import { cloudinary } from "../config/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate thumbnail
const createThumbnailRecord = async (req, res) => {
  try {

    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ message: "Please provide a prompt" });
    }

    // STEP 1 — Enhance prompt using Gemini
    let enhancedPrompt;

    try {

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

      const instructions = `
You are an expert prompt engineer for AI image generators.

Convert the following prompt into a powerful YouTube thumbnail image prompt.

Focus on:
- cinematic lighting
- vibrant colors
- high emotion
- youtube style composition
- dramatic background

Return ONLY the improved prompt.

Prompt: ${prompt}
`;

      const result = await model.generateContent(instructions);

      enhancedPrompt = result.response.text().trim();

    } catch (geminiError) {

      console.log("Gemini failed, using fallback prompt");

      enhancedPrompt =
        "viral youtube thumbnail, cinematic lighting, vibrant colors: " + prompt;

    }


    // STEP 2 & 3 & 4 — Generate 4 variations in parallel
    const variationsCount = 4;
    const variationsIndices = Array.from({ length: variationsCount }, (_, i) => i);

    const thumbnailPromises = variationsIndices.map(async (index) => {
      // Step 2 — Generate image using Pollinations with a unique seed
      let imageBuffer;
      const seed = Math.floor(Math.random() * 1000000);
      try {
        const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          enhancedPrompt
        )}?width=1280&height=720&seed=${seed}&nologo=true`;

        const response = await axios.get(pollinationUrl, {
          responseType: "arraybuffer",
          timeout: 20000
        });

        imageBuffer = Buffer.from(response.data, "binary");
      } catch (error) {
        console.log(`Pollinations AI variation ${index} failed, using fallback image`);
        const fallback = await axios.get(
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
          { responseType: "arraybuffer" }
        );
        imageBuffer = Buffer.from(fallback.data, "binary");
      }

      // Step 3 — Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "GenThumb-AI",
            resource_type: "image"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(imageBuffer);
      });

      // Step 4 — Save in MongoDB
      // Generate a random CTR prediction for each variation
      const ctrPrediction = (Math.random() * (12 - 5) + 5).toFixed(1);

      return await Thumbnail.create({
        userId: req.user._id,
        prompt,
        enhancedPrompt,
        imageUrl: uploadResult.secure_url,
        style: "AI Generated",
        ctrPrediction,
        status: "completed"
      });
    });

    const thumbnails = await Promise.all(thumbnailPromises);

    res.status(201).json(thumbnails);

  } catch (error) {

    console.error("Thumbnail generation error:", error);

    res.status(500).json({
      message: "Thumbnail generation failed",
      error: error.message
    });

  }
};


// Get user's thumbnails
const getUserThumbnails = async (req, res) => {
  try {

    const thumbnails = await Thumbnail
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(thumbnails);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch thumbnails" });

  }
};


// Delete thumbnail
const deleteThumbnail = async (req, res) => {
  try {

    const thumbnail = await Thumbnail.findById(req.params.id);

    if (!thumbnail) {
      return res.status(404).json({ message: "Thumbnail not found" });
    }

    if (thumbnail.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await thumbnail.deleteOne();

    res.status(200).json({ message: "Thumbnail deleted" });

  } catch (error) {

    res.status(500).json({ message: "Delete failed" });

  }
};

export { createThumbnailRecord, getUserThumbnails, deleteThumbnail };