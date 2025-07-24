# 🎲 Monopoly React Game

A simplified, interactive digital version of the classic Monopoly board game built using **React**. This project is part of a collaborative group effort demonstrating use of React fundamentals, state management, and dynamic rendering.

## 🚀Features

- 🎮 **Game State Tracking**
  - Player positions, money, properties, and turns are fully tracked.
  - State is saved to and restored from `localStorage`.

- 🎲 **Dice Rolling**
  - Simulates two dice.
  - Players move forward based on roll total.

- 🏠 **Property Logic**
  - Buy unowned properties.
  - Pay rent to property owners.

- 💼 **Chance & Community Chest**
  - Draw simplified cards with events like collecting money or moving.

- ⛓️ **Go to Jail Logic**
  - Landing on tile 30 sends a player to jail (tile 10) and skips their next turn.

- 💸 **Bankruptcy Detection**
  - If a player’s balance drops below 0, they are removed from the game.

- 💾 **Save/Resume**
  - Game state is automatically saved and can be resumed later.

- 📜 **Instructions Page**
  - Learn how to play before starting the game.

- ⏪ **Back to Instructions**
  - Return to the instructions page without losing progress.

- ▶️ **Resume Game**
  - Reappear option after returning to instructions.
    
## Publishers
This Project was created by William Kuria, Mathew Kariuki, Brenda Njaramba, and Justine Gichure.

## 📁 Folder Structure

```plaintext
src/
├── components/
│   ├── App.jsx
│   ├── GameBoard.jsx
│   ├── MonopolyBoard.jsx
│   ├── Dice.jsx
│   └── PlayerPanel.jsx  (optional/for future)
├── data/
│   └── tiles.js         (optional – holds board tile data)
├── assets/              (optional – images, icons)
├── App.css / index.css
└── main.jsx


