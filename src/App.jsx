import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './components/Game';
import Board from './components/WordBoard';
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <nav>
      <h1>Wordle</h1>
    </nav>
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
      </div>
    </AppContext.Provider>
  </div>
    // <>
    //   <div>
    //     <p>Hello</p>
    //   </div>
    //   <Game />
    // </>
  )
}

export default App;