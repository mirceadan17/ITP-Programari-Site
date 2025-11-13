import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Programare trimisă cu succes!" });
  } catch (err) {
    res.status(500).json({ error: "Eroare la salvarea programării." });
  }
});

export default router;
