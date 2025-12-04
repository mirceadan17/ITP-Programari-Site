import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", {
        user,
        pass,
      });

      sessionStorage.setItem("adminToken", res.data.token);
      window.location.href = "/panel";
    } catch (err) {
      setError("❌ Utilizator sau parolă greșită!");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Autentificare Admin</h2>

      <input
        type="text"
        placeholder="Utilizator"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        type="password"
        placeholder="Parolă"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      {error && <p className="login-error">{error}</p>}

      <button onClick={handleLogin}>Autentificare</button>
    </div>
  );
}

export default AdminLogin;
