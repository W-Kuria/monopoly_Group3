import { usePlayers } from "../context/PlayerContext";

const GameBoard = () => {
  const {
    players,
    currentPlayerIndex,
    handlePayment,
    nextTurn,
  } = usePlayers();

  const currentPlayer = players[currentPlayerIndex];

  const forceBankruptcy = () => {
    const largeRent = 2000; // More than starting balance
    handlePayment(currentPlayer.id, largeRent);
    nextTurn(); // Move to next player's turn
  };

  return (
    <div>
      <h2>Current Turn: {currentPlayer.name}</h2>
      <p>Balance: ${currentPlayer.money}</p>
      <p>Status: {currentPlayer.isBankrupt ? "💀 Bankrupt" : "Active"}</p>

      <button onClick={forceBankruptcy} disabled={currentPlayer.isBankrupt}>
        Pay Rent (Force Bankruptcy)
      </button>
    </div>
  );
};

export default GameBoard;
