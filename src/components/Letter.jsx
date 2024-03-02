import React, { useContext, useEffect } from "react";
import { AppContext } from "./Game";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div
      style={{
        borderColor:
          letterState == "correct"
            ? "#ff38d1"
            : letterState == "almost"
            ? "#fbb6f7"
            : letterState == "error"
            ? "#3a393c"
            : "black",
        color: letterState == "correct"
        ? "white"
        : letterState == "almost"
        ? "white"
        : letterState == "error"
        ? "white"
        : "black",
      }}
      className="letter"
      id={letterState}
    >
      {letter}
    </div>
  );
}

export default Letter;
