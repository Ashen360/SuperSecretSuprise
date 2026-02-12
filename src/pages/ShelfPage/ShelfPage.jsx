import React, { useState } from "react";
import "./ShelfPage.css";
import { X } from "lucide-react";

export default function ShelfPage({ onNext }) {
  const [clickedItems, setClickedItems] = useState(new Set());
  const [activeItem, setActiveItem] = useState(null);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const items = [
    {
      id: "matcha",
      emoji: "🍵",
      name: "Matcha",
      message: "Everytime I see or think about matcha, its always you I think about first! 🌿",
      note: "I LOVE YOU SO MATCHA! 😍🥰😍🥰",
    },
    {
      id: "strawberries",
      emoji: "🍓",
      name: "Strawberries",
      message: "Strawberries + you = my favorite ❤️",
      note: "Sweet, refreshing, and impossible to resist.",
    },
    {
      id: "cook",
      emoji: "🍴",
      name: "Cooking",
      message: "Cooking snacks together is one of my favorite things to do with you 🍳",
      note: "Whether it's a simple cheese balls or a fancy tortilla wrap recipe, it's always better with you by my side.",
    },
    {
      id: "milk",
      emoji: "🥛",
      name: "Milk",
      message: "This after cracking and you'll be happy forever. 🥛",
      note: "Whether it's Milk or some other juice drink, it's always better with you.",
    },
    {
      id: "cheese",
      emoji: "🧀",
      name: "Cheese",
      message: "Anything cheese is the perfect snack to share with you 🧀",
      note: "Mmmmmmm Cheeeseeee... I could eat it all day with you.",
    },
    {
      id: "lily",
      emoji: "🌸",
      name: "Pink Lily",
      message: "Every pink flower makes me think of your elegance 🌸",
      note: "Delicate, stunning, and unforgettable.",
    },
    {
      id: "racket",
      emoji: "🏸",
      name: "Badminton",
      message: "Our rallies are a little competitive, but always fun 🏸",
      note: "You bring out my playful side in the best way.",
    }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
    const newClicked = new Set(clickedItems);
    newClicked.add(item.id);
    setClickedItems(newClicked);

    if (newClicked.size === items.length) {
      setTimeout(() => setShowEnvelope(true), 1000);
    }
  };

  return (
    <div className="shelf-page">
      <h1 className="shelf-title">Things That Remind Me of You</h1>
      <p className="shelf-subtitle">Click on each item to unlock a memory 💭</p>

      <div className="shelf-container">
        <div className="shelf">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`shelf-item ${clickedItems.has(item.id) ? "clicked" : ""}`}
              onClick={() => handleItemClick(item)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="item-emoji">{item.emoji}</div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>

        {showEnvelope && (
          <div className="envelope-container">
            <div className="envelope" onClick={onNext}>
              <div className="envelope-flap">✉️</div>
              <div className="envelope-label">For your paws only 🐾</div>
              <div className="envelope-hint">Click to open</div>
            </div>
          </div>
        )}
      </div>

      {activeItem && (
        <div className="memory-modal" onClick={() => setActiveItem(null)}>
          <div className="memory-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveItem(null)}>
              <X size={20} />
            </button>
            <div className="memory-emoji">{activeItem.emoji}</div>
            <h3>{activeItem.message}</h3>
            <p>{activeItem.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
