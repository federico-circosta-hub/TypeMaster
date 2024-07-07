import dbConnect from "../../lib/mongodb";
import User from "../../app/models/User";
import Score from "../../app/models/Score";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  await dbConnect();
  verifyToken(req, res, async () => {
    switch (req.method) {
      case "GET":
        if (!req.user?.userId)
          return res.status(401).json({ error: "User not found" });
        const scores = await Score.find({ userId: req.user.userId });
        return res.status(200).json(scores);
      case "POST":
        const { userId, score } = req.body;
        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser)
          return res.status(401).json({ error: "User not found" });
        const newScore = new Score({ userId, score });
        try {
          await newScore.save();
          return res.status(201).json(newScore);
        } catch (error) {
          return res.status(500).json({ error: "Failed to save score" });
        }

      default:
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  });
}
