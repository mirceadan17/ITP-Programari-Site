import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">Noss ITP</div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <a href="#home" onClick={closeMenu}>
            Acasă
          </a>
        </li>
        <li>
          <a href="#info" onClick={closeMenu}>
            Informații
          </a>
        </li>
        <li>
          <a href="#programare" onClick={closeMenu}>
            Programare
          </a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </li>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li>
          <a href="/calendar">Calendar</a>
        </li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
