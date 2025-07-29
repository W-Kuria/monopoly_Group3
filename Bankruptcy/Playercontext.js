import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", money: 1500, isBankrupt: false },
    { id: 2, name: "Player 2", money: 1500, isBankrupt: false },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const updatePlayer = (id, updates) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, ...updates } : player
      )
    );
  };

  const handlePayment = (id, amount) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id
          ? {
              ...player,
              money: player.money - amount,
              isBankrupt: player.money - amount < 0,
            }
          : player
      )
    );
  };

  const handleBankruptcy = (id) => {
    updatePlayer(id, { isBankrupt: true });
  };

  const nextTurn = () => {
    let nextIndex = currentPlayerIndex;
    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (players[nextIndex].isBankrupt && nextIndex !== currentPlayerIndex);

    setCurrentPlayerIndex(nextIndex);
  };

  const value = {
    players,
    updatePlayer,
    handlePayment,
    handleBankruptcy,
    currentPlayerIndex,
    nextTurn,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayers() {
  return useContext(PlayerContext);
}
