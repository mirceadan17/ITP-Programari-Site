import { useEffect, useState } from "react";

function AdminPanel() {
  const [programari, setProgramari] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/programari")
      .then((res) => res.json())
      .then((data) => setProgramari(data))
      .catch((err) => console.error("Eroare la load:", err));
  }, []);

  const stergeProgramare = (id) => {
    fetch(`http://localhost:5001/api/programare/${id}`, { method: "DELETE" })
      .then(() => {
        setProgramari(programari.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Eroare stergere:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panou Admin – Programări</h1>

      {programari.map((p) => (
        <div
          key={p._id}
          style={{ borderBottom: "1px solid #ddd", padding: 10 }}
        >
          <p>
            <b>Nume:</b> {p.nume}
          </p>
          <p>
            <b>Telefon:</b> {p.telefon}
          </p>
          <p>
            <b>Mașină:</b> {p.nrInmatriculare}
          </p>
          <p>
            <b>Tip:</b> {p.tip}
          </p>
          <p>
            <b>Data:</b> {new Date(p.data).toLocaleDateString()}
          </p>

          <button onClick={() => stergeProgramare(p._id)}>Șterge</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
