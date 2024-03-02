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
  const session = useContext(UserContext);
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
    const { error } = await supabase.auth.signOut();
  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

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

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      //return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      //return;
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
        <button onClick={signOut}>Logout</button>
      </div>
    </AppContext.Provider>
    // </div>
  );
}

export default Game;
