function PlayerPanel({ players, currentPlayerIndex }) {
  return (
    <div className="player-panel">
      <h2>Current Turn: {players[currentPlayerIndex].name}</h2>
      {players.map((player, ) => (
        <div key={player.id} style={{ marginBottom: '1rem' }}>
          <strong>{player.name}</strong>
          <p> Money: ${player.money}</p>
          <p> Position: {player.position}</p>
        </div>
      ))}
    </div>
  );
}

export default PlayerPanel;
