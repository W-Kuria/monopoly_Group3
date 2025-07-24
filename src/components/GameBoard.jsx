import { useState } from "react";
import Dice from "./Dice";
import MonopolyBoard from "./MonopolyBoard";


const GameBoard = ({onBack}) => {
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

  const currentPlayer = newPlayers[currentPlayerIndex];

  const chanceTiles = [7, 22, 36]; 
  const communityChestTiles = [2, 17, 33]; 

let tempPlayers = [...newPlayers];

if (chanceTiles.includes(currentPlayer.position)) {
  alert(`${currentPlayer.name} landed on Chance! Here's your card: "Advance to Go. Collect $200!"`);
  tempPlayers[currentPlayerIndex].money += 200;
} else if (communityChestTiles.includes(currentPlayer.position)) {
  alert(`${currentPlayer.name} landed on Community Chest! Here's your card: "Bank error in your favor. Collect $200!"`);
  tempPlayers[currentPlayerIndex].money += 200;
}

setPlayers(tempPlayers);


  // Property Logic  
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
      <h2 className="mb-3 text-white">Have fun!</h2>

      <Dice dice={dice} onRoll={rollDice} />

      <MonopolyBoard players={players} properties={properties} />

   <button className="btn btn-outline-light mt-4" onClick={onBack}>
      Back to Instructions
    </button>
    </div>
  );
};

export default GameBoard;