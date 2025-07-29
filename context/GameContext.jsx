import React, { createContext, useState } from 'react';

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [currentSpace, setCurrentSpace] = useState(null);

  return (
    <GameContext.Provider value={{
      playerPosition,
      setPlayerPosition,
      currentSpace,
      setCurrentSpace
    }}>

     {children}
    </GameContext.Provider>
  );
};
