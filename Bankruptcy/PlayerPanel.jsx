import { usePlayerContext } from "../context/PlayerContext";

function PlayerPanel() {
  const { players } = usePlayerContext();

  return (
    <div className="player-panel">
      {players.map((player) => (
        <div key={player.id} className="player-card">
          <h3>{player.name}</h3>
          <p>Money: ${player.money}</p>
          {player.isBankrupt && <p style={{ color: "red" }}>💸 Bankrupt</p>}
        </div>
      ))}
    </div>
  );
}

export default PlayerPanel;
