// Main App Component
import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './LandingPage/LandingPage';
import ScrapbookPage from './ScrapPage/ScrapbookPage';
import PuzzlePage from './PuzzlePage/PuzzlePage';
import ShelfPage from './ShelfPage/ShelfPage';
import CertificatePage from './CertificatePage/CertificatePage';
import FinalPage from './FinalPage/FinalPage';
import './ValentineWebsite.css';

export default function ValentineWebsite() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create floating hearts periodically
    const interval = setInterval(() => {
      setFloatingHearts(prev => [...prev.slice(-15), {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 3
      }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="valentine-app">
      {/* Background Hearts */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          💕
        </div>
      ))}

      {currentPage === 'landing' && <LandingPage onNext={() => setCurrentPage('scrapbook')} />}
      {currentPage === 'scrapbook' && <ScrapbookPage onNext={() => setCurrentPage('puzzle')} />}
      {currentPage === 'puzzle' && <PuzzlePage onNext={() => setCurrentPage('shelf')} />}
      {currentPage === 'shelf' && <ShelfPage onNext={() => setCurrentPage('certificate')} />}
      {currentPage === 'certificate' && <CertificatePage onNext={() => setCurrentPage('final')} />}
      {currentPage === 'final' && <FinalPage />}
    </div>
  );
}
