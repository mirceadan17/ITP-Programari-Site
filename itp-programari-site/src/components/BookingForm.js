import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    nume: "",
    telefon: "",
    nrInmatriculare: "",
    tip: "",
    data: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/programare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✔ Programare trimisă cu succes!");
        setFormData({
          nume: "",
          telefon: "",
          nrInmatriculare: "",
          tip: "",
          data: "",
        });
      } else {
        alert("❌ Eroare la trimitere.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Serverul nu răspunde.");
    }
  };

  return (
    <div id="programare" className="form-container">
      <h2>Programează-te la service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nume"
          placeholder="Nume complet"
          value={formData.nume}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefon"
          placeholder="Număr de telefon"
          value={formData.telefon}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nrInmatriculare"
          placeholder="Număr înmatriculare"
          value={formData.nrInmatriculare}
          onChange={handleChange}
          required
        />

        <select
          name="tip"
          value={formData.tip}
          onChange={handleChange}
          required
        >
          <option value="">Alege tipul de programare</option>
          <option value="ITP">ITP</option>
          <option value="Revizie">Revizie</option>
          <option value="Service">Service</option>
        </select>

        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />

        <button type="submit">Trimite programarea</button>
      </form>
    </div>
  );
}

export default BookingForm;
