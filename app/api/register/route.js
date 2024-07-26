// app/api/register/route.js
import dbConnect from "../../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRandomColor } from "../../utils/ColorFunctions";

async function registerUser(request) {
  const { name, password } = await request.json();

  await dbConnect();

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Name already in use" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      password: hashedPassword,
      usercolor: getRandomColor(),
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.name, usercolor: user.usercolor },
      process.env.secretKey,
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  return registerUser(request);
}
