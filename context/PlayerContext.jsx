import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePayment = (id, amount) => {
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id === id) {
          const newMoney = player.money - amount;
          return {
            ...player,
            money: newMoney,
            isBankrupt: newMoney < 0,
          };
        }
        return player;
      })
    );
  };

  const nextTurn = () => {
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    let attempts = 0;

    while (players[nextIndex].isBankrupt && attempts < players.length) {
      nextIndex = (nextIndex + 1) % players.length;
      attempts++;
    }

    setCurrentPlayerIndex(nextIndex);
  };

  const updatePlayer = (id, updates) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  const value = {
    players,
    setPlayers,
    currentPlayerIndex,
    currentPlayer: players[currentPlayerIndex],
    handlePayment,
    updatePlayer,
    nextTurn,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
