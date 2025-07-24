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

const MonopolyBoard = ({ players }) => {
  return (
    <>
      <div className="board-container">
        {tiles.map((tile, i) => (
          <div key={i} className={`tile tile-${i}`}>
            {tile}
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
        ))}
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
    </>
  );
};

export default  MonopolyBoard;



