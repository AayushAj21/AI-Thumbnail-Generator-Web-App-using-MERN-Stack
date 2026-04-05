import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Enhance a basic prompt into a detailed image generation prompt
// @route   POST /api/ai/enhance-prompt
// @access  Private
const enhancePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Please provide a prompt" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const instructions = `You are an expert prompt engineer for AI image generators (like Midjourney, DALL-E). 
    Enhance the following basic prompt for a YouTube thumbnail into a highly detailed, descriptive, and visually striking prompt. 
    Focus on lighting, colors, camera angles, emotions, and overall composition.
    Provide ONLY the enhanced prompt text, without any conversational filler.
    
    Basic Prompt: "${prompt}"`;

    const result = await model.generateContent(instructions);
    const enhancedPrompt = result.response.text().trim();

    res.status(200).json({ originalPrompt: prompt, enhancedPrompt });
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    res.status(500).json({ message: "Failed to enhance prompt. Check API key or limit." });
  }
};

// @desc    Generate Thumbnail Image (Mock/Placeholder for Gemini Image or other DALL-E integrations)
// @route   POST /api/ai/generate-image
// @access  Private
const generateThumbnail = async (req, res) => {
  const { enhancedPrompt } = req.body;

  if (!enhancedPrompt) {
    return res.status(400).json({ message: "Please provide an enhanced prompt" });
  }

  try {
    // Note: Google's free Gemini API doesn't natively expose image *generation* (Imagen 3) to the public generative-ai package without Vertex AI yet.
    // For this B.Tech project, we simulate the text-to-image API call, or you can plug in Hugging Face / DALL-E / fal.ai here.
    
    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For now, return a placeholder image from Unsplash related to the prompt (or mock base64)
    const mockImageUrl = `https://source.unsplash.com/1280x720/?youtube,thumbnail,${encodeURIComponent(enhancedPrompt.split(" ")[0])}`;

    res.status(200).json({
      success: true,
      imageUrl: mockImageUrl,
      message: "Image generated successfully (Using mock for project demo until API connected)" // Update when you have an image API key
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ message: "Failed to generate image" });
  }
};

// @desc    Predict CTR based on visual/text properties (Mock ML Model)
// @route   POST /api/ai/predict-ctr
// @access  Private
const predictCTR = async (req, res) => {
  try {
    // In a real scenario, you would send image base64 to a Python Flask server, or use a pre-trained TF.js model.
    // Here we generate a realistic random score between 4.0% and 12.0% for project simulation.
    const ctrScore = (Math.random() * (12.0 - 4.0) + 4.0).toFixed(1);
    
    res.status(200).json({
      success: true,
      predictedCTR: `${ctrScore}%`,
      suggestions: [
        "Increase text contrast against the background.",
        "Add a more expressive face emotion.",
        "Use complementary color schemes."
      ]
    });
  } catch (error) {
    console.error("Error predicting CTR:", error);
    res.status(500).json({ message: "Failed to predict CTR" });
  }
};

export { enhancePrompt, generateThumbnail, predictCTR };
