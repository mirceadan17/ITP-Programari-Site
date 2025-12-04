import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function AdminPanel() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortField, setSortField] = useState("data");
  const [sortOrder, setSortOrder] = useState("asc");

  if (!sessionStorage.getItem("adminToken")) {
    window.location.href = "/admin";
  }

  const loadData = async () => {
    const res = await axios.get("http://localhost:5001/api/programari");
    setData(res.data);
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Sigur ștergi această programare?")) return;
    await axios.delete(`http://localhost:5001/api/programare/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = data
    .filter((x) =>
      [x.nume, x.telefon, x.nrInmatriculare].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter((x) => (filterDate ? x.data.startsWith(filterDate) : true))
    .sort((a, b) => {
      const valA = a[sortField]?.toString().toLowerCase();
      const valB = b[sortField]?.toString().toLowerCase();
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  const changeSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="admin-panel">
      <h2>📋 Programări ITP</h2>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Caută client / număr / telefon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => changeSort("nume")}>Nume ⬍</th>
            <th onClick={() => changeSort("telefon")}>Telefon ⬍</th>
            <th onClick={() => changeSort("nrInmatriculare")}>
              Înmatriculare ⬍
            </th>
            <th onClick={() => changeSort("tip")}>Serviciu ⬍</th>
            <th onClick={() => changeSort("data")}>Data ⬍</th>
            <th>Acțiune</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((x) => (
            <tr key={x._id}>
              <td>{x.nume}</td>
              <td>{x.telefon}</td>
              <td>{x.nrInmatriculare}</td>
              <td>{x.tip}</td>
              <td>{formatDate(x.data)}</td>
              <td>
                <button className="delete" onClick={() => deleteBooking(x._id)}>
                  Șterge ❌
                </button>
              </td>
            </tr>
          ))}

          {filteredData.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                ❌ Nicio programare găsită.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Buton Logout */}
      <button
        className="logout"
        onClick={() => {
          sessionStorage.removeItem("adminToken");
          window.location.href = "/";
        }}
      >
        ↩ Ieșire
      </button>
    </div>
  );
}

export default AdminPanel;
