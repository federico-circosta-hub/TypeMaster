import dbConnect from "../../lib/mongodb";
import User from "../../app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  const { name, password } = req.body;

  const existingUser = await User.findOne({ name });

  if (!existingUser) return res.status(401).json({ error: "User not found" });

  bcrypt.compare(password, existingUser.password, (err, isMatch) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error during password comparison" });
    if (!isMatch) return res.status(401).json({ error: "Password is wrong" });
  });
  const token = jwt.sign(
    {
      userId: existingUser._doc._id,
      username: existingUser._doc.name,
      usercolor: existingUser._doc.usercolor,
    },
    process.env.secretKey,
    {
      expiresIn: "1h",
    }
  );

  res.status(201).json({ data: { token } });
}
