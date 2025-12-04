import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function AdminCalendar() {
  const [events, setEvents] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/programari");
      const formatted = res.data.map((p) => ({
        title: p.nume + " - " + p.nrInmatriculare,
        date: p.data,
      }));
      setEvents(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Calendar Programări</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}

export default AdminCalendar;
