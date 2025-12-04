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
  .catch((err) => console.error("Eroare la MongoDB:", err));

app.post("/api/programare", async (req, res) => {
  try {
    const programare = new Programare(req.body);
    await programare.save();
    res.json({ message: "Programare salvată!" });
  } catch (error) {
    res.status(500).json({ message: "Eroare la salvare." });
  }
});

app.get("/api/programari", async (req, res) => {
  const programari = await Programare.find().sort({ data: 1 });
  res.json(programari);
});

app.delete("/api/programare/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Programare.findByIdAndDelete(id);
    res.json({ message: "Programare ștearsă cu succes" });
  } catch (error) {
    res.status(500).json({ error: "Eroare la ștergere" });
  }
});

app.put("/api/programare/:id", async (req, res) => {
  try {
    const programare = await Programare.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(programare);
  } catch (error) {
    res.status(500).json({ message: "Eroare la actualizare." });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "1234";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: "ADMIN-TOKEN-ITP" });
  }

  res
    .status(401)
    .json({ success: false, message: "Date de autentificare invalide!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT} 🔥`));
