import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/admin", {
        name: user,
        pass: pass,
      });

      sessionStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/panel";
    } catch (err) {
      setError("Utilizator sau parolă greșită!");
    }
  };

  return (
    <div className="login-container">
      <h2>Autentificare Admin</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Autentificare</button>
      </form>
    </div>
  );
}

export default AdminLogin;
