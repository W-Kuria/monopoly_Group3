import { useState, useEffect } from "react";
import Dice from "./Dice";
import MonopolyBoard from "./MonopolyBoard";

const GameBoard = ({ onBack }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const savedState = localStorage.getItem("monopolyGameState");
    if (savedState) {
      const { players, currentPlayerIndex, properties } = JSON.parse(savedState);
      setPlayers(players);
      setCurrentPlayerIndex(currentPlayerIndex);
      setProperties(properties);
    } else {
      setPlayers([
        { name: "Player 1", color: "red", money: 1500, position: 0, skipTurn: false },
        { name: "Player 2", color: "blue", money: 1500, position: 0, skipTurn: false }
      ]);
      setProperties([
        { name: "Mediterranean Avenue", position: 1, price: 60, rent: 2, owner: null },
        { name: "Baltic Avenue", position: 3, price: 60, rent: 4, owner: null },
        { name: "Reading Railroad", position: 5, price: 200, rent: 25, owner: null },
        { name: "Oriental Avenue", position: 6, price: 100, rent: 6, owner: null },
        { name: "Vermont Avenue", position: 8, price: 100, rent: 6, owner: null },
        { name: "Connecticut Avenue", position: 9, price: 120, rent: 8, owner: null }
      ]);
    }
  }, []);

  const saveGame = (updatedPlayers, updatedProps, nextPlayerIndex) => {
    localStorage.setItem(
      "monopolyGameState",
      JSON.stringify({
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,
        properties: updatedProps
      })
    );
  };

  const rollDice = () => {
    let updatedPlayers = [...players];
    let updatedProps = [...properties];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    if (currentPlayer.skipTurn) {
      alert(`${currentPlayer.name} is in Jail and skips this turn.`);
      updatedPlayers[currentPlayerIndex].skipTurn = false;
      const nextIndex = (currentPlayerIndex + 1) % updatedPlayers.length;
      setPlayers(updatedPlayers);
      setCurrentPlayerIndex(nextIndex);
      saveGame(updatedPlayers, updatedProps, nextIndex);
      return;
    }

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;
    setDice([die1, die2]);

    let newPosition = (currentPlayer.position + total) % 40;

    // Go to Jail => 
    if (newPosition === 30) {
      alert(`${currentPlayer.name} landed on "Go to Jail"! Skipping next turn.`);
      updatedPlayers[currentPlayerIndex] = {
        ...currentPlayer,
        position: 10,
        skipTurn: true
      };
    } else {
      updatedPlayers[currentPlayerIndex].position = newPosition;

      // Chance
      const chanceTiles = [7, 22, 36];
      if (chanceTiles.includes(newPosition)) {
        alert(`${currentPlayer.name} drew a Chance card: "Advance to Go. Collect $200!"`);
        updatedPlayers[currentPlayerIndex].position = 0;
        updatedPlayers[currentPlayerIndex].money += 200;
      }

      // Community Chest => By William
      const communityChestTiles = [2, 17, 33];
      if (communityChestTiles.includes(newPosition)) {
        alert(`${currentPlayer.name} drew a Community Chest card: "Bank error in your favor. Collect $200!"`);
        updatedPlayers[currentPlayerIndex].money += 200;
      }

      // Property Logic => By William
      const landedProperty = updatedProps.find(
        (prop) => prop.position === updatedPlayers[currentPlayerIndex].position
      );

      if (landedProperty) {
        if (landedProperty.owner === null) {
          const wantsToBuy = window.confirm(
            `${currentPlayer.name}, buy ${landedProperty.name} for $${landedProperty.price}?`
          );
          if (wantsToBuy && currentPlayer.money >= landedProperty.price) {
            updatedProps = updatedProps.map((p) =>
              p.position === landedProperty.position
                ? { ...p, owner: currentPlayerIndex }
                : p
            );
            updatedPlayers[currentPlayerIndex].money -= landedProperty.price;
          }
        } else if (landedProperty.owner !== currentPlayerIndex) {
          const rent = landedProperty.rent;
          const ownerIndex = landedProperty.owner;

          updatedPlayers[currentPlayerIndex].money -= rent;
          updatedPlayers[ownerIndex].money += rent;

          alert(`${currentPlayer.name} paid $${rent} to ${players[ownerIndex].name}`);
        }
      }
    }

    // Bankruptcy check 
    const bankruptPlayers = updatedPlayers.filter(p => p.money < 0);
    if (bankruptPlayers.length > 0) {
      bankruptPlayers.forEach(bp => {
        alert(`${bp.name} is bankrupt and removed from the game.`);
        updatedProps = updatedProps.map(prop =>
          prop.owner === updatedPlayers.indexOf(bp) ? { ...prop, owner: null } : prop
        );
      });

      updatedPlayers = updatedPlayers.filter(p => p.money >= 0);

      // Game over check
      if (updatedPlayers.length === 1) {
        alert(`${updatedPlayers[0].name} wins the game!`);
        localStorage.removeItem("monopolyGameState");
        return;
      }

      if (currentPlayerIndex >= updatedPlayers.length) {
        setCurrentPlayerIndex(0);
      }
    }

    const nextIndex = (currentPlayerIndex + 1) % updatedPlayers.length;

    setPlayers(updatedPlayers);
    setProperties(updatedProps);
    setCurrentPlayerIndex(nextIndex);
    saveGame(updatedPlayers, updatedProps, nextIndex);
  };

const resetGame = () => {
  localStorage.removeItem("monopolyGameState");
  setPlayers([
    { name: "Player 1", color: "red", money: 1500, position: 0, skipTurn: false },
    { name: "Player 2", color: "blue", money: 1500, position: 0, skipTurn: false }
  ]);
  setProperties([
    { name: "Mediterranean Avenue", position: 1, price: 60, rent: 2, owner: null },
    { name: "Baltic Avenue", position: 3, price: 60, rent: 4, owner: null },
    { name: "Reading Railroad", position: 5, price: 200, rent: 25, owner: null },
    { name: "Oriental Avenue", position: 6, price: 100, rent: 6, owner: null },
    { name: "Vermont Avenue", position: 8, price: 100, rent: 6, owner: null },
    { name: "Connecticut Avenue", position: 9, price: 120, rent: 8, owner: null }
  ]);
  setCurrentPlayerIndex(0);
  setDice([1, 1]);
};


  return (
    <div className="container py-4 text-center">
      <h2 className="mb-3 text-white">Have fun!</h2>
      <Dice dice={dice} onRoll={rollDice} />
      <MonopolyBoard players={players} properties={properties} />
<div className="d-flex justify-content-center gap-3 mt-4">
  <button className="btn btn-primary" onClick={onBack}>
    Back to Instructions
  </button>
  <button className="btn btn-danger" onClick={resetGame}>
    Restart Game
  </button>
</div>
    </div>
  );
};

export default GameBoard;
