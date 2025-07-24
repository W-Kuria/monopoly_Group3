import { useState } from 'react';

const GoToJailFeature = () => {
  const [player, setPlayer] = useState({
    position: 28, // Start near Go To Jail for testing
    inJail: false,
    skipNextTurn: false
  });
  
  const [message, setMessage] = useState('');
https://github.com/W-Kuria/monopoly_Group3/tree/scrum-21-go-to-Jail-Move-the-player-to-jail-space-and-skip-their-next-turn
  const rollDice = () => {
    // Handle skip turn logic
    if (player.skipNextTurn) {
      setPlayer({ ...player, skipNextTurn: false });
      setMessage("You skipped this turn because you were sent to jail!");
      return;
    }

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;
    
    let newPosition = (player.position + total) % 40;
    let inJail = player.inJail;
    let skipNextTurn = player.skipNextTurn;
    let newMessage = `You rolled ${die1} and ${die2} for a total of ${total}!`;
    
    // Go to Jail feature implementation
    if (newPosition === 30) {
      newPosition = 10; // Move to Jail position
      inJail = true;
      skipNextTurn = true;
      newMessage += " You landed on Go To Jail! Move to Jail and skip your next turn.";
    }
    
    setPlayer({
      position: newPosition,
      inJail,
      skipNextTurn
    });
    
    setMessage(newMessage);
  };

  return (
    <div className="go-to-jail-feature">
      <h3>Go To Jail Feature Demo</h3>
      <div className="player-status">
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>In Jail:</strong> {player.inJail ? 'Yes' : 'No'}</p>
        <p><strong>Skip Next Turn:</strong> {player.skipNextTurn ? 'Yes' : 'No'}</p>
      </div>
      <button onClick={rollDice}>Roll Dice</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default GoToJailFeature;