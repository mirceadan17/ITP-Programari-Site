import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Programare from "./models/Programare.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectat cu succes!"))
  .catch((err) => console.error("Eroare conectare MongoDB:", err));

app.post("/api/programare", async (req, res) => {
  try {
    const programareNoua = new Programare(req.body);
    await programareNoua.save();
    res.status(201).json({ mesaj: "✔ Programare salvată cu succes!" });
  } catch (err) {
    console.error("Eroare salvare: ", err);
    res.status(500).json({ eroare: "❌ Eroare la salvarea programării." });
  }
});

app.get("/", (req, res) => {
  res.send("Serverul funcționează!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT} 🔥`));
