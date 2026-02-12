import React, { useState, useRef } from 'react';
import './ScrapbookPage.css';
import { X, Camera } from 'lucide-react';

export default function ScrapbookPage({ onNext }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const fileInputRef = useRef(null);

  const cards = [
    {
      title: "Remember this? Our silly selfie together, just us being dummiebears 😄",
      note: "I still have this saved yes. It's one of the photos of all time. 😁",
      image: "/photos/photo1.jpg"
    },
    {
      title: "I still laugh thinking about this day we spent just talking and hanging out for hours ❤️",
      note: "Time flew by so fast. I didn't want that day to end.",
      image: "/photos/photo2.jpg"
    },
    {
      title: "Strawberries, and coffee? and you? always will be my favorite combo 🥤🍓☕",
      note: "The drinks were sweet, but not as sweet as youu.",
      image: "/photos/photo3.jpg"
    },
    {
      title: "Who knew our rallies would become one of my favorite memories? 🏸",
      note: "You're getting way too good at this. I might need to start practicing.",
      image: "/photos/photo4.jpg"
    },
    {
      title: "Even our silly little moments are my favorite 💕",
      note: "The random stuff we do together? That's what makes us, us.",
      video: "/video/video1.mp4",
      isvideo: true
    },
    {
      title: "Our hangouts together make everything sweeter ✨",
      note: "Ill always and always will be your no.1 cravings provider. (Cheers to more cheesecakes) 🥰",
      image: "/photos/photo5.jpg"
    },
    {
      title: "A special moment, just for you 💐",
      note: "Thank you for everything my baby. This flower is just a small token of my love for you. 💕",
      image: null,
      isSpecial: true
    }  
  ];

  const handleCardClick = () => {
    if (cards[currentCard].isSpecial && !uploadedImage) {
      return;
    }
    setShowNote(true);
    const newConfetti = [...Array(30)].map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setTimeout(() => {
          setIsRevealed(true);
          const newConfetti = [...Array(50)].map((_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5
          }));
          setConfetti(newConfetti);
          setTimeout(() => setConfetti([]), 4000);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const nextCard = () => {
    setShowNote(false);
    if (currentCard < cards.length - 1) {
      setTimeout(() => setCurrentCard(currentCard + 1), 300);
    } else {
      setTimeout(onNext, 500);
    }
  };

  const prevCard = () => {
    setShowNote(false);
    setIsRevealed(false);
    if (currentCard > 0) {
      setTimeout(() => {
        setCurrentCard(currentCard - 1);
        if (currentCard - 1 !== cards.length - 1) {
          setUploadedImage(null);
        }
      }, 300);
    }
  };

  const currentCardData = cards[currentCard];
  const isLastCard = currentCard === cards.length - 1;

  return (
    <div className="scrapbook-page">
      <h1 className="scrapbook-title">Our Story (So Far)</h1>
      <div className="scrapbook-container">
        <div className="card-wrapper">
          <div 
            className={`memory-card ${isLastCard ? 'special-card' : ''}`} 
            onClick={handleCardClick}
          >
            <div className="photo-container">
              {isLastCard ? (
                uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Your special flower"
                    className="memory-photo magical-reveal"
                  />
                ) : (
                  <div className="upload-area" onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <div className="upload-content">
                      <Camera size={48} className="upload-icon" />
                      <p className="upload-text">Take a photo of something special!</p>
                      <p className="upload-hint">Click here to upload ✨</p>
                    </div>
                  </div>
                )
              ) : currentCardData.isvideo ? (
                <video
                  src={currentCardData.video}
                  className="memory-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster= "/photos/video-thumb.jpg"
                >
                  Your browser does not support the video tag.
                </video>
                ) : (
                <>
                <img 
                  src={currentCardData.image} 
                  alt={currentCardData.title}
                  className="memory-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="photo-placeholder" style={{display: 'none'}}>
                  <p className="photo-note">Add your photo in public/photos/ folder</p>
                </div>
              </>
              )}
            </div>
            
            {isLastCard && uploadedImage ? (
              <div className={`card-content magical-content ${isRevealed ? 'revealed' : ''}`}>
                <p className="card-caption magical-text">{currentCardData.title}</p>
                <p className="card-hint magical-hint">Click for a special message 💌</p>
              </div>
            ) : (
              <div className="card-content">
                <p className="card-caption">{currentCardData.title}</p>
                <p className="card-hint">Click for a note 💌</p>
              </div>
            )}
            
            {showNote && (
              <div className="mini-note magical-note">
                <button className="note-close" onClick={e => { e.stopPropagation(); setShowNote(false); }}>
                  <X size={16} />
                </button>
                <p>{currentCardData.note}</p>
              </div>
            )}
          </div>
        </div>
        <div className="navigation">
          <button onClick={prevCard} disabled={currentCard === 0} className="nav-btn">
            ← Previous
          </button>
          <span className="page-indicator">{currentCard + 1} / {cards.length}</span>
          <button onClick={nextCard} className="nav-btn">
            {currentCard === cards.length - 1 ? 'Continue →' : 'Next →'}
          </button>
        </div>
      </div>
      {confetti.map(conf => (
        <div
          key={conf.id}
          className="confetti"
          style={{
            left: `${conf.left}%`,
            animationDelay: `${conf.delay}s`
          }}
        >
          {['🎉', '💕', '✨', '🌸'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  );
}
