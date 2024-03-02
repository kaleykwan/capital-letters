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
    <>
      <div>
        <p>Hello</p>
      </div>
    </>
  )
}

export default App;