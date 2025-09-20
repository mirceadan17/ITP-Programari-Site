import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import "./App.css";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection />
      <InfoSection />
      <div className="container">
        <BookingForm />
      </div>
      <ContactSection />
      <Footer />
    </>
  );
}

export default App;
