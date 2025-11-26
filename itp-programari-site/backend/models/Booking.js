import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    plate: { type: String, required: true },
    vehicleType: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
