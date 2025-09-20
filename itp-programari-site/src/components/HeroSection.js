import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Verificare ITP rapidă și sigură</h1>
          <p>Programează-ți vehiculul online în doar câteva minute.</p>
          <a href="#programare" className="hero-button">
            Programează-te acum
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
