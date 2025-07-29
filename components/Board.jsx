import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { getNewPosition } from '../utils/movement';
import SpaceInfo from './SpaceInfo';

const Board = () => {
  const { playerPosition, setPlayerPosition, setCurrentSpace } = useContext(GameContext);

   const handleMove = () => {
    const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    const newPos = getNewPosition(playerPosition, roll);

      setPlayerPosition(newPos);
  };

   return (
    <div>
      <h2>Current Position: {playerPosition}</h2>
      <button onClick={handleMove}>Roll Dice</button>
      <SpaceInfo />
    </div>
  );
};

export default Board;
