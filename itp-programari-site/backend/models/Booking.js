import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    plate: String,
    vehicleType: String,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
