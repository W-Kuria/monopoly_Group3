import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import GameBoard from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  // Game state (Task 1)
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', money: 1500, position: 0, properties: [] },
    { id: 2, name: 'Player 2', money: 1500, position: 0, properties: [] },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);

  return (
    <>
      {!gameStarted ? (
        <WelcomePage onStart={() => setGameStarted(true)} />
      ) : (
        <GameBoard
          players={players}
          setPlayers={setPlayers}
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          dice={dice}
          setDice={setDice}
          onBack={() => setGameStarted(false)}
        />
      )}
    </>
  );
}

export default App;
