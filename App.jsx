import React from "react";
import { usePlayerContext } from "./context/PlayerContext";

function App() {
  const { players, currentPlayer, handlePayment, nextTurn } = usePlayerContext();

  return (
    <div className="app">
      <h1>Monopoly Game</h1>

      <h2>Current Player: {currentPlayer.name}</h2>

      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} —  ${player.money}
            {player.isBankrupt && <strong> — BANKRUPT</strong>}
          </li>
        ))}
      </ul>

      <button onClick={() => handlePayment(currentPlayer.id, 160)}>
        Pay $160
      </button>

      <button onClick={nextTurn}>Next Turn</button>
    </div>
  );
}

export default App;
