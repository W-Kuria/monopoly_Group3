const Player = ({ player }) => {
  return (
    <div className="player-info">
      <h3>Player Status</h3>
      <div className="player-stats">
        <p><strong>Balance:</strong> ${player.balance}</p>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Status:</strong> {player.inJail ? 'In Jail' : 'Free'}</p>
        {player.skipNextTurn && <p className="warning">You will skip your next turn!</p>}
      </div>
    </div>
  );
};

export default Player;