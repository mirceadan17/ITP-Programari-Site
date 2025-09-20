import React from "react";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact</h2>
        <p>
          Ne găsești la sediul nostru din Timișoara sau ne poți suna direct.
        </p>

        <div className="contact-details">
          <div className="contact-item">
            <h3>Adresă</h3>
            <p>Str. Exemplu nr. 10, Timișoara</p>
          </div>

          <div className="contact-item">
            <h3>Telefon</h3>
            <p>
              <a href="tel:+40712345678">+40 712 345 678</a>
            </p>
          </div>

          <div className="contact-item">
            <h3>Email</h3>
            <p>
              <a href="mailto:contact@nossitp.ro">contact@nossitp.ro</a>
            </p>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.01634429599!2d21.229125676577564!3d45.74887107107919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d7a3c65a8f7%3A0x89c1a58b6e4a5c4d!2sTimi%C8%99oara!5e0!3m2!1sen!2sro!4v1694092022336!5m2!1sen!2sro"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
