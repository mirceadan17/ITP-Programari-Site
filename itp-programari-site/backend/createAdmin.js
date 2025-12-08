import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    username: "admin",
    password: hashedPassword,
  });

  await admin.save();
  console.log("Admin creat cu succes!");
  mongoose.connection.close();
}

createAdmin();
