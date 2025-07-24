import "./MonopolyBoard.css";

const tiles = [
  "GO", "Mediterranean Ave", "Community Chest", "Baltic Ave", "Income Tax", "Reading Railroad",
  "Oriental Ave", "Chance", "Vermont Ave", "Connecticut Ave", "Jail",
  "St. Charles Place", "Electric Company", "States Ave", "Virginia Ave", "Pennsylvania Railroad",
  "St. James Place", "Community Chest", "Tennessee Ave", "New York Ave", "Free Parking",
  "Kentucky Ave", "Chance", "Indiana Ave", "Illinois Ave", "B&O Railroad",
  "Atlantic Ave", "Ventnor Ave", "Water Works", "Marvin Gardens", "Go to Jail",
  "Pacific Ave", "North Carolina Ave", "Community Chest", "Pennsylvania Ave", "Short Line",
  "Chance", "Park Place", "Luxury Tax", "Boardwalk"
];

const MonopolyBoard = ({ players, properties }) => {
  return (
    <div>
      <div className="board-container">
        {tiles.map((tile, i) => {
          // Find if this tile is a property and if it's owned
          const ownedProperty = properties.find(p => p.position === i);
          const owner = ownedProperty ? players[ownedProperty.ownerId] : null;

          // Determine the class for ownership highlighting
          const tileClass = `tile tile-${i} ${owner ? `owned-${owner.color}` : ''}`;

          return (
            <div key={i} className={tileClass}>
              <div className="tile-name">{tile}</div>
              <div className="tile-position">{i}</div>

              <div className="player-markers">
                {players.map((player, index) =>
                  player.position === i ? (
                    <div
                      key={index}
                      className="player-piece"
                      style={{ backgroundColor: player.color }}
                    />
                  ) : null
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="player-info text-center mt-4">
        {players.map((player, i) => (
          <div key={i} className="badge bg-secondary mx-2 p-2">
            <div>
              <strong style={{ color: player.color }}>{player.name}</strong>
            </div>
            <div>Money: ${player.money}</div>
            <div>Position: {player.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonopolyBoard;
