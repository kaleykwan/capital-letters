import React, { useContext } from "react";
import Letter from "./Letter";

function WordBoard({ wordLength }) {
  const input = Array.from({ length: wordLength }, (_, index) => index - 1);
  return (
    <div className="board">
      {" "}
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={0} />;
        })}
      </div>
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={1} />;
        })}
      </div>
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={2} />;
        })}
      </div>
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={3} />;
        })}
      </div>
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={4} />;
        })}
      </div>
      <div className="row">
        {input.map((i) => {
          return <Letter letterPos={i} attemptVal={5} />;
        })}
      </div>
    </div>
  );
}

export default WordBoard;
