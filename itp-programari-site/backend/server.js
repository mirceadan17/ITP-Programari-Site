import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Programare from "./models/Programare.js";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function getWorkingRanges(dayOfWeek) {
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return [
      { start: 480, end: 720 },
      { start: 780, end: 960 },
    ];
  }
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    return [{ start: 480, end: 720 }];
  }
  return [];
}

function intervalsOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

function verifyAdmin(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token" });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/programari", verifyAdmin, async (req, res) => {
  const data = await Programare.find().sort({ data: 1 });
  res.json(data);
});

app.delete("/api/programare/:id", verifyAdmin, async (req, res) => {
  await Programare.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put("/api/programare/:id", verifyAdmin, async (req, res) => {
  const data = await Programare.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(data);
});

app.get("/api/slots/:date", async (req, res) => {
  const { date } = req.params;
  const slotDuration = 60;
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay();

  const workingRanges = getWorkingRanges(dayOfWeek);
  if (workingRanges.length === 0) return res.json([]);

  try {
    const existingBookings = await Programare.find({ data: date });
    let freeSlots = [];

    for (const range of workingRanges) {
      let cursor = range.start;
      // Conditie corectata pentru a include slotul final (ex: 15:00-16:00)
      while (cursor + slotDuration <= range.end) {
        const slotStart = cursor;
        const slotEnd = cursor + slotDuration;
        let isOccupied = false;

        for (const booking of existingBookings) {
          const bookingStart = timeToMinutes(booking.ora);
          const bookingDuration = booking.durata || 60;
          const bookingEnd = bookingStart + bookingDuration;

          if (intervalsOverlap(slotStart, slotEnd, bookingStart, bookingEnd)) {
            isOccupied = true;
            break;
          }
        }

        if (!isOccupied) {
          freeSlots.push({
            ora: minutesToTime(slotStart),
            durata: slotDuration,
          });
        }

        cursor += slotDuration;
      }
    }

    res.json(freeSlots);
  } catch (error) {
    res.status(500).json({ message: "Eroare la generarea sloturilor" });
  }
});

app.post("/api/admin", async (req, res) => {
  const { name, pass } = req.body;
  try {
    const admin = await Admin.findOne({ username: name });

    if (!admin) {
      return res.status(401).json({ message: "Utilizator inexistent!" });
    }

    const isMatch = await bcrypt.compare(pass, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Parolă greșită!" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Eroare de server" });
  }
});

app.post("/api/programare", async (req, res) => {
  try {
    const p = new Programare(req.body);
    await p.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server rulează");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server pornit pe portul ${process.env.PORT}`);
      console.log("MongoDB conectat");
    });
  })
  .catch(() => console.log("Eroare conectare MongoDB"));
