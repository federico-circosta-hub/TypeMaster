import dbConnect from "../../lib/mongodb";
import User from "../../app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password is wrong" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.name,
        usercolor: existingUser.usercolor,
      },
      process.env.secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
