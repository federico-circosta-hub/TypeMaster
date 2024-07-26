// app/api/personalScore/route.js
import dbConnect from "../../../lib/mongodb";
import User from "../../../app/models/User";
import Score from "../../../app/models/Score";
import jwt from "jsonwebtoken";
import { getPersonalScoresWithDateSorting } from "../services/scoreService";

// Funzione per verificare il token
async function verifyToken(request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return { error: "Token not found" };
  }

  try {
    const user = jwt.verify(token, process.env.secretKey);
    return { user };
  } catch (err) {
    return { error: "Invalid token" };
  }
}

// Funzione per gestire le richieste GET
async function handleGetRequest(request) {
  const authResult = await verifyToken(request);
  if (authResult.error) {
    return new Response(JSON.stringify({ error: authResult.error }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  try {
    const scores = await getPersonalScoresWithDateSorting(
      authResult.user.userId
    );
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

// Funzione per gestire le richieste POST
async function handlePostRequest(request) {
  const authResult = await verifyToken(request);
  if (authResult.error) {
    return new Response(JSON.stringify({ error: authResult.error }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  const { userId, score } = await request.json();

  if (!userId || !score) {
    return new Response(
      JSON.stringify({ error: "No userId nor score provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const existingUser = await User.findOne({ _id: userId });
  if (!existingUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newScore = new Score({ userId, score });
  try {
    await newScore.save();
    return new Response(JSON.stringify(newScore), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save score" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Esportazione dei metodi HTTP
export async function GET(request) {
  return handleGetRequest(request);
}

export async function POST(request) {
  return handlePostRequest(request);
}
