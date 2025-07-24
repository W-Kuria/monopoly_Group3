import { useState } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';

const MonopolyGame = () => {
  const [player, setPlayer] = useState({
    position: 0,
    balance: 1500,
    inJail: false,
    skipNextTurn: false
  });
  
  const [message, setMessage] = useState('');

  // Roll dice and move player
  const rollDice = () => {
    if (player.skipNextTurn) {
      setPlayer({ ...player, skipNextTurn: false });
      setMessage("You skipped this turn because you were sent to jail!");
      return;
    }

    // Generate random number between 1-6 for each die
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;
    
    // Calculate new position (board has 40 spaces, 0-39)
    let newPosition = (player.position + total) % 40;
    
    // Check if player passed Go
    const passedGo = player.position + total >= 40;
    
    let newBalance = player.balance;
    let inJail = player.inJail;
    let skipNextTurn = player.skipNextTurn;
    let newMessage = `You rolled ${die1} and ${die2} for a total of ${total}!`;
    
    // Handle passing Go
    if (passedGo) {
      newBalance += 200;
      newMessage += " You passed GO and collected $200!";
    }
    
    // Handle landing on Go
    if (newPosition === 0) {
      newBalance += 200;
      newMessage += " You landed on GO and collected $200!";
    }
    
    // Handle landing on Go To Jail (position 30)
    if (newPosition === 30) {
      newPosition = 10; // Jail is at position 10
      inJail = true;
      skipNextTurn = true;
      newMessage += " You landed on Go To Jail! Move to Jail and skip your next turn.";
    }
    
    setPlayer({
      position: newPosition,
      balance: newBalance,
      inJail,
      skipNextTurn
    });
    
    setMessage(newMessage);
  };

  return (
    <div className="monopoly-game">
      <h2>Monopoly Game</h2>
      <Player player={player} />
      <GameBoard position={player.position} />
      <div className="controls">
        <button onClick={rollDice}>Roll Dice</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default MonopolyGame;