import React from "react";
import "./InfoSection.css";

function InfoSection() {
  return (
    <section id="info" className="info-section">
      <div className="info-container">
        <h2>Acte necesare pentru ITP</h2>
        <ul>
          <li>Certificatul de înmatriculare (talonul)</li>
          <li>Cartea de identitate a vehiculului (CIV)</li>
          <li>Polița RCA valabilă</li>
          <li>Buletinul / cartea de identitate a proprietarului</li>
          <li>Împuternicire (dacă mașina nu este adusă de proprietar)</li>
        </ul>
      </div>
    </section>
  );
}

export default InfoSection;
