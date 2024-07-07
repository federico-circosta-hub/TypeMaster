import dbConnect from "../../lib/mongodb";
import User from "../../app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRandomColor } from "../../app/utils/ColorFunctions";

export default async function handler(req, res) {
  await dbConnect();

  const { name, password } = req.body;

  const existingUser = await User.findOne({ name });

  if (existingUser)
    return res.status(400).json({ error: "Name already in use" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    password: hashedPassword,
    color: getRandomColor(),
  });

  await user.save();

  const token = jwt.sign(
    { userId: user._id, username: user.name },
    process.env.secretKey,
    {
      expiresIn: "1h",
    }
  );

  res.status(201).json({ data: { token } });
}
