import Dice from "./dice";
import Locate from "./position";
import { useState, useEffect } from "react";

function Movement() {
  const [position1, setposition1] = useState(0);
  const [position2, setposition2] = useState(0);
  const [turn, setturn] = useState("Player1");

  const [board, setboard] = useState(() => {
    const initial = Locate();
    return initial;
  });

  const [players, setplayers] = useState(() => {
    const saved = localStorage.getItem("monopoly-players");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [
        { id: 1, name: "Player 1", position: 0, money: 1500, properties: [], active: true },
        { id: 2, name: "Computer", position: 0, money: 1500, properties: [], active: true },
      ];
    }
  });

  const [winner, setwinner] = useState(null);
  const [timer, settimer] = useState(120);
  const [laps, setlaps] = useState({ Player1: 0, Computer: 0 });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("monopoly-players", JSON.stringify(players));
  }, [players]);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0 || winner) return;

    const interval = setInterval(() => {
      settimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, winner]);

  // Winner logic when timer ends
  useEffect(() => {
    if (timer === 0 && !winner) {
      const activeplayers = players.filter(p => p.active);
      if (activeplayers.length > 0) {
        const richest = activeplayers.reduce((a, b) => (a.money > b.money ? a : b));
        setwinner(richest.name);
      } else {
        setwinner("No one");
      }
    }
  }, [timer, players, winner]);

  const move = (Roll) => {
    if (winner) return;
    const updatePlayers = [...players];

    if (turn === "Player1" && updatePlayers[0].active) {
      let newPos = position1 + Roll;
      let newLaps = { ...laps };

      if (newPos >= board.length) {
        newPos = newPos - board.length;
        newLaps.Player1 += 1;
        if (newLaps.Player1 === 1) {
          alert("Player1 completed first lap. $200 awarded.");
          updatePlayers[0].money += 200;
        }
        setlaps(newLaps);
      }

      const landed = board[newPos];

      if (landed.type === "property" && newLaps.Player1 >= 1) {
        if (updatePlayers[1].properties.includes(landed.name)) {
          const rent = Math.floor(landed.cost * 0.2);
          if (updatePlayers[0].money >= rent) {
            updatePlayers[0].money -= rent;
            updatePlayers[1].money += rent;
            alert(`Player1 paid $${rent} rent to Computer`);
          } else {
            updatePlayers[0].active = false;
            alert("Player1 couldn't pay rent and is out of the game!");
          }
        }
      }

      setplayers(updatePlayers);
      setposition1(newPos);
      setturn("Computer");

    } else if (turn === "Computer" && updatePlayers[1].active) {
      let newPos = position2 + Roll;
      let newLaps = { ...laps };

      if (newPos >= board.length) {
        newPos = newPos - board.length;
        newLaps.Computer += 1;
        if (newLaps.Computer === 1) {
          alert("Computer completed first lap. $200 awarded.");
          updatePlayers[1].money += 200;
        }
        setlaps(newLaps);
      }

      const landed = board[newPos];

      if (landed.type === "property" && newLaps.Computer >= 1) {
        if (updatePlayers[0].properties.includes(landed.name)) {
          const rent = Math.floor(landed.cost * 0.2);
          if (updatePlayers[1].money >= rent) {
            updatePlayers[1].money -= rent;
            updatePlayers[0].money += rent;
            alert(`Computer paid $${rent} rent to Player1`);
          } else {
            updatePlayers[1].active = false;
            alert("Computer couldn't pay rent and is out of the game!");
          }
        }
      }

      // Computer buying logic
      if (
        landed.type === "property" &&
        newLaps.Computer >= 1 &&
        updatePlayers[1].money > landed.cost &&
        !updatePlayers[1].properties.includes(landed.name)
      ) {
        const remainder = updatePlayers[1].money - landed.cost;
        const willBuy = landed.cost <= 150 && remainder >= 300 && Math.random() < 0.5;
        if (willBuy) {
          updatePlayers[1].money -= landed.cost;
          updatePlayers[1].properties.push(landed.name);
          alert(`Computer bought ${landed.name}`);
        }
      }

      setplayers(updatePlayers);
      setposition2(newPos);
      setturn("Player1");
    }
  };

  const currentPosition = () => (turn === "Player1" ? position1 : position2);
  const currentLocation = board[currentPosition()];

  const buyProperty = () => {
    if (currentLocation.type !== "property") return;
    if (laps[turn] < 1) {
      alert("Complete 1 lap before buying property");
      return;
    }

    const decision = window.confirm(`${turn}, buy ${currentLocation.name} for $${currentLocation.cost}?`);
    if (decision) {
      const updatePlayers = [...players];
      const index = turn === "Player1" ? 0 : 1;

      if (updatePlayers[index].money >= currentLocation.cost) {
        updatePlayers[index].money -= currentLocation.cost;
        updatePlayers[index].properties.push(currentLocation.name);
        setplayers(updatePlayers);
        alert(`${updatePlayers[index].name} bought ${currentLocation.name}`);
      } else {
        alert("Not enough money");
      }
    }
  };

  return (
    <div>
      <h1>{turn}, you're on: {currentLocation.name}</h1>
      <h2>{players[0].name} 💰 ${players[0].money}</h2>
      <h2>{players[1].name} 💰 ${players[1].money}</h2>
      <h3>⏳ Timer: {timer} sec</h3>
      {winner && <h2>🏆 Winner: {winner}</h2>}
      {turn === "Player1" && currentLocation.type === "property" && laps.Player1 >= 1 && players[0].active && (
        <button onClick={buyProperty}>Buy Property</button>
      )}
      <Dice Roll={move} />
    </div>
  );
}

export default Movement;
