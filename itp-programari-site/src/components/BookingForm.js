import React from "react";
import "./BookingForm.css";

function BookingForm() {
  return (
    <div id="programare" className="form-container">
      <h2>Programează-te la service</h2>
      <form>
        <input type="text" placeholder="Nume complet" required />
        <input type="text" placeholder="Număr de telefon" required />
        <input type="text" placeholder="Număr înmatriculare" required />
        <select required>
          <option value="">Alege tipul de programare</option>
          <option value="itp">ITP</option>
          <option value="revizie">Revizie</option>
          <option value="service">Service</option>
        </select>
        <input type="date" required />
        <button type="submit">Trimite programarea</button>
      </form>
    </div>
  );
}

export default BookingForm;
