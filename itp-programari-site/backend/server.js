import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectare la MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectat la MongoDB"))
  .catch((err) => console.error("❌ Eroare la conectare MongoDB:", err));

// Ruta de test
app.get("/", (req, res) => {
  res.send("Serverul funcționează! 🚀");
});

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT}`));
