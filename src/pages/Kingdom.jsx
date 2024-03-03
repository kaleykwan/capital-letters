import Game from "../components/Game";
import React from "react";
import Auth from "./Auth";
import ProgressBar from "../components/ProgressBar";
import { useContext } from "react";
import { UserContext } from "../Contexts";

export default function Kingdom({ stage, setStage }) {
  return (
    <div className="kingdom">
      <nav>
        <h1>capital letters</h1>
      </nav>
      <ProgressBar currentLevel={stage} />
      <Game stage={stage} setStage={setStage} />
    </div>
  );
}
