import dbConnect from "../../../lib/mongodb";
import { getHighestScoresWithUserDetails } from "../services/scoreService";

export async function GET() {
  await dbConnect();
  try {
    const scores = await getHighestScoresWithUserDetails();
    return new Response(JSON.stringify(scores), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching scores" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
