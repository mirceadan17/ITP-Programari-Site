import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Admin.css";

function timeToMinutes(timeStr) {
  const [hh, mm] = timeStr.split(":").map(Number);
  return hh * 60 + mm;
}

function minutesToTime(totalMinutes) {
  const hh = Math.floor(totalMinutes / 60);
  const mm = totalMinutes % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function formatTimeDisplay(timeStr) {
  const [hh, mm] = timeStr.split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const hh12 = hh % 12 || 12;
  return `${String(hh12).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )} ${suffix}`;
}

export default function AdminCalendar() {
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [duration] = useState(60);
  const [bookings, setBookings] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    nrInmatriculare: "",
    tip: "ITP",
  });

  const BACKEND = "http://localhost:5001";

  const loadBookings = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.get(`${BACKEND}/api/programari`, {
        headers: { Authorization: token },
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const generateSlots = useCallback(() => {
    const dayOfWeek = new Date(selectedDate).getDay();
    let ranges = [];

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      ranges.push({ start: 480, end: 960 });
    } else {
      ranges.push({ start: 480, end: 720 });
    }

    const newSlots = [];

    ranges.forEach((range) => {
      let cursor = range.start;

      while (cursor + duration <= range.end) {
        if (cursor >= 720 && cursor < 780 && dayOfWeek >= 1 && dayOfWeek <= 5) {
          cursor = 780;
          continue;
        }

        newSlots.push({
          start: cursor,
          end: cursor + duration,
          startStr: minutesToTime(cursor),
          endStr: minutesToTime(cursor + duration),
        });
        cursor += duration;
      }
    });

    setSlots(newSlots);
  }, [selectedDate, duration]);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    generateSlots();
  }, [selectedDate, generateSlots]);

  function slotStatus(slot) {
    const slotStart = slot.start;
    const slotEnd = slot.end;

    for (const b of bookings) {
      if (!b.data || !b.ora) continue;

      const bookingDay = b.data.substring(0, 10);
      if (bookingDay !== selectedDate) continue;

      const bStart = timeToMinutes(b.ora);
      const bDuration = b.durata || 60;
      const bEnd = bStart + bDuration;

      if (slotStart < bEnd && bStart < slotEnd) {
        return "busy";
      }
    }
    return "free";
  }

  function handleSlotClick(slot) {
    if (slotStatus(slot) === "busy") return;
    setSelectedSlot(slot);
    setModalVisible(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("adminToken");

    try {
      await axios.post(
        `${BACKEND}/api/programare`,
        {
          ...form,
          data: selectedDate,
          ora: selectedSlot.startStr,
          durata: duration,
        },
        {
          headers: { Authorization: token },
        }
      );

      setModalVisible(false);
      setForm({ nume: "", telefon: "", nrInmatriculare: "", tip: "ITP" });
      setSelectedSlot(null);
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Eroare la salvare");
    }
  }

  return (
    <div className="admin-panel">
      <h2>Calendar Programări</h2>

      <div className="calendar-controls">
        <label>Selectează Data:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="calendar-slots">
        {slots.map((slot, i) => {
          const status = slotStatus(slot);
          return (
            <div
              key={i}
              className={`slot ${status}`}
              onClick={() => handleSlotClick(slot)}
            >
              {formatTimeDisplay(slot.startStr)} -{" "}
              {formatTimeDisplay(slot.endStr)}
            </div>
          );
        })}
      </div>

      {modalVisible && (
        <div className="modal-bg">
          <div className="modal">
            <h3>
              Adaugă Programare: {formatTimeDisplay(selectedSlot?.startStr)}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Nume"
                required
                value={form.nume}
                onChange={(e) => setForm({ ...form, nume: e.target.value })}
              />
              <input
                placeholder="Telefon"
                required
                value={form.telefon}
                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
              />
              <input
                placeholder="Nr. Înmatriculare"
                required
                value={form.nrInmatriculare}
                onChange={(e) =>
                  setForm({ ...form, nrInmatriculare: e.target.value })
                }
              />

              <select
                value={form.tip}
                onChange={(e) => setForm({ ...form, tip: e.target.value })}
              >
                <option value="ITP">ITP</option>
                <option value="Reverificare">Reverificare</option>
              </select>

              <button type="submit" className="save">
                Salvează
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setModalVisible(false)}
              >
                Anulează
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
