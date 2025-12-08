import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 60;
      const extraOffset = id === "programare" ? 100 : 0;

      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - extraOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    closeMenu();
  };

  const isAdminPage =
    location.pathname.startsWith("/admin") || location.pathname === "/calendar";

  return (
    <nav className="navbar">
      <div className="logo">Noss ITP</div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {!isAdminPage && (
          <>
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                Acasă
              </a>
            </li>
            <li>
              <a
                href="#info"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("info");
                }}
              >
                Informații
              </a>
            </li>
            <li>
              <a
                href="#programare"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programare");
                }}
              >
                Programare
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Contact
              </a>
            </li>
          </>
        )}

        {sessionStorage.getItem("adminToken") && (
          <>
            <li>
              <a href="/admin/panel" onClick={closeMenu}>
                Admin
              </a>
            </li>
            <li>
              <a href="/calendar" onClick={closeMenu}>
                Calendar
              </a>
            </li>
          </>
        )}
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
