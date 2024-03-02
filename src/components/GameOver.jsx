import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Game";
import { supabase } from "../supabaseClient";
import { UserContext } from "../App";

async function getDefinition(word) {
  const { data, error } = await supabase.from("word-table")
  .select('definition')
  .eq('word', word)

  console.log(error);
  console.log(word)
  console.log(data);
  return data[0].definition;

}

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    async function fetchDefinition() {
      const definition = await getDefinition(correctWord);
      setDefinition(definition);
    }
    fetchDefinition();
  }, [correctWord]);

  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "you correctly guessed the capital letters"
          : "you failed to guess the capital letters"}
      </h3>
      <h1 className="correct-word">Correct Word: {correctWord}</h1>
      <h1 className="definition-style">Definition: {definition}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;