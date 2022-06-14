import React, { useEffect, useState } from "react";
import Die from "./Die";
import "./styles.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [number, setNumber] = useState(allNewDice());
  const [tenezies, setTenezies] = useState(false);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie());
    }
    return dice;
  }

  function rollDice() {
    if (!tenezies) {
      setNumber((prevState) =>
        prevState.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenezies(false);
      setNumber(allNewDice());
    }
  }

  const diceElements = number.map((dieFace) => (
    <Die
      key={dieFace.id}
      value={dieFace.value}
      isHeld={dieFace.isHeld}
      holdDice={() => holdDice(dieFace.id)}
    />
  ));

  function holdDice(id) {
    setNumber((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    const allHeld = number.every((die) => die.isHeld);
    const firstValue = number[0].value;
    const allValue = number.every((die) => die.value === firstValue);
    if (allHeld && allValue) {
      setTenezies(true);
    }
  }, [number]);

  return (
    <main>
      {tenezies && <Confetti />}
      <h1>Tenezies</h1>
      <h3>
        Roll until dices are the same. Click each die to freeze it between
        rolls.
      </h3>
      <div className="group--container">{diceElements}</div>
      <button className="roll-button" id="roll" onClick={rollDice}>
        {tenezies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
