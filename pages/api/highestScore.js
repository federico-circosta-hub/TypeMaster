import dbConnect from "../../lib/mongodb";
import { getHighestScoresWithUserDetails } from "./services/scoreService";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const scores = await getHighestScoresWithUserDetails();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: "Error fetching scores" });
  }
}
