import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css";

function BookingForm() {
  const [formData, setFormData] = useState({
    nume: "",
    telefon: "",
    nrInmatriculare: "",
    tip: "",
    data: "",
    ora: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [status, setStatus] = useState("");

  const BACKEND = "http://localhost:5001";

  const fetchSlots = async (date) => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }
    try {
      const res = await axios.get(`${BACKEND}/api/slots/${date}`);
      setAvailableSlots(res.data);
    } catch (err) {
      setAvailableSlots([]);
      console.error("Eroare la preluarea sloturilor:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "data") {
      fetchSlots(value);
      setFormData((prev) => ({ ...prev, ora: "" }));
    }
  };

  const handleSlotSelect = (selectedOra) => {
    setFormData((prev) => ({
      ...prev,
      ora: selectedOra,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ora) return setStatus("Selectează ora!");

    try {
      const payload = {
        ...formData,
        durata: 60,
        ora: formData.ora,
      };

      const response = await axios.post(`${BACKEND}/api/programare`, payload);

      if (response.status === 201 || response.data.success) {
        setStatus("Programarea a fost trimisă cu succes!");
        setFormData({
          nume: "",
          telefon: "",
          nrInmatriculare: "",
          tip: "",
          data: "",
          ora: "",
        });
        setAvailableSlots([]);
      } else {
        setStatus("Eroare la trimiterea programării.");
      }
    } catch (error) {
      setStatus("Eroare de server. Încearcă mai târziu.");
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

        <div className="time-slots-container">
          {formData.data && availableSlots.length === 0 && (
            <p className="status-message error">
              Nu există ore disponibile sau data este invalidă.
            </p>
          )}
          {availableSlots.length > 0 && (
            <div className="slot-grid">
              {availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot.ora}
                  className={`slot-button ${
                    formData.ora === slot.ora ? "selected" : ""
                  }`}
                  onClick={() => handleSlotSelect(slot.ora)}
                >
                  {slot.ora}
                </button>
              ))}
            </div>
          )}
        </div>

        {status && (
          <p
            className={`status-message ${
              status.includes("succes") ? "success" : "error"
            }`}
          >
            {status}
          </p>
        )}

        <button type="submit">Trimite programarea</button>
      </form>
    </div>
  );
}

export default BookingForm;
