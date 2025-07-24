import React, { useState } from "react";
import MonopolyBoard from "./MonopolyBoard";

const GameBoard = () => {
  const [players, setPlayers] = useState([
    { name: "Player 1", color: "red", money: 1500, position: 0 },
    { name: "Player 2", color: "blue", money: 1500, position: 0 }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);

  const rollDice = () => {
    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const total = die1 + die2;
    setDice([die1, die2]);

    setPlayers((prev) =>
      prev.map((p, i) =>
        i === currentPlayerIndex
          ? {
              ...p,
              position: (p.position + total) % 40 
            }
          : p
      )
    );

    setCurrentPlayerIndex((prev) => (prev + 1) % players.length); // next player
  };

  return (
    <div className="container py-4 text-center">
      <h2 className="mb-3">Have fun!</h2>

      <button className="btn btn-success mb-4" onClick={rollDice}>
        Roll Dice
      </button>
      <p>
        Dice: 🎲 {dice[0]} + {dice[1]} = {dice[0] + dice[1]}
      </p>

      <MonopolyBoard players={players} />
    </div>
  );
};

export default GameBoard;
