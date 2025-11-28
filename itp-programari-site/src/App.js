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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <InfoSection />
              <div className="container">
                <BookingForm />
              </div>
              <ContactSection />
              <Footer />
            </>
          }
        />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
