// app/api/auth/route.js
import dbConnect from "../../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function authenticate(request) {
  const { name, password } = await request.json();

  await dbConnect();

  try {
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Password is wrong" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.name,
        usercolor: existingUser.usercolor,
      },
      process.env.secretKey,
      {
        expiresIn: "3d",
      }
    );

    return new Response(JSON.stringify({ token }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  return authenticate(request);
}
