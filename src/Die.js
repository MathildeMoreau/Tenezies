import React from "react";
import "./styles.css";

const Die = (props) => {
  return (
    <div className="">
      <div
        className={props.isHeld ? "die--face held" : "die--face"}
        onClick={props.holdDice}
      >
        {props.value}
      </div>
    </div>
  );
};

export default Die;
