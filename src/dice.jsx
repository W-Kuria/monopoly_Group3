import { useState } from "react";

function Dice() {
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);

  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generate = () => {
    const newNumber1=randomNumber(1,6)
    const newNumber2=randomNumber(1,6)
    setNumber1(newNumber1);
    setNumber2(newNumber2)
   const sum=newNumber1+newNumber2;
  alert(sum)
  };

  

  return (
    <div>
      <button onClick={generate}>Roll Dice</button>
    </div>
  );
}

export default Dice;