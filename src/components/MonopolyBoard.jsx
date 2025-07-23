import React from 'react';
import boardTiles from '../data/boardData';
import '../components/MonopolyBoard.css';

const MonopolyBoard = ({ players }) => {
  const getPlayersOnTile = (tileIndex) =>
    players.filter((player) => player.position === tileIndex);

  return (
    <div className="monopoly-board">
      {boardTiles.map((tile) => (
        <div key={tile.id} className="tile">
          <div className="tile-name">{tile.name}</div>
          <div className="players-here">
            {getPlayersOnTile(tile.id).map((player) => (
              <span key={player.id} className={`player-token p${player.id}`}>
                {player.name[0]}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonopolyBoard;
