import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Score ||
  mongoose.model("Score", ScoreSchema, "scores");
