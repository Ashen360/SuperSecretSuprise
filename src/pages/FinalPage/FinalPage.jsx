import "./FinalPage.css";
import React, { useState } from "react";

export default function FinalPage() {
  const [clicked, setClicked] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const handleClick = () => {
    setClicked(true);

    // Massive confetti
    const newConfetti = [...Array(100)].map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
    }));
    setConfetti(newConfetti);
  };

  return (
    <div className="final-page">
      <div className="final-content">
        <h1 className="final-title">So… Will You Be My Valentine?</h1>
        <p className="final-subtitle">(As if there was ever any doubt 😊)</p>

        <div className="photo-heart">
          <div className="heart-shape">
            <img 
              src="/photos/lovey.jpg" 
              alt="Our photo" 
              className="final-photo"
            />
          </div>
        </div>

        {!clicked ? (
          <button className="yes-btn" onClick={handleClick}>
            Yes, of course! 💖
          </button>
        ) : (
          <div className="final-message">
            <h2>I love you 💕</h2>
            <p>Happy Valentine's Day, my sweetest adventure.</p>
            <p className="closing-note">
              Here's to many more years of strawberries, badminton rallies,
              <br />
              and everything in between 🌸✨
            </p>
          </div>
        )}
      </div>

      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="final-confetti"
          style={{
            left: `${conf.left}%`,
            animationDelay: `${conf.delay}s`,
            animationDuration: `${conf.duration}s`,
          }}
        >
          {["💕", "💖", "❤️", "🌸", "✨", "🎉"][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );
}
