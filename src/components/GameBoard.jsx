import MonopolyBoard from "./MonopolyBoard";

const GameBoard = () => {
  const players = [
    { name: "Player 1", color: "red", money: 1500, position: 0 },
    { name: "Player 2", color: "blue", money: 1500, position: 5 }
  ];

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4"></h2>
      <MonopolyBoard players={players} />
    </div>
  );
};

export default GameBoard;
