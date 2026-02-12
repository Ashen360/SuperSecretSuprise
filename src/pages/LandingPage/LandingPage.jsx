import React, { useState, useEffect } from 'react';
import './LandingPage.css';

export default function LandingPage({ onNext }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
  }, []);

  return (
    <div className="landing-page" onClick={onNext}>
      <div className={`landing-content ${showContent ? 'show' : ''}`}>
        <h1 className="landing-title">Welcome to Our World</h1>
        <div className="landing-message">
          <p>I made something special for you…</p>
          <p className="click-hint">click to begin 💌</p>
        </div>
        <div className="petals-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
