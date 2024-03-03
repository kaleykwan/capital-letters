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
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const AppContext = createContext();

const kingdoms = [
  ["debt", "invest", "capital"],
  [
    "stock",
    "equity",
    "dividend",
    "bond",
    "mutual",
    "securities",
    "portfolio",
    "yield",
    "venture",
  ],
  [
    "atm",
    "cash",
    "loan",
    "bank",
    "credit",
    "deposit",
    "savings",
    "mortgage",
    "interest",
    "withdraw",
    "overdraft",
  ],
  [
    "exchange",
    "commodity",
    "bull",
    "derivative",
    "options",
    "forex",
    "index",
    "ipo",
    "crypto",
  ],
  [
    "tax",
    "audit",
    "balance",
    "journal",
    "fiscal",
    "gaap",
    "ledger",
    "depreciate",
  ],
  [
    "risk",
    "loss",
    "claim",
    "premium",
    "policy",
    "coverage",
    "liability",
    "insolvent",
  ],
  [
    "irs",
    "haven",
    "levy",
    "income",
    "deduction",
    "exemption",
    "shelter",
    "compliance",
  ],
];

function Game({ kingdom, stage, setStage }) {
  const navigate = useNavigate();
  const wordSet = kingdoms[kingdom];

  const session = useContext(UserContext);
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [correctWord, setCorrectWord] = useState(wordSet[stage]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  async function saveStage() {
    console.log("saving stage");
    switch (kingdom) {
      case 1:
        const { data1, error1 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_1: stage })
          .select();
        if (error1) {
          console.log(error1);
        }
        break;
      case 2:
        const { data2, error2 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_2: stage })
          .select();
        break;
      case 3:
        const { data3, error3 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_3: stage })
          .select();
        break;
      case 4:
        const { data4, error4 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_4: stage })
          .select();
        break;
      case 5:
        const { data5, error5 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_5: stage })
          .select();
        break;
      case 6:
        const { data6, error6 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_6: stage })
          .select();
        break;
      case 7:
        const { data7, error7 } = await supabase
          .from("profiles")
          .upsert({ user_id: session.user.id, stage_7: stage })
          .select();
        break;
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    saveStage();
    navigate(RoutePaths.AUTH);
  }

  function clearBoard(length) {
    console.log("clearing board");
    const newBoard = [...board];
    setDisabledLetters([]);
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= length; j++) {
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
      clearBoard(correctWord.length);
      setGameOver({ gameOver: false, guessedWord: false });
      setCorrectWord(wordSet[stage]);
      console.log("new correct word: " + correctWord);
      // clearBoard();
      setCurrAttempt({ attempt: 0, letter: 0 });
      saveStage();
      if (stage === wordSet.length) {
        navigate(RoutePaths.MAP);
      } 
    }
  };

  const onEnter = () => {
    if (currAttempt.letter !== correctWord.length) return;

    let currWord = "";
    for (let i = 0; i < correctWord.length; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
    }
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
    if (currAttempt.letter > correctWord.length - 1) return;
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
        <WordBoard wordLength={correctWord.length} />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        <div className="logout-button" 
          onClick={(e) => {
            e.currentTarget.blur();
            signOut();
          }}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
           </div>
        <div className="button-row">
          <button
            style={{ backgroundColor: "black", color: "white" }}
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              nextStage();
            }}
          >
            Next
          </button>
          {/* <button
            style={{ backgroundColor: "black", color: "white" }}
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              signOut();
            }}
          >
            Logout
          </button> */}
          <button
            style={{ backgroundColor: "black", color: "white" }}
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              saveStage();
              navigate(RoutePaths.MAP);
            }}
          >
            Back to map
          </button>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Game;
