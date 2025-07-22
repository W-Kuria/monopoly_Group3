import MonopolyBoard from '../src/components/MonopolyBoard';
import PlayerPanel from './components/PlayerPanel';
import Dice from './components/Dice';
import { useState } from 'react';

const initialPlayers = [
  {
    id: 1,
    name: 'Player 1',
    position: 0,
    money: 1500,
    properties: [],
  },
  {
    id: 2,
    name: 'Player 2',
    position: 0,
    money: 1500,
    properties: [],
  },
];

function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState({ die1: null, die2: null });

  const rollDice = () => {
    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const steps = die1 + die2;

    setDice({ die1, die2 });

    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayer = updatedPlayers[currentPlayerIndex];

      // Update position (wraps around 40 tiles on Monopoly board)
      currentPlayer.position = (currentPlayer.position + steps) % 40;

      return updatedPlayers;
    });

    // Change turn
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const buyProperty = (propertyId, price) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayer = updatedPlayers[currentPlayerIndex];

      if (currentPlayer.money >= price) {
        currentPlayer.money -= price;
        currentPlayer.properties.push(propertyId);
      }

      return updatedPlayers;
    });
  };

  return (
    <div className="app">
      <h1>React Monopoly</h1>

      <Dice dice={dice} onRoll={rollDice} />
      <PlayerPanel players={players} currentPlayerIndex={currentPlayerIndex} />
      <MonopolyBoard players={players} currentPlayerIndex={currentPlayerIndex} onBuyProperty={buyProperty} />
    </div>
  );
}

export default App;
