import { useContext, useState } from "react";
import viteLogo from "/vite.svg";
// import './App.css'
import WordBoard from "./WordBoard";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "../Words";
import React, { createContext, useEffect } from "react";
import GameOver from "./GameOver";
import { supabase } from "../supabaseClient";
import { UserContext } from "../App";

export const AppContext = createContext();

function Game() {
  const user = useContext(UserContext);
  console.log(user);
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  async function saveAttempt(answer, attempt, attemptNumber, solved) {
    const { data, error } = await supabase.from("games").insert({
      user_id: user.id,
      answer: answer,
      attempt_1: attempt,
    }).select();

    console.log(error);
  }

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
    saveAttempt(correctWord, currWord, currAttempt.attempt, gameOver);
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    // <div className="App">
    //   <nav>
    //     <h1>Wordle</h1>
    //   </nav>
    <AppContext.Provider
      value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        correctWord,
        onSelectLetter,
        onDelete,
        onEnter,
        setDisabledLetters,
        disabledLetters,
        gameOver,
      }}
    >
      <div className="game">
        <WordBoard />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        <button onClick={signOut}>
          Logout
        </button>
      </div>
    </AppContext.Provider>
    // </div>
  );
}

export default Game;
