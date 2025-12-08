import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminCalendar from "./pages/AdminCalendar";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div id="home" className="full-width-section">
                  <HeroSection />
                </div>

                <div id="info" className="full-width-section">
                  <InfoSection />
                </div>

                <div id="programare" className="section-container">
                  <BookingForm />
                </div>

                <div id="contact" className="full-width-section">
                  <ContactSection />
                </div>
              </>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/calendar" element={<AdminCalendar />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
