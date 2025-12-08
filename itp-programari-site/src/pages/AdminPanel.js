import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function AdminPanel() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortField, setSortField] = useState("data");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin";
    } else {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5001/api/programari", {
        headers: { Authorization: token },
      });
      setData(res.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.location.href = "/admin";
      }
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Sigur ștergi această programare?")) return;
    try {
      const token = sessionStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5001/api/programare/${id}`, {
        headers: { Authorization: token },
      });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

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

  const exportToCSV = () => {
    const headers = [
      "Nume",
      "Telefon",
      "Nr. Inmatriculare",
      "Tip Serviciu",
      "Data",
      "Ora",
    ];

    const rows = filteredData.map((item) => [
      item.nume,
      item.telefon,
      item.nrInmatriculare,
      item.tip,
      formatDate(item.data),
      item.ora,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `programari_${new Date().toISOString().slice(0, 10)}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Programări ITP</h2>
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
        <button className="export-button" onClick={exportToCSV}>
          Export CSV
        </button>
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
            <th>Ora</th>
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
              <td>{x.ora || "-"}</td>
              <td>
                <button className="delete" onClick={() => deleteBooking(x._id)}>
                  Șterge
                </button>
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Nicio programare găsită.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="logout"
        onClick={() => {
          sessionStorage.removeItem("adminToken");
          window.location.href = "/";
        }}
      >
        Ieșire
      </button>
    </div>
  );
}

export default AdminPanel;
