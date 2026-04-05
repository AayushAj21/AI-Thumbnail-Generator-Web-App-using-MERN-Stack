import mongoose from "mongoose";

const thumbnailSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    prompt: {
      type: String,
      required: true,
    },
    enhancedPrompt: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    style: {
      type: String,
    },
    ctrPrediction: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["generating", "completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

export default Thumbnail;
