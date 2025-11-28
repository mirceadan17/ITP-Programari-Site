// src/pages/AdminLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "1234") {
      sessionStorage.setItem("admin", "true");
      navigate("/admin/panel");
    } else alert("Date incorecte!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Utilizator"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          placeholder="Parolă"
          type="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
