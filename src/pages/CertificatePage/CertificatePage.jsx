import "./CertificatePage.css";
import React, { useState, useEffect } from "react";

export default function CertificatePage({ onNext }) {
  const [pawPlaced, setPawPlaced] = useState(false);
  const [pawPosition, setPawPosition] = useState({ x: 50, y: 50 });
  const [showCertificate, setShowCertificate] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Paw position is no longer needed for positioning (now in normal flow)
    // Keep state for sparkle animation reference
    setPawPosition({ x: 50, y: 50 });
  }, []);

  const handlePawClick = () => {
    setPawPlaced(true);

    // Create sparkles centered around the paw print area
    const newSparkles = [...Array(30)].map((_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20,
      y: 50 + Math.random() * 20,
      delay: Math.random() * 0.3,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setShowCertificate(true);
      setSparkles([]);
    }, 1000);
  };

  return (
    <div className="certificate-page">
      {!showCertificate ? (
        <div className="paw-section">
          <div className="envelope-open">
            <div className="envelope-icon">✉️</div>
            <h2>You found me!</h2>
            <p>But to see what's inside… you'll need to leave your mark 🐾</p>
            <p className="instruction">
              Click the paw print to stamp your approval 💕
            </p>
          </div>

          {!pawPlaced && (
            <div
              className="paw-print"
              onClick={handlePawClick}
            >
              🐾
            </div>
          )}

          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}

          {pawPlaced && (
            <div className="opening-message">Perfect! Now opening…</div>
          )}
        </div>
      ) : (
        <div className="certificate-section">
          <div className="certificate">
            <div className="certificate-border">
              <div className="certificate-corner tl">🌸</div>
              <div className="certificate-corner tr">🌸</div>
              <div className="certificate-corner bl">🌸</div>
              <div className="certificate-corner br">🌸</div>

              <div className="certificate-content">
                <h1 className="certificate-header">
                  Official Valentine's Certificate
                </h1>

                <div className="certificate-body">
                  <p className="certifies">This certifies that</p>
                  <p className="recipient-name">Keziah Angel A. Mariscotes</p>
                  <p className="main-text">is officially my Valentine…</p>
                  <p className="main-text forever">forever and ever 💕</p>

                  <div className="certificate-details">
                    <p>Issued on this very special day,</p>
                    <p className="date">February 14th, 2026</p>
                    <p className="anniversary">
                      After 4 wonderful years together
                    </p>
                    <p className="anniversary-date">(since September 18th)</p>
                  </div>

                  <div className="signature-section">
                    <p className="with-love">With all my love,</p>
                    <p className="signature">Kurt Russel Baybay</p>
                  </div>

                  <p className="ps">
                    P.S. This certificate is non-transferable and lasts a
                    lifetime ❤️
                  </p>
                </div>
              </div>
            </div>

            <div className="floating-messages">
              <div className="float-msg" style={{ top: "10%", left: "5%" }}>
                Forever yours 💌
              </div>
              <div className="float-msg" style={{ top: "15%", right: "5%" }}>
                You + Me = 💕
              </div>
              <div className="float-msg" style={{ bottom: "15%", left: "8%" }}>
                4 years & counting ✨
              </div>
            </div>
          </div>

          <button className="continue-btn" onClick={onNext}>
            Continue to Final Surprise →
          </button>

          <div className="celebration-effects">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="paw-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                }}
              >
                🐾
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
