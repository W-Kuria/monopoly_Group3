// src/components/Dice.jsx
const Dice = ({ dice, onRoll }) => {
  return (
    <div className="mb-4">
      <button className="btn btn-success" onClick={onRoll}>
        Roll Dice
      </button>
      <p className="mt-2 text-white">
        Dice: 🎲 {dice[0]} + {dice[1]} = {dice[0] + dice[1]}
      </p>
    </div>
  );
};

export default Dice;
