function Dice({ dice, onRoll }) {
  return (
    <div className="dice">
      <button onClick={onRoll}>Roll Dice </button>
      {dice.die1 && dice.die2 && (
        <p>You rolled: {dice.die1} and {dice.die2} (Total: {dice.die1 + dice.die2})</p>
      )}
    </div>
  );
}

export default Dice;
