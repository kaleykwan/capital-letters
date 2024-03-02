import { useContext, useState } from "react";
import viteLogo from "/vite.svg";
// import './App.css'
import WordBoard from "./WordBoard";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "../Words";
import React, { createContext, useEffect } from "react";
import GameOver from "./GameOver";
import { supabase } from "../supabaseClient";
import { UserContext } from "../Contexts";

export const AppContext = createContext();

const wordSet = [
  "asset",
  "audit",
  "debit",
  "grant",
  "index",
  "lease",
  "limit",
  "loans",
  "offer",
  "party",
  "proxy",
  "quote",
  "score",
  "stock",
];

function Game({ stage, setStage }) {
  const session = useContext(UserContext);
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [correctWord, setCorrectWord] = useState(wordSet[stage]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  function clearBoard() {
    console.log("clearing board");
    const newBoard = [...board];
    setDisabledLetters([]);
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5; j++) {
        newBoard[i][j] = "";
        setCurrAttempt({ attempt: 0, letter: 0 });
      }
    }
    setBoard(newBoard);
  }

  async function saveFirstAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .insert({
        user_id: session.user.id,
        answer: answer,
        attempt_1: attempt,
      })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved first attempt");
    }
  }

  async function saveSecondAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .update({
        attempt_2: attempt,
      })
      .match({ user_id: session.user.id, answer: answer })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved second attempt");
    }
  }
  async function saveThirdAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .update({
        attempt_3: attempt,
      })
      .match({ user_id: session.user.id, answer: answer })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved third attempt");
    }
  }

  async function saveFourthAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .update({
        attempt_4: attempt,
      })
      .match({ user_id: session.user.id, answer: answer })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved fourth attempt");
    }
  }

  async function saveFifthAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .update({
        attempt_5: attempt,
      })
      .match({ user_id: session.user.id, answer: answer })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved fifth attempt");
    }
  }

  async function saveSixthAttempt(answer, attempt, solved) {
    const { data, error } = await supabase
      .from("games")
      .update({
        attempt_6: attempt,
      })
      .match({ user_id: session.user.id, answer: answer })
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log("Saved sixth attempt");
    }
  }

  const nextStage = () => {
    console.log("running nextStage");
    if (gameOver.gameOver) {
      setStage((stage) => stage + 1);
      stage++;
      console.log("new stage: " + stage);
      setGameOver({ gameOver: false, guessedWord: false });
      setCorrectWord(wordSet[stage]);
      console.log("new correct word: " + correctWord);
      clearBoard();
      setCurrAttempt({ attempt: 0, letter: 0 });
    }
  };

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
    }
    //console.log(currAttempt);
    //console.log(wordSet);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }

    switch (currAttempt.attempt) {
      case 0:
        saveFirstAttempt(correctWord, currWord, gameOver);
        break;
      case 1:
        saveSecondAttempt(correctWord, currWord, gameOver);
        break;
      case 2:
        saveThirdAttempt(correctWord, currWord, gameOver);
        break;
      case 3:
        saveFourthAttempt(correctWord, currWord, gameOver);
        break;
      case 4:
        saveFifthAttempt(correctWord, currWord, gameOver);
        break;
      case 5:
        saveSixthAttempt(correctWord, currWord, gameOver);
        break;
    }
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
        <div className="button-row">
          <button
            tabIndex="-1"
            type="button"
            onClick={(e) => {
              // e.preventDefault();
              e.currentTarget.blur();
              nextStage();
            }}
          >
            Next
          </button>
          <button
            type="button"
            onClick={(e) => {
              // e.preventDefault();
              e.currentTarget.blur();
              clearBoard();
            }}
            disabled={gameOver.gameOver}
          >
            Clear Board
          </button>
          <button type="button" onClick={signOut}>
            Logout
          </button>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Game;
