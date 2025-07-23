import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';

const GameBoard = ({ onBack }) => (
  <div className="container mt-5 text-center">
    <h2>Monopoly Game Board (Coming Soon)</h2>
    <button className="btn btn-outline-primary mt-4" onClick={onBack}>
      Back to Welcome Page
    </button>
  </div>
);

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      {!gameStarted ? (
        <WelcomePage onStart={() => setGameStarted(true)} />
      ) : (
        <GameBoard onBack={() => setGameStarted(false)} />
      )}
    </>
  );
}

export default App;
