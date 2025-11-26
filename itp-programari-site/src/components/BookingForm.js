import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plate: "",
    vehicleType: "",
    date: "",
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
      const res = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Eroare la trimitere");
      const data = await res.json();
      console.log("Răspuns server:", data);
      alert("Programarea a fost trimisă!");
      setFormData({
        name: "",
        phone: "",
        plate: "",
        vehicleType: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Nu s-a putut trimite programarea. Încearcă din nou.");
    }
  };

  return (
    <div id="programare" className="form-container">
      <h2>Programează-te la service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nume complet"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Număr de telefon"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="plate"
          placeholder="Număr înmatriculare"
          value={formData.plate}
          onChange={handleChange}
          required
        />

        <div className="radio-group">
          <label>Tip vehicul*</label>
          <div className="radio-options">
            {[
              "Autoturism",
              "Autoutilitară",
              "Motocicletă",
              "Remorcă",
              "Uber/Taxi",
            ].map((type) => (
              <label key={type} className="radio-item">
                <input
                  type="radio"
                  name="vehicleType"
                  value={type}
                  checked={formData.vehicleType === type}
                  onChange={handleChange}
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Trimite programarea</button>
      </form>
    </div>
  );
}

export default BookingForm;
