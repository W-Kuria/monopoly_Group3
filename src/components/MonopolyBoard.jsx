

function MonopolyBoard({ players, currentPlayerIndex, onBuyProperty }) {
  const currentPosition = players[currentPlayerIndex].position;

  const handleBuy = () => {
    const propertyId = currentPosition; 
    const price = 100;
    onBuyProperty(propertyId, price);
  };

  return (
    <div className="monopoly-board">
      <h2>Board</h2>
      <p>Player is on tile {currentPosition}</p>
      <button onClick={handleBuy}>Buy Property</button>
    </div>
  );
}

export default MonopolyBoard;
