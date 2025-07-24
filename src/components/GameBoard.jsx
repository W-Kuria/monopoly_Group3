import React, { useState } from "react";
import MonopolyBoard from "./MonopolyBoard";

const GameBoard = () => {
  const [players, setPlayers] = useState([
    { name: "Player 1", color: "red", money: 1500, position: 0 },
    { name: "Player 2", color: "blue", money: 1500, position: 0 }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [properties, setProperties] = useState([
  { name: "Mediterranean Avenue", position: 1, price: 60, rent: 2, owner: null },
  { name: "Baltic Avenue", position: 3, price: 60, rent: 4, owner: null },
  { name: "Reading Railroad", position: 5, price: 200, rent: 25, owner: null },
  { name: "Oriental Avenue", position: 6, price: 100, rent: 6, owner: null },
  { name: "Vermont Avenue", position: 8, price: 100, rent: 6, owner: null },
  { name: "Connecticut Avenue", position: 9, price: 120, rent: 8, owner: null },
]);


const rollDice = () => {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  const total = die1 + die2;
  setDice([die1, die2]);

  const newPlayers = players.map((p, i) => {
    if (i === currentPlayerIndex) {
      const newPos = (p.position + total) % 40;
      return { ...p, position: newPos };
    }
    return p;
  });
  setPlayers(newPlayers);

  // Property Logic  
  const currentPlayer = newPlayers[currentPlayerIndex];
  const landedProperty = properties.find(
    (prop) => prop.position === currentPlayer.position
  );

  if (landedProperty) {
    if (landedProperty.owner === null) {
      const wantsToBuy = window.confirm(
        `${currentPlayer.name}, do you want to buy ${landedProperty.name} for $${landedProperty.price}?`
      );
      if (wantsToBuy && currentPlayer.money >= landedProperty.price) {
        // Set property owner
        const updatedProperties = properties.map((p) =>
          p.position === landedProperty.position
            ? { ...p, owner: currentPlayerIndex }
            : p
        );
        setProperties(updatedProperties);

        // Deduct money
        const updatedPlayers = newPlayers.map((p, i) =>
          i === currentPlayerIndex
            ? { ...p, money: p.money - landedProperty.price }
            : p
        );
        setPlayers(updatedPlayers);
      }
    } else if (landedProperty.owner !== currentPlayerIndex) {
      // Pay rent
      const rent = landedProperty.rent;
      const ownerIndex = landedProperty.owner;

      const updatedPlayers = newPlayers.map((p, i) => {
        if (i === currentPlayerIndex)
          return { ...p, money: p.money - rent };
        if (i === ownerIndex)
          return { ...p, money: p.money + rent };
        return p;
      });
      setPlayers(updatedPlayers);

      alert(
        `${currentPlayer.name} paid $${rent} rent to ${players[ownerIndex].name}`
      );
    }
  }


  // Next turn
  setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
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

   
      <MonopolyBoard players={players} properties={properties} />

    </div>
  );
};

export default GameBoard;
