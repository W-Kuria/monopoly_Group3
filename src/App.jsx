import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import GameBoard from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(false); 
  const [instructionsViewed, setInstructionsViewed] = useState(false); 

  // Game state (Task 1)
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', money: 1500, position: 0, properties: [] },
    { id: 2, name: 'Player 2', money: 1500, position: 0, properties: [] },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);

  // Function to start a brand new game
  const startNewGame = () => {
    setPlayers([
      { id: 1, name: 'Player 1', money: 1500, position: 0, properties: [] },
      { id: 2, name: 'Player 2', money: 1500, position: 0, properties: [] },
    ]);
    setCurrentPlayerIndex(0);
    setDice([1, 1]);
    setGameStarted(true);
    setResumeAvailable(true); // Now a game exists to resume
  };

  // Function to resume existing game
  const resumeGame = () => {
    setGameStarted(true); // Do NOT reset anything
  };

  // Function to return to welcome screen (e.g., from GameBoard)
  const goBackToWelcome = () => {
    setGameStarted(false);
  };

  return (
    <>
      {!gameStarted ? (
        <WelcomePage
          onStart={startNewGame}
          onResume={resumeGame}
          showResume={resumeAvailable}
          instructionsViewed={instructionsViewed}
          setInstructionsViewed={setInstructionsViewed}
        />

      ) : (
        <GameBoard
          players={players}
          setPlayers={setPlayers}
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          dice={dice}
          setDice={setDice}
          onBack={goBackToWelcome}
        />
      )}
    </>
  );
}

export default App;
