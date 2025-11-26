import mongoose from "mongoose";

const ProgramareSchema = new mongoose.Schema({
  nume: { type: String, required: true },
  telefon: { type: String, required: true },
  nrInmatriculare: { type: String, required: true },
  tip: { type: String, required: true },
  data: { type: String, required: true },
});

const Programare = mongoose.model("Programare", ProgramareSchema);
export default Programare;
