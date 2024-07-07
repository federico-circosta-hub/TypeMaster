import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  usercolor: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
