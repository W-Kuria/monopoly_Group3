import MonopolyBoard from './MonopolyBoard';

const GameBoard = ({ players, ...props }) => {
  const currentPlayer = players[props.currentPlayerIndex];

  return (
    <div className="container text-center mt-4">
    
      <MonopolyBoard players={players} />

      <div className="mt-4">
        <p>Current Player: {currentPlayer.name}</p>
        <p>Money: ${currentPlayer.money}</p>
        <p>Position: {currentPlayer.position}</p>
        <p>Dice: {props.dice.join(', ')}</p>
        <button className="btn btn-outline-primary" onClick={props.onBack}>
          Back to Welcome Page
        </button>
      </div>
    </div>
  );
};


export default GameBoard;